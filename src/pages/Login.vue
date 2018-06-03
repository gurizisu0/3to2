<template>
  <!-- サーバーの諸々があるので、デザイン以外はコメントアウト -->
  <div class="login">
    <h2>{{tx.title}}</h2>
    <div class="user-input">
      <p><icon name="envelope"></icon> {{tx.mail}}</p>
      <el-input :placeholder="tx.mail" v-model="email"></el-input>
      <p><icon name="user"></icon> {{tx.username}}</p>
      <el-input :placeholder="tx.username" v-model="username"></el-input>
      <p><icon name="key"></icon> {{tx.password}}</p>
      <el-input :placeholder="tx.password" v-model="password"></el-input>
      <div class="submit-btn">
        <el-button @click="mailRegister()" type="primary">{{tx.signup}}</el-button>
      </div>

      <hr>

      <h3>{{tx.sns}}</h3>
      <div class="share-buttons">
        <div @click="authenticate('facebook')" class="snsButton fb-button"><icon name="brands/facebook"></icon> Facebook</div>
        <div @click="authenticate('twitter')" class="snsButton tw-button"><icon name="brands/twitter"></icon> Twitter</div>
        <div @click="authenticate('github')" class="snsButton gh-button"><icon name="brands/github"></icon> Github</div>
        <div @click="authenticate('google')" class="snsButton gg-button"><icon name="brands/google"></icon> Google+</div>
      </div>

    </div>

  </div>
</template>

<style scoped lang="scss">

.login {
  width: 100%;
  margin: 0 0 50px;
  .user-input {
    width: 80%;
    max-width: 500px;
    margin: auto;
    padding: 40px 40px;
    background-color: $gray;

    .submit-btn {
      margin: 20px 0 50px;
    }
  }

  .share-buttons {

    .snsButton {
      width: 200px;
      margin: 10px 20px;
      display: inline-block;
      color: $white;
      padding: 10px 0;
      border-radius: 4px;
      box-shadow: 1px 1px 3px #808080;
    }
    .fb-button {
      background-color: #4868AD;
    }
    .tw-button {
      background-color: #48A1EC;
    }
    .gh-button {
      background-color: #464646;
    }
    .gg-button {
      background-color: #CD5849;
    }
  }
}

@media(max-width: 767px) {
  .login {
    .user-input {
      padding: 40px 20px;
    }
  }
}
</style>


<script>
import { AuthConfig } from "@/awsConfig"
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from "axios"

export default {
  name: 'Login',
  props: {'tx':Object},
  data () {
    return {
      email: '',
      username: '',
      password: '',
      token: localStorage.getItem('accessToken'),
      loginData:{pass:"",checkPass:"",email:""}
    }
  },
  methods: {
    // authenticate: function (provider) {
    //   let hogex =  new Promise((resolve,reject) =>{
    //     this.authenticate(provider).then(function (response) {
    //     console.log("response"+JSON.stringify(response))
    //     localStorage.setItem('accessToken',response.data.access_token)
    //     resolve(response)
    //   }).then( function (response){
    //     resolve(response)
    //   }).catch(function(err){
    //       console.log(err)
    //   })
    // }).then(function(response){
    //
    //
    // }).catch(function(err){
    //   console.log('err'+err)
    // })
    // },
    mailRegister(){
      alert('Eメール登録は現在,サポートしていません。')
    },
    snsLogin(){
      this.loadingVisible=true
      //axiosでsignupAPIを叩く。thenでtimerを入れる。
      var timer = setInterval(hoge.bind(undefined, "hoge"), 1000);
      //axiosでユーザーが入っているか確認
      var hoge = function(word){
        console.log(word);
      };
    },
    getToken () {
      console.log(localStorage.getItem('accessToken'))
    },
    currentUser (context) {
      const data = Auth.currentAuthenticatedUser().catch((error) => {
        console.log(error)
      })
      if (data) {
        context.commit('setUser', data)
      }
    },
    async ampLogin () {
      // let apiName = 'https://guildusers.auth.ap-northeast-1.amazoncognito.com/'; // replace this with your api name.
      // let path = 'oauth2/authorize'; //replace this with the path you have configured on your API
      // let myInit = {
      //   body: {response_type:'code',
      //     client_id:'1n9rdtcc650uhmb9tat9brakh',
      //     scope:'email'+'openid'}, // replace this with attributes you need
      //   headers: {} // OPTIONAL
      // }
      //     return await API.get(apiName, path,myInit);
      // if (data) {
      //   // router.push('action')
      // }
    },
    ampLogout (context) {
      Auth.signOut().catch((error) => {
        console.log('logout failed', error)
        alert(error)
      })
      context.commit('clearUser')
      // router.push('login')
    },
    regist (context, loginData) {
      const data = Auth.signUp(loginData.email, loginData.password).catch((error) => {
        console.log('Error!', error)
        alert(error)
      })
      if (data) {
        // router.push('confirm_register')
      }
    },
    confirm_regist (context, loginData) {
      const data = Auth.confirmSignUp(loginData.email, loginData.code).catch((error) => {
        console.log('Error!', error)
        alert(error)
      })
      if (data) {
        router.push('/')
      }
    }
  },
  created() {
    if(localStorage.access_token){
      //  this.$router.push('visitor')
    }
  }
}
</script>
