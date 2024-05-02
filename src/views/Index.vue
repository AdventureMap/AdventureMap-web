<script setup lang="ts">
import HeaderMenu from "../components/HeaderMenu.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {useUserStore} from "../stores/user.js";
import router from "../plugins/router.ts";
import {initMap} from "../plugins/yamap.ts"
import {isDark} from "../composable/dark.ts";

const userStore = useUserStore()
let map: YMap = undefined

onMounted(() => {
  userStore.get()
  if(userStore.username == ""){
    router.push({name: "login"})
  }
  map = initMap(isDark.value?"dark":"light")
})
</script>

<template>
  <HeaderMenu></HeaderMenu>
  <el-main id="map"></el-main>
</template>

<style scoped lang="scss">
.el-main {
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>