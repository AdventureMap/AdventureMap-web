<script setup lang="ts">
import HeaderMenu from "../components/HeaderMenu.vue";
import {onMounted, reactive, ref} from "vue";
import {useUserStore} from "../stores/user.js";
import router from "../plugins/router.ts";

const userStore = useUserStore()

onMounted(() => {
  userStore.get()
  if(userStore.username == ""){
    router.push({name: "login"})
  }
})
</script>

<template>
  <HeaderMenu></HeaderMenu>
</template>

<style scoped lang="scss">
</style>