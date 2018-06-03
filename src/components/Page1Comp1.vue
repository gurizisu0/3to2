<template>
  <div class="page1comp1">
    <h2>{{ tx.key2 }}</h2>
    <el-button :plain="true" @click="loading">Load</el-button>
    <Loading v-if="loadDisp" :text="tx.key2"/>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
export default {
  name: 'Page1Comp1',
  props: {'tx':Object},
  components: {Loading},
  data () {
    return {
      msg: 'Loading Screen',
      loadDisp: false
    }
  },
  methods: {
    loading() {
      this.loadDisp = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.page1comp1 {
  color: $black;
}

</style>
