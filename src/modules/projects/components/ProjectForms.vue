<script setup>
import BtnTrash from '../../../shared/components/buttons/BtnTrash.vue'

defineEmits(['delete-form', 'update-form'])

defineProps({
  tabType: {
    type: String,
    default: 'links'
  },
  formsArray: {
    type: Array,
    default: []
  }
})
</script>

<template>
  <div class="row border-top border-dark-subtle p-2">
    <div class="col-12">
      <Transition name="fade" mode="out-in">
        <div v-if="formsArray.length" class="row">
          <div>tabType: {{ tabType }}</div>
          <!-- Cicle -->
          <div
            v-for="form in formsArray"
            :key="form.id"
            class="col-12 col-md-6 p-2"
          >
            <div
              class="border-top border-dark-subtle rounded shadow-sm bg-body-tertiary p-3"
            >
              <div class="d-flex justify-content-between">
                <!-- <h5>{{ form.title }}</h5> -->
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
          </div>
          <!-- -->
        </div>
        <div v-else class="row">
          <div class="col-12">Создайте первую форму</div>
        </div>
      </Transition>
    </div>
  </div>
</template>