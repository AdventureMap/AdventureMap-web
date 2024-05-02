<script setup lang="ts">
import HeaderMenu from "../components/HeaderMenu.vue";
import {onMounted} from "vue";
import {useUserStore} from "../stores/user.js";
import router from "../plugins/router.ts";

const userStore = useUserStore()

onMounted(() => {
  userStore.get()
  userStore.$patch(state => {
    state.username = ""
    state.user_id = ""
    state.atoken = ""
    state.rtoken = ""
  })
  userStore.set()
  router.push({name: "login"})
})
</script>

<template>
  <HeaderMenu></HeaderMenu>
  <div style="margin: 6vh"></div>
  <el-row justify="center">
    <el-col style="justify-self: center">
      <h2>Logged out successfully</h2>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
@use '../styles/colors';
.el-row h2{
  text-align: center;
  color: colors.$l-primary;
}
</style>