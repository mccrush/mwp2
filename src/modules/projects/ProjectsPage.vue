<script setup>
import { ref, computed, onMounted } from 'vue'
import { factory_project } from './helpers/factory_project'
import { useCurrentUserStore } from '../../shared/stores/currentUser'
import { useProjectsStore } from '../../shared/stores/projects'

import ProjectCreateForm from './components/ProjectCreateForm.vue'

const currentUserStore = useCurrentUserStore()
const projectsStore = useProjectsStore()

const currentUserId = computed(() => currentUserStore.currentUserId)
const projects = computed(() => projectsStore.projects)

const newProjectName = ref('')

onMounted(async () => {
  await projectsStore.getProjects(currentUserId.value)
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
</script>

<template>
  <div>
    <!-- <div>ProjectsPage</div> -->
    <ProjectCreateForm
      @create-project="createProject"
      v-model="newProjectName"
    />
    <div>
      <!-- <div>Total projects: {{ projectsStore.projectsLength }}</div> -->
      <div id="projects-list">
        <div v-for="project in projects" :key="project.id" data-test="project">
          {{ project.name }}
        </div>
      </div>
    </div>
  </div>
</template>