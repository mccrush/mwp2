<script setup>
import { ref } from 'vue'

const emit = defineEmits(['create-project'])

const newProjectName = ref('')

const createProject = () => {
  emit('create-project', newProjectName)
}
</script>

<template>
  <div>
    <input
      class="form-control"
      type="text"
      v-model.trim="newProjectName"
      @keyup.enter="createProject"
    />
    <br />
    <button class="btn btn-sm" type="button" @click="createProject"></button>
  </div>
</template>