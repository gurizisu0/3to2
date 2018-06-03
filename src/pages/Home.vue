<template>
  <div class="home">
    <h2 class="home-comment">{{tx.title}}</h2>
    
    <p v-if="resultDisp">{{result.name1 + '(' + result.name2 + ')さんの好きな言葉...' + result.words}}</p>
    
    <transition name="fade">
      <Form :tx="tx" :toNext="toNext" v-if="phase==1" name="name1" :num="phase+1"/>
      <Form :tx="tx" :toNext="toNext" v-if="phase==2" name="name2" :num="phase+1"/>
      <Form :tx="tx" :toNext="toNext" v-if="phase==3" name="words" :num="phase+1"/>
    </transition>
    
    <Loading v-if="loadDisp" :text="tx.loading"/>
  </div>
</template>

<script>
import Form from '@/components/Form'
import Loading from '@/components/Loading'

export default {
  name: 'Home',
  components: {Form,Loading},
  props: {'tx':Object},
  data () {
    return {
      result: {},
      phase: 1,
      resultDisp: false,
      
      //loading
      loadDisp: false
    }
  },
  methods: {
    toNext(key, value, n) {
      this.result[key] = value
      if (n < 4) {
        console.log(this.result);
        console.log(n);
        this.phase = n
      } else {
        console.log(this.result);
        this.phase = n
        this.resultDisp = true
        //ここのコメントアウトをなくすとloadingも使えます。
        // this.loadDisp = true
      }
    }
  }
}
</script>

<style scoped lang="scss">

.home {
  width: 80%;
  max-width: 500px;
  margin: auto;
  &-comment{
    color: $black;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
