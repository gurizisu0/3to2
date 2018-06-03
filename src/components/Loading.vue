<template>
  <div id="loader-bg">
    <div id="loader">
      <PulseLoader class="load" :loadColor="loadColor"/>
      <p>{{text}}</p>
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'Loading',
  props: {'text':String},
  components: {PulseLoader},
  data () {
    return {
      loading: false,
      loadColor: '#68CFC3'
    }
  }
}
</script>

<style scoped lang="scss">
#loader-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background: $white;
  opacity: .95;
  z-index: 10;
  #loader {
    position: fixed;
    top: 40%;
    width: 100%;
    color: $white;
    z-index: 11;
    p {
      color: $black;
    }
  }
}
#load .v-pulse {
  background-color: $firstColor!important;
}
</style>
