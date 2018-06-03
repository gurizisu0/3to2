<template>
  <div class="contents">
    <h1 class="contents-comment">{{ tx.key1 }}</h1>
    <Infinite :sendRecent="sendRecent" :selectedContent="selectedContent"/>
  </div>
</template>

<script>
import Infinite from '@/components/Infinite'

export default {
  name: 'Contents',
  props: {'tx':Object,'sendRecent':Function,'selectedContent':Function},
  components: {Infinite},
  data () {
    return {
    }
  },
}
</script>

<style scoped lang="scss">

.page1 {
  &-comment{
    color: $black;
  }
}

</style>
