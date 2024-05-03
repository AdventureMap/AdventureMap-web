<script setup lang="ts">
import HeaderMenu from "../components/HeaderMenu.vue";
import {onMounted, reactive, ref} from "vue";
import {useUserStore} from "../stores/user.js";
import router from "../plugins/router.ts";
import * as userController from "../api/UserController.ts" ;
import {ElMessage} from "element-plus";

const props = defineProps<{
    id: string
}>()
const userDetail = reactive({
  name: "",
  lastName: "",
  city: "",
  birthDate: "",
  registrationTimestamp: 0,
  events: [],
  username: "",
})
const userStore = useUserStore()

onMounted(() => {
  userStore.get()
  if(userStore.username == ""){
    router.push({name: "login"})
  }
  userController.info(userStore.atoken, Number(props.id))
    .then(res => {
      console.log(res)
      console.log("by access")
      const user = res.data.data
      userDetail.name = user.name
      userDetail.lastName = user.lastName
      userDetail.city = user.city
      userDetail.birthDate = user.birthDate
      userDetail.registrationTimestamp = Date.parse(user.registrationTimestamp)
      if(user.events != null){
        userDetail.events = Array.from(user.events)
      }else{
        userDetail.events = []
      }
      userDetail.username = user.username
    })
    .catch(err => {
      console.log(err)
      userController.token(userStore.rtoken)
        .then(res => {
          console.log("token was refreshed")
          userStore.$patch(state => {
            state.atoken = res.data.data.access_token
            state.rtoken = res.data.data.refresh_token
          })
          userStore.set()
          userController.info(userStore.atoken, Number(props.id))
              .then(res => {
                console.log(res)
                console.log("by refresh")
                const user = res.data.data
                userDetail.name = user.name
                userDetail.lastName = user.lastName
                userDetail.city = user.city
                userDetail.birthDate = user.birthDate
                userDetail.registrationTimestamp = Date.parse(user.registrationTimestamp)
                if(user.events != null){
                  userDetail.events = Array.from(user.events)
                }else{
                  userDetail.events = []
                }
                userDetail.username = user.username
              })
              .catch(err => {
                console.log(err)
                userStore.$reset()
                userStore.set()
                router.push({name: "login"})
              })
        })
        .catch(err => {
          console.log(err)
          userStore.$reset()
          userStore.set()
          router.push({name: "login"})
        })
    })
})
</script>

<template>
  <HeaderMenu></HeaderMenu>
  <el-row justify="center">
    <el-col>
      <div style="margin: 16px"></div>
    </el-col>
    <el-col class="header">
        <h2>{{userDetail.username}}</h2><h4>'s profile</h4>
    </el-col>
    <el-col>
      <div style="margin: 16px"></div>
    </el-col>
    <el-col :xs="20" :sm="20" :md="18" :lg="16">
      <el-card>
        <el-row>
          <el-col :sm=" 24" :md="6">
            <el-row>
              <el-avatar style="width: 100%" shape="square"></el-avatar>
            </el-row>
          </el-col>
          <el-col :sm="24" :md="18">
            <el-card></el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
@use '../styles/colors';
.el-card {
  width: 100%;
  height: 100%;
}
.header {
  text-align: center;
  &>h4 {
    color: colors.$l-primary;
    display: inline;
  }
  &>h2 {
    color: colors.$l-secondary;
    display: inline;
  }
}
</style>