<script setup>
import BtnTrash from '../../../../shared/components/buttons/BtnTrash.vue'
defineEmits(['delete-form', 'update-form'])
defineProps({ item: Object })
</script>
<template>
  <div>
    <div
      class="border-top border-dark-subtle rounded shadow-sm bg-body-tertiary p-3"
    >
      <div class="d-flex justify-content-between">
        <input
          type="text"
          class="form-control form-control-sm me-2"
          :id="item.id"
          v-model="item.title"
          @change="$emit('update-form', form)"
        />
        <BtnTrash
          title="Удалить"
          @click="$emit('delete-form', item.type, item.id, item.project_id)"
        />
      </div>

      <p class="m-0">Type: {{ item.type }}</p>
      <p class="m-0">ID: {{ item.id }}</p>
    </div>
  </div>
</template>