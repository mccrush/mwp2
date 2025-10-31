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
const currentProject = ref(null)

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
          @create-project="createProject"
          v-model="newProjectName"
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
        </div>
      </div>
    </div>
  </div>
</template>