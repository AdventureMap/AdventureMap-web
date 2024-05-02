<script setup lang="ts">
import HeaderMenu from "../components/HeaderMenu.vue";
import {onMounted, reactive, ref} from "vue";
import router from "../plugins/router.ts";
import {ElMessage} from "element-plus";
import * as userController from "../api/UserController.ts" ;
import {useUserStore} from "../stores/user.js";

const authPage = ref("register")
const userStore = useUserStore()
const form = reactive({
  username: "",
  email: "",
  phone: "",
  password: "",
  rpassword: "",
})

function authPageHandler(pathName){
  router.push({name: pathName})
}
function submit(){
  let flag = false
  if(form.username==""){
    ElMessage.error({message: "Username must not be empty"})
    flag = true
  }
  if(form.username.includes('@')){
    ElMessage.error({message: "Username must not include '@'"})
    flag = true
  }
  if(form.email==""){
    ElMessage.error({message: "Email must not be empty"})
    flag = true
  }
  if(form.email.startsWith('@') ||
    form.email.endsWith('@') ||
    !form.email.includes('@')
  ){
    ElMessage.error({message: "Email incorrect"})
    flag = true
  }
  if(form.phone==""){
    ElMessage.error({message: "Phone must not be empty"})
    flag = true
  }
  if(form.password==""){
    ElMessage.error({message: "Password must not be empty"})
    flag = true
  }
  if(form.password.length<8){
    ElMessage.error({message: "Password must be longer than 8 characters"})
    flag = true
  }
  if(form.rpassword!=form.password){
    ElMessage.error({message: "Passwords doesn't match"})
    flag = true
  }
  if(flag)return
  userController.signUp(form.username,form.email,form.phone,form.password)
    .then(res => {
      ElMessage.success("Registered")
      router.push({name: "login"})
    })
    .catch(err => {
      console.log(err)
      ElMessage.error({
        message:"HTTP status: "+err.response.status
            +"\nRegistration error\n"+
            err.response.data.description
      })
    })
}

onMounted(() => {
  userStore.get()
})
</script>

<template>
  <HeaderMenu></HeaderMenu>
  <div style="margin: 6vh"></div>
  <el-row justify="center">
    <el-col style="justify-self: center">
      <h2>Registration form</h2>
    </el-col>
    <el-col>
      <div style="margin: 16px"></div>
    </el-col>
    <el-col :xs="20" :sm="16" :md="12" :lg="10" class="login-form">
      <el-form
          label-position="left"
          label-width="auto"
          :model="form"
          style="max-width: 600px"
      >
        <el-radio-group v-model="authPage" @change="authPageHandler">
          <el-radio-button value="login">Login</el-radio-button>
          <el-radio-button value="register">Register</el-radio-button>
        </el-radio-group>
        <div style="margin: 16px"></div>
        <el-form-item label="Username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Phone">
          <el-input type="number" v-model="form.phone" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input show-password v-model="form.password" />
        </el-form-item>
        <el-form-item label="Repeat password">
          <el-input show-password v-model="form.rpassword" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary">
            Submit
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
@use '../styles/colors';
.login-form {
  padding: 16px;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-light);
  background: var(--el-menu-bg-color);
}
.el-row h2{
  text-align: center;
  color: colors.$l-primary;
}
</style>