<script setup>
import { computed } from 'vue'
import { logOutUser } from '../../services/auth'
import { useProjectsStore } from '../../stores/projects'
import { useItemsStore } from '../../stores/items'

const projectsStore = useProjectsStore()
const itemsStore = useItemsStore()

const loadingProjectsData = computed(() => projectsStore.loadingProjectsData)
const loadingItemData = computed(() => itemsStore.loadingItemData)

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
        src="/img/logo.svg"
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
        <div class="d-none d-sm-inline-flex">
          <code class="text-body-secondary">
            <small>v{{ `3.0.0` }}</small>
          </code>
        </div>
      </div>
      <Transition name="fade" mode="out-in">
        <div
          v-if="loadingProjectsData || loadingItemData"
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