<script lang="ts">
</script>

<template>
  <el-col :span="12">
    <h4><slot name="title" /></h4>
  </el-col>
  <el-col :span="12">
    <p><slot name="content">Not specified</slot></p>
  </el-col>
</template>

<style scoped lang="scss">
h4 {
  margin-right: 4px;
}
p {
  text-align: right;
  color: var(--el-text-color-placeholder)
}
</style>