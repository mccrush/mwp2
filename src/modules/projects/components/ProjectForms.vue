<script setup>
defineProps({
  type: {
    type: String,
    default: 'links'
  }
})
</script>

<template>
  <div class="row border-top border-dark-subtle p-2">
    <div class="col-12">
      <div class="row">
        <div>type {{ type }}</div>
        <!-- Cicle -->
        <div class="col-12 col-md-6 p-2">
          <div
            class="border-top border-dark-subtle rounded shadow-sm bg-body-tertiary p-3"
          >
            Forma
          </div>
        </div>
        <!-- -->
      </div>
    </div>
  </div>
</template>