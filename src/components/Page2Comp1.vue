<template>
  <div class="page2comp1">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Page2Comp1',
  data () {
    return {
      msg: 'This is component 1'
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

.page2comp1 {
  color: $black;
}

</style>
