<script setup>
import { computed } from 'vue'

import FormLinks from './forms/FormLinks.vue'
import FormPasswords from './forms/FormPasswords.vue'
import FormContacts from './forms/FormContacts.vue'
import FormTasks from './forms/FormTasks.vue'

import BtnTrash from '../../../shared/components/buttons/BtnTrash.vue'

defineEmits(['delete-form', 'update-form'])

const { tabType } = defineProps({
  tabType: {
    type: String,
    default: 'links'
  },
  formsArray: {
    type: Array,
    default: []
  }
})

const viewComponents = {
  links: FormLinks,
  passwords: FormPasswords,
  contacts: FormContacts,
  tasks: FormTasks
}

const activeComponent = computed(() => {
  return viewComponents[tabType] || FormLinks
})

const deleteForm = (table, itemId, projectId) => {
  if (confirm('Удалить форму?')) {
    itemsStore.deleteItem({
      table,
      itemId,
      projectId
    })
  }
}

const updateForm = item => {
  itemsStore.updateItem({
    item
  })
}
</script>

<template>
  <div class="row border-top border-dark-subtle p-2">
    <div class="col-12">
      <Transition name="fade" mode="out-in">
        <div v-if="formsArray.length" class="row">
          <div>tabType: {{ tabType }}</div>
          <!-- Cicle -->
          <component
            :is="activeComponent"
            v-for="form in formsArray"
            :key="form.id"
            :item="form"
            class="col-12 col-md-6 p-2"
            @delete-form="deleteForm"
            @update-form="updateForm"
          />

          <!-- <div
            v-for="form in formsArray"
            :key="form.id"
            class="col-12 col-md-6 p-2"
          >
            <div
              class="border-top border-dark-subtle rounded shadow-sm bg-body-tertiary p-3"
            >
              <div class="d-flex justify-content-between">
                <input
                  type="text"
                  class="form-control form-control-sm me-2"
                  :id="form.id"
                  v-model="form.title"
                  @change="$emit('update-form', form)"
                />
                <BtnTrash
                  title="Удалить"
                  @click="
                    $emit('delete-form', form.type, form.id, form.project_id)
                  "
                />
              </div>

              <p class="m-0">Type: {{ form.type }}</p>
              <p class="m-0">ID: {{ form.id }}</p>
            </div>
          </div> -->
          <!-- -->
        </div>
        <div v-else class="row">
          <div class="col-12">Создайте первую форму</div>
        </div>
      </Transition>
    </div>
  </div>
</template>