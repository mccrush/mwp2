<script setup>
import { ref, computed, onMounted } from 'vue'
import { factory_project } from './helpers/factory_project'
import { useCurrentUserStore } from '../../shared/stores/currentUser'
import { useProjectsStore } from '../../shared/stores/projects'

const currentUserStore = useCurrentUserStore()
const projectsStore = useProjectsStore()

onMounted(async () => {
  await projectsStore.getProjects(currentUserStore.currentUserId)
})

const projects = computed(() => projectsStore.projects)

const newProjectName = ref('')

const createProject = async () => {
  const newProject = factory_project(
    currentUserStore.currentUserId,
    null,
    newProjectName.value
  )
  await projectsStore.addProject(newProject, currentUserStore.currentUserId)
  newProjectName.value = ''
}
</script>

<template>
  <div>
    <!-- <div>ProjectsPage</div> -->
    <div>
      <input
        class="form-control"
        type="text"
        v-model.trim="newProjectName"
        @keyup.enter="createProject"
      />
      <br />
      <button
        class="btn btn-sm"
        type="button"
        :disabled="!newProjectName.length"
        @click="createProject"
      ></button>
    </div>
    <div>
      <!-- <div>Total projects: {{ projectsStore.projectsLength }}</div> -->
      <div v-for="project in projects" :key="project.id">
        {{ project.name }}
      </div>
    </div>
  </div>
</template>