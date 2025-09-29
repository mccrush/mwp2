<script setup>
import { ref } from 'vue'
import { logInUser } from '../../shared/services/auth'

const devMode = import.meta.env.MODE
const devEmail = import.meta.env.VITE_LOGIN
const devPass = import.meta.env.VITE_PASSWORD

const email = ref('')
const password = ref('')

if (devMode === 'development') {
  email.value = devEmail
  password.value = devPass
}

// const dataLogin = ref({
//   login: { header: 'Авторизация', button: 'Войти' },
//   create: { header: 'Регистрация', button: 'Зарегистрироваться' },
//   restore: {
//     header: 'Восстановление пароля',
//     button: 'Восстановить пароль'
//   }
// })

const mod = ref('login')
const passType = ref(true)
const error = ref(null)
const showMessage = ref(false)

const regexpEmail = '/^\\S+@\\S+\\.\\S+$/'
const regexpPassword = '/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/'

const logIn = async () => {
  if (email.value.length && password.value.length) {
    error.value = null
    showMessage.value = false
    try {
      await logInUser({ email: email.value, password: password.value })
    } catch (err) {
      error.value = err.message
    }
  } else {
    error.value = 'Заполните все поля'
  }
}

// const matchCheker = (string, regexp) => {
//   return string.match(regexp)
// }
</script>

<template>
  <div>
    <div>devMode = {{ devMode }}</div>
    <div class="mt-2">
      <div>email: {{ email }}</div>
      <input
        type="text"
        class="form-control"
        id="email"
        required
        v-model.trim="email"
        placeholder="username@email.com"
        aria-describedby="emailHelp"
        minlength="5"
        maxlength="64"
      />
    </div>
    <div class="mt-2">
      <div>password: {{ password }}</div>
      <input
        :type="passType ? 'password' : 'text'"
        class="form-control"
        id="password"
        required
        v-model.trim="password"
        ref="pass"
        aria-describedby="passwordHelp"
        minlength="8"
        maxlength="32"
        @keyup.enter="logIn"
      />
    </div>
    <div class="mt-2">
      <button class="btn btn-success" @click="logIn">LogIn</button>
    </div>
  </div>
</template>