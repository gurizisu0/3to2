<template>
  <div id="app">
    <header>
      <WebHeader/>
    </header>
    <main>
      <router-view v-bind:sendRecent="sendRecent" v-bind:content="content" v-bind:selectedContent="selectedContent"></router-view>
    </main>
    <footer>
      <AppFooter v-if="$resize && $mq.below(768)"/>
      <WebFooter v-if="$resize && $mq.above(769)"/>
    </footer>
  </div>
</template>

<script>
import WebHeader from '@/components/WebHeader'
import AppFooter from '@/components/AppFooter'
import WebFooter from '@/components/WebFooter'

export default {
  name: 'app',
  components: {WebHeader,AppFooter,WebFooter},
  data() {
    return {
      recentContents: [],
      content: {},
    }
  },
  methods: {
    // infiniteScroll関連
    sendRecent(contents) {
      this.recentContents = contents
    },
    selectedContent(content) {
      this.content = content
      if (location.href.split('/')[4] == 'contents') {
        console.log(location.href.split('/')[3]);
        this.$router.push('/' + location.href.split('/')[3] + '/contents/' + content.id)
      } else {
        this.$router.push('/contents/' + content.id)
      }
    },
  }
}
</script>

<style scoped lang="scss">
#app {
  //ここでグローバルのフォントを設定（消さないでください）
  @include font;
  color: $black;
}

header {
  margin: 0;
  padding: 0;
}

main {
  text-align: center;
  padding: 40px 0;
}

header {
  margin: 0;
  padding: 0;
}
</style>

<!-- デフォルトのcssを無効化するためのもの。 -->
<style>body {margin: 0;}</style>
