<script setup lang="ts">
import {isDark, toggleDark} from "../composable/dark.ts";
import {ref} from "vue";
import {useUserStore} from "../stores/user.js"
import {storeToRefs} from "pinia";
import router from "../plugins/router.ts";

const activeIndex = ref("index")
const userStore = useUserStore()
const {username} = storeToRefs(userStore)
function handleSelect(pathName: string){
  if(pathName!=""){
    router.push({name: pathName})
  }
}
</script>

<template>
  <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <div style="flex-grow: 0.5"></div>
    <el-menu-item index="index">
      <img
          style="margin-top: 20%"
          height="120%"
          src="../assets/logo-text.svg"
          alt="MeetMap logo"
      />
    </el-menu-item>
    <div style="flex-grow: 1"></div>
    <el-menu-item index="">
      <el-switch v-model="isDark" @update="toggleDark()" type="primary"></el-switch>
    </el-menu-item>
    <el-sub-menu v-if="username==''" index="">
      <template #title>
        <el-icon><User /></el-icon>
      </template>
      <el-menu-item index="login">Login</el-menu-item>
      <el-menu-item index="register">Register</el-menu-item>
    </el-sub-menu>
    <el-sub-menu v-else index="">
      <template #title>
        <el-text style="margin-right: 10px">{{username}}</el-text>
        <el-avatar></el-avatar>
      </template>
      <el-menu-item index="profile">Profile</el-menu-item>
      <el-menu-item index="events">My events</el-menu-item>
      <el-menu-item index="logout">Logout</el-menu-item>
    </el-sub-menu>
    <div style="flex-grow: 0.5"></div>
  </el-menu>
</template>

<style scoped lang="scss">
</style>