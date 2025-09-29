<script setup>
import { logOutUser } from '../../services/auth'

const logOut = async () => {
  await logOutUser()
}
</script>

<template>
  <div class="row border-bottom border-black p-2">
    <div class="col-6">MWP2</div>
    <div class="col-6 text-end">
      <button class="btn btn-sm" @click="logOut">LogOut</button>
    </div>
  </div>
</template>