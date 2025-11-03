<script setup>
defineEmits(['set-current-project', 'edit-project', 'delete-project'])

defineProps({
  projects: Array,
  currentProjectId: Number
})

import BtnProjectTitle from './buttons/BtnProjectTitle.vue'
import BtnEdit from './../../../shared/components/buttons/BtnEdit.vue'
</script>

<template>
  <div class="overflow-y-auto p-2">
    <div
      v-for="project in projects"
      :key="project.id"
      class="btn-group w-100 mt-2"
      role="group"
    >
      <BtnProjectTitle
        class="text-truncate"
        :class="{
          active: project.id === currentProjectId
        }"
        @click="$emit('set-current-project', project)"
      >
        {{ project.name }}
      </BtnProjectTitle>
      <BtnEdit
        v-if="project.id === currentProjectId"
        @click="$emit('edit-project')"
      />
      <BtnEdit
        v-if="project.id === currentProjectId"
        class="border"
        @click="$emit('delete-project', project.id)"
      />
    </div>
  </div>
</template>