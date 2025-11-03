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
  <div class="row border-bottom border-black">
    <div
      class="col-sm-3 col-lg-2 d-none d-sm-flex justify-content-start border-end border-dark-subtle pt-2 pb-2"
    >
      <img
        src="/img/logo.png"
        width="30"
        height="30"
        class="logo-image d-inline-block align-top mt-1"
        alt="Logo MWP"
        title="Manager of Web Projects"
      />
      <div
        class="cursor-def d-none d-sm-inline-flex text-body-secondary flex-column justify-content-start lh-1 ms-2 mt-1"
      >
        <strong>MWP</strong>
        <div class="d-none d-md-inline-flex">
          <code class="text-body-secondary">
            <small>v{{ `3.0.0` }}</small>
          </code>
        </div>
      </div>
      <Transition mode="out-in">
        <div
          v-if="loadingProjectsData"
          class="d-flex align-items-center ms-2 mt-1"
        >
          <div
            class="spinner-border spinner-border-sm text-secondary"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </Transition>
    </div>
    <div
      class="mw-h-50 col-12 col-sm-9 col-lg-10 d-flex justify-content-between align-items-center"
    >
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