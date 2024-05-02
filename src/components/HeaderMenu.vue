<script setup lang="ts">
import {isDark, toggleDark} from "../composable/dark.ts";
import {ref} from "vue";

const activeIndex = ref(1)

function handleSelect(eventData){

}
</script>

<template>
  <el-header>
    <img
        src="../assets/logo-text.svg"
        alt="MeetMap logo"
    />
    <el-button @click="toggleDark()" type="primary">
      {{isDark}}
    </el-button>
  </el-header>
</template>

<style scoped lang="scss">
</style>