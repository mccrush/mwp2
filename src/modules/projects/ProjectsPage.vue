<script setup>
import { ref, computed, onMounted } from 'vue'
import { factory_project } from './helpers/factory_project'
import { useCurrentUserStore } from '../../shared/stores/currentUser'
import { useProjectsStore } from '../../shared/stores/projects'

import ProjectCreateForm from './components/ProjectCreateForm.vue'
import ProjectsList from './components/ProjectsList.vue'

const currentUserStore = useCurrentUserStore()
const projectsStore = useProjectsStore()

const currentUserId = computed(() => currentUserStore.currentUserId)
const loadingProjectsData = computed(() => projectsStore.loadingProjectsData)
const projects = computed(() => projectsStore.projects)

const currentProjectId = computed(() => {
  if (currentProject.value) return currentProject.value.id
  return 0
})

const mod = ref('create')
const newProjectName = ref('')
const currentProject = ref(null)

onMounted(async () => {
  await projectsStore.getProjects({ userId: currentUserId.value })
})

const setCurrentProject = project => {
  currentProject.value = project
}

const createProject = () => {
  const newProject = factory_project(
    currentUserId.value,
    null,
    newProjectName.value
  )

  projectsStore.addProject({ project: newProject })
}

const editProject = () => {
  newProjectName.value = currentProject.value.name
  mod.value = 'edit'
}

const updateProject = () => {
  currentProject.value.name = newProjectName.value
  projectsStore.updateProject({ project: currentProject.value })
  mod.value = 'create'
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
          @delete-project="deleteProject"
        />
      </div>

      <div class="col-12 col-sm-9 col-lg-10">
        <ProjectCreateForm
          @save-project="saveProject"
          v-model="newProjectName"
          :mod="mod"
        />

        <div v-if="currentProject">
          <pre>{{ currentProject }}</pre>
        </div>
      </div>
    </div>

    <div>
      <div id="projects-list" class="mt-3">
        <div v-for="project in projects" :key="project.id" data-test="project">
          <button class="btn btn-sm" @click="setCurrentProject(project)">
            {{ project.name }}
          </button>
          <button class="btn btn-sm ms-2" @click="editProject(project)">
            Edit
          </button>
          <button class="btn btn-sm ms-2" @click="deleteProject(project.id)">
            Del
          </button>
        </div>
      </div>
    </div>
  </div>
</template>