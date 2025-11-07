<script setup>
import { ref, computed, onMounted } from 'vue'
import { factory_project } from './helpers/factory_project'
import { useCurrentUserStore } from '../../shared/stores/currentUser'
import { useProjectsStore } from '../../shared/stores/projects'

import ProjectCreateForm from './components/ProjectCreateForm.vue'
import ProjectsList from './components/ProjectsList.vue'
import ProjectWindow from './components/ProjectWindow.vue'

const currentUserStore = useCurrentUserStore()
const projectsStore = useProjectsStore()

const currentUserId = computed(() => currentUserStore.currentUserId)
const loadingProjectsData = computed(() => projectsStore.loadingProjectsData)
const projects = computed(() => projectsStore.projects)

const currentProjectId = computed(() => {
  if (currentProject.value) return currentProject.value.id
  return 0
})

const mod = ref('')
const newProjectName = ref('')
const currentProject = ref(null)

onMounted(async () => {
  await projectsStore.getProjects({ userId: currentUserId.value })

  if ('current-project' in localStorage)
    currentProject.value = JSON.parse(localStorage.getItem('current-project'))
})

const setCurrentProject = project => {
  //console.log('setCurrentProject() project =', project)

  currentProject.value = project
  mod.value = ''
  localStorage.setItem('current-project', JSON.stringify(project))
}

const setMod = newMod => {
  mod.value = newMod
  if (!newMod) newProjectName.value = ''
}

const createProject = () => {
  const newProject = factory_project(
    currentUserId.value,
    null,
    newProjectName.value
  )

  projectsStore.addProject({ project: newProject })
  newProjectName.value = ''
  mod.value = ''
}

const editProject = () => {
  newProjectName.value = currentProject.value.name
  mod.value = 'edit'
}

const updateProject = () => {
  currentProject.value.name = newProjectName.value
  projectsStore.updateProject({ project: currentProject.value })
  newProjectName.value = ''
  mod.value = ''
}

const saveProject = () => {
  if (mod.value === 'create') {
    createProject()
  } else {
    updateProject()
  }
}

const deleteProject = projectId => {
  if (confirm('Удалить проект?')) {
    projectsStore.deleteProject({ projectId })
    currentProject.value = null
    newProjectName.value = ''
    mod.value = ''
  }
}
</script>

<template>
  <div>
    <!-- <div>ProjectsPage</div> -->

    <div class="row">
      <div
        class="my-vh100 col-sm-3 col-lg-2 d-none d-sm-flex flex-column border-end border-dark-subtle p-0 pb-2"
      >
        <ProjectsList
          :projects="projects"
          :currentProjectId="currentProjectId"
          @set-current-project="setCurrentProject"
          @edit-project="editProject"
        />

        <div class="border-bottom border-black mt-0"></div>
        <div class="border-top border-dark-subtle mb-2"></div>

        <ProjectCreateForm
          v-model="newProjectName"
          :mod="mod"
          :currentProjectId="currentProjectId"
          @set-mod="setMod"
          @save-project="saveProject"
          @delete-project="deleteProject"
        />
      </div>

      <div class="col-12 col-sm-9 col-lg-10">
        <Transition name="fade" mode="out-in">
          <ProjectWindow
            v-if="currentProjectId"
            :currentProjectId="currentProjectId"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>