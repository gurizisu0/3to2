<template>
  <div class="pagename">
    <h1 class="pagename-title">{{tx.title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'PageComp',
  props: {'tx':Object},
  data () {
    return {
    }
  },
}
</script>

<style scoped lang="scss">
.pagename {
  &-title{
    color: $black;
  }
}
</style>
