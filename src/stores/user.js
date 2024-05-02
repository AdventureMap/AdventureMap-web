import {defineStore} from "pinia";

export const useUserStore = defineStore("user",{
    state: () => ({
        user_id: 0,
        username: "",
        atoken: "",
        rtoken: "",
    }),
    actions: {
        set(){
            localStorage.setItem(
                "userStore",JSON.stringify(this)
            )
        },
        get(){
            const obj = JSON.parse(
                localStorage.getItem("userStore")
            )
            this.user_id = obj.user_id
            this.username = obj.username
            this.atoken = obj.atoken
            this.rtoken = obj.rtoken
        }
    }
})