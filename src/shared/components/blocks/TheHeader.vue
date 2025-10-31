<script setup>
import { computed } from 'vue'
import { logOutUser } from '../../services/auth'
import { useProjectsStore } from '../../stores/projects'

const projectsStore = useProjectsStore()

const loadingProjectsData = computed(() => projectsStore.loadingProjectsData)

const logOut = async () => {
  await logOutUser()
}
</script>

<template>
  <div class="row border-bottom border-black p-2">
    <div class="col-6 d-flex">
      <div>MWP2</div>
      <Transition mode="out-in">
        <div v-if="loadingProjectsData">
          <div
            class="spinner-border spinner-border-sm text-secondary ms-2"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </Transition>
    </div>
    <div class="col-6 text-end">
      <button class="btn btn-sm" @click="logOut">LogOut</button>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>