<template>
  <div class="terms">
    <h1 class="terms-title">{{tx.title}}</h1>
    <p>{{tx.desc}}</p>

    <div v-for="num in 18">
      <h2>{{tx['t' + num]}}</h2>
      <p v-html="tx['t' + num + 'd']"></p>
    </div>

    <h2 class="terms-title">{{tx.last}}</h2>
    <p>{{tx.lastDesc}}</p>
  </div>
</template>

<script>
export default {
  name: 'Terms',
  props: {'tx':Object},
  data () {
    return {
    }
  },
}
</script>

<style scoped lang="scss">
.terms {
  width: 80%;
  max-width: 700px;
  margin: auto;
  &-title{
    color: $black;
  }
  p {
    text-align: left;
  }
}
</style>
