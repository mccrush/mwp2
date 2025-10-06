<script setup>
import { ref, computed, onMounted } from 'vue'
import { factory_project } from './helpers/factory_project'
import { useCurrentUserStore } from '../../shared/stores/currentUser'
import { useProjectsStore } from '../../shared/stores/projects'

import ProjectCreateForm from './components/ProjectCreateForm.vue'

const currentUserStore = useCurrentUserStore()
const projectsStore = useProjectsStore()

onMounted(async () => {
  await projectsStore.getProjects(currentUserStore.currentUserId)
})

const projects = computed(() => projectsStore.projects)

//const newProjectName = ref('')

const createProject = async newProjectName => {
  const newProject = factory_project(
    currentUserStore.currentUserId,
    null,
    newProjectName
  )
  await projectsStore.addProject(newProject, currentUserStore.currentUserId)
}
</script>

<template>
  <div>
    <!-- <div>ProjectsPage</div> -->
    <ProjectCreateForm @create-project="createProject" />
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