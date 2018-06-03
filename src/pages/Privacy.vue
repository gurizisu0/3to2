<template>
  <div class="privacy">
    <h1 class="terms-title">{{tx.title}}</h1>
    <p>{{tx.desc}}</p>

    <div v-for="num in 8">
      <h2>{{tx['t' + num]}}</h2>
      <p v-html="tx['t' + num + 'd']"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Privacy',
  props: {'tx':Object}
}
</script>

<style scoped lang="scss">
.privacy {
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
