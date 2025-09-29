<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasUserForm"
    aria-labelledby="offcanvasUserFormLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasUserFormLabel">Проекты</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>

    <div class="offcanvas-body">
      <ProjectsList
        v-if="userId"
        :userId="userId"
        :projects="projects"
        :project="project"
        :currentProjectId="currentProjectId"
      />
    </div>
  </div>
</template>