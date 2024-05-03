<script setup lang="ts">
import HeaderMenu from "../components/HeaderMenu.vue";
import UserDetailField from "../components/UserDetailField.vue"
import {onMounted, reactive, ref} from "vue";
import {useUserStore} from "../stores/user.js";
import router from "../plugins/router.ts";
import * as userController from "../api/UserController.ts" ;
import {ElMessage} from "element-plus";
import {dateToString} from "../composable/date.ts";

const props = defineProps<{
    id: string
}>()
const userDetail = reactive({
  name: "",
  lastName: "",
  city: "",
  birthDate: "",
  registrationTimestamp: "",
  events: [],
  username: "",
})
const userStore = useUserStore()
const editInfoDialog = ref(false)
const editInfoForm = reactive({
  name: userDetail.name,
  lastName: userDetail.lastName,
  city: userDetail.city,
  bithDate: userDetail.birthDate,
})
const changePasswordDialog = ref(false)
const changePasswordForm = reactive({
  oldpass: "",
  newpass: "",
})

function changePasswordConfirm(){
  let flag = false
  if(changePasswordForm.newpass==""){
    ElMessage.error({message: "Password must not be empty"})
    flag = true
  }
  if(changePasswordForm.newpass.length<8){
    ElMessage.error({message: "Password must be longer than 8 characters"})
    flag = true
  }
  if(flag)return
  userController.set_password(
      changePasswordForm.oldpass,
      changePasswordForm.newpass,
      userStore.atoken
  )
      .then(res => {
        console.log(res)
        ElMessage.success({message: "Password was changed"})
      })
      .catch(err => {
        console.log(err)
        ElMessage.error({message: "Old password is incorrect"})
      })
}
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
      userDetail.registrationTimestamp = user.registrationTimestamp
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
                userDetail.registrationTimestamp = user.registrationTimestamp
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
    <el-col :xs="20" :sm="20" :md="18">
      <el-row :gutter="16">
        <el-col :xs=" 24" :md="7">
          <el-row justify="center" :gutter="36">
            <el-col :xs="24" :sm="8" :md="24">
              <el-row justify="center">
                <el-avatar :size="204" shape="square"></el-avatar>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="0" :md="24">
              <div style="margin: 16px"></div>
            </el-col>
            <el-col :xs="20" :sm="12" :md="24">
              <el-row v-if="userStore.user_id==id" justify="center">
                <el-button @click="editInfoDialog=true" style="width: 100%" type="info">
                  Edit info
                </el-button>
              </el-row>
              <el-row><div style="margin: 4px"></div></el-row>
              <el-row>
                <UserDetailField>
                  <template #title>
                    Name:
                  </template>
                  <template v-if="userDetail.name!=''" #content>
                    {{userDetail.name}}
                  </template>
                </UserDetailField>
              </el-row>
              <el-row>
                <UserDetailField>
                  <template #title>
                    Last Name:
                  </template>
                  <template v-if="userDetail.lastName!=''" #content>
                    {{userDetail.lastName}}
                  </template>
                </UserDetailField>
              </el-row>
              <el-row>
                <el-divider content-position="left">Other:</el-divider>
              </el-row>
              <el-row>
                <UserDetailField>
                  <template #title>
                    City:
                  </template>
                  <template v-if="userDetail.city!=null" #content>
                    {{userDetail.city}}
                  </template>
                </UserDetailField>
              </el-row>
              <el-row>
                <UserDetailField>
                  <template #title>
                    Birth date:
                  </template>
                  <template v-if="userDetail.birthDate!=null" #content>
                    {{dateToString(userDetail.birthDate)}}
                  </template>
                </UserDetailField>
              </el-row>
              <el-row>
                <UserDetailField>
                  <template #title>
                    Registered:
                  </template>
                  <template v-if="userDetail.registrationTimestamp!=null" #content>
                    {{dateToString(userDetail.registrationTimestamp)}}
                  </template>
                </UserDetailField>
              </el-row>
              <el-row><div style="margin: 4px"></div></el-row>
              <el-row v-if="userStore.user_id==id" justify="center">
                <el-button @click="changePasswordDialog=true" style="width: 100%" type="info">
                  Change password
                </el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :md="17">
          <el-card>
            Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-dialog v-model="changePasswordDialog" title="Change password" width="500">
    <el-form :model="changePasswordForm">
      <el-form-item label="Old password" :label-width="140">
        <el-input v-model="changePasswordForm.oldpass" show-password />
      </el-form-item>
      <el-form-item label="New password" :label-width="140">
        <el-input v-model="changePasswordForm.newpass" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="changePasswordDialog = false">Cancel</el-button>
        <el-button type="primary" @click="changePasswordConfirm">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
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