<script setup>
import { ref } from 'vue'

const emit = defineEmits(['save-project'])
defineProps({ mod: String })

const newProjectName = defineModel()

const saveProject = () => {
  emit('save-project')
}
</script>

<template>
  <div>
    <input
      class="form-control"
      type="text"
      v-model.trim="newProjectName"
      @keyup.enter="saveProject"
    />
    <button class="btn btn-sm" type="button" @click="saveProject">
      {{ mod === 'create' ? 'Add Project' : 'Save Project' }}
    </button>
  </div>
</template>