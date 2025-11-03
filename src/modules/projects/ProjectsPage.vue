<script setup>
import { ref, computed, onMounted } from 'vue'
import { factory_project } from './helpers/factory_project'
import { useCurrentUserStore } from '../../shared/stores/currentUser'
import { useProjectsStore } from '../../shared/stores/projects'

import ProjectCreateForm from './components/ProjectCreateForm.vue'

const currentUserStore = useCurrentUserStore()
const projectsStore = useProjectsStore()

const currentUserId = computed(() => currentUserStore.currentUserId)
const loadingProjectsData = computed(() => projectsStore.loadingProjectsData)
const projects = computed(() => projectsStore.projects)

const mod = ref('create')
const newProjectName = ref('')
const currentProject = ref(null)

onMounted(async () => {
  await projectsStore.getProjects({ userId: currentUserId.value })
})

const createProject = () => {
  const newProject = factory_project(
    currentUserId.value,
    null,
    newProjectName.value
  )
  //console.log('newProject =', newProject)

  projectsStore.addProject({ item: newProject })
}

const editProject = project => {
  newProjectName.value = project.name
  mod.value = 'edit'
}

const updateProject = () => {
  currentProject.value.name = newProjectName.value
  console.log('Project is Update')
  console.log('Project =', currentProject.value)
  mod.value = 'create'
}

const saveProject = () => {
  if (mod.value === 'create') {
    createProject()
  } else {
    updateProject()
  }
}

const setCurrentProject = project => {
  currentProject.value = project
}
</script>

<template>
  <div>
    <!-- <div>ProjectsPage</div> -->
    <div class="row">
      <div class="col-6">
        <ProjectCreateForm
          @save-project="saveProject"
          v-model="newProjectName"
          :mod="mod"
        />
      </div>
      <div class="col-6">
        <pre>{{ currentProject }}</pre>
      </div>
    </div>

    <div>
      <!-- <div>Total projects: {{ projectsStore.projectsLength }}</div> -->
      <div id="projects-list" class="mt-3">
        <div v-for="project in projects" :key="project.id" data-test="project">
          <button class="btn btn-sm" @click="setCurrentProject(project)">
            {{ project.name }}
          </button>
          <button class="btn btn-sm ms-2" @click="editProject(project)">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>