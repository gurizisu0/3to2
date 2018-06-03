<template>
  <div ref="contents" class="infinite">
    <span>{{ scrollY }}</span>
    <span>{{ libraryY }}</span>


    <ul @scroll="infiniteScroll">
      <li v-for="(content, index) in contents" @click="selectContent(index)">
        <div class="content-img">
          <img :src='content["_embedded"]["wp:featuredmedia"][0]["source_url"]' alt="">
        </div>

        <div class="content-text">
          <h2>{{content.title.rendered}}</h2>
          <p>{{content.date}}</p>
        </div>
      </li>
    </ul>
    <p class="loadTest" v-if="loading">{{loadText}}</p>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Infinite",
  props:{'sendRecent':Function,'selectedContent':Function},
  data: () => ({
     contents: [],
     scrollY: 0,
     libraryY: 0,
     loading: false,
     loadText: 'loading now...',
  }),
  mounted() {
    this.getContents();
  },
  methods: {
    getContents() {//axiosでやる場合
      if (this.scrollY != 0) {
        this.loading = true;
      }
      var getUrl = 'https://quaerere.sakura.ne.jp/sector-queen/odai/wp-json/wp/v2/posts?_embed&per_page=5&offset=' + this.contents.length
      axios.get( getUrl ).then( response => {
        if (this.libraryY == 0) {
          this.libraryY = this.$refs.contents.getBoundingClientRect().height;
          window.addEventListener('scroll', this.infiniteScroll);
        }

        var newData = response.data
        for (var i=0; i<newData.length; i++) {
          newData[i].date = newData[i].date.split("T")[0]
        }
        if (this.contents.length == 0) {
          this.sendRecent(newData)
        }
        this.contents = this.contents.concat(newData)

        if (response.data.length == 5) {
          this.loading = false;
        } else {
          this.loadText = 'これ以上記事はありません。'
        }
      }).catch(error => {
        console.log(error);
      })
    },
    
    infiniteScroll() {
      if (this.$route.fullPath=='/contents' || this.$route.fullPath.match(/\/..\/contents/) != null) {//contentsページ（言語別）だけscrollイベント発火
        this.libraryY = this.$refs.contents.getBoundingClientRect().height
        this.scrollY = window.scrollY;
        if (this.scrollY >= this.libraryY - window.innerHeight) {
          if (this.loading == false) {
            this.getContents()
          }
        }
      }
    },
    selectContent(index) {//選んだ記事にデータを渡しページ遷移する。
      this.selectedContent(this.contents[index])
    }
  }
}
</script>

<style scoped lang="scss">
.infinite {
  width: 100%;
  margin: auto;
  padding: 50px 0;
  position: relative;
  ul {
    padding: 0;
    position: relative;
    width: 100%;
    display: inline-block;
    margin: auto;
    li {
      list-style: none;
      position: relative;
      max-width: 400px;
      width: 90%;
      display: inline-block;
      /* float: left; */
      margin: 20px;
      overflow: hidden;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid #f3f3f3;
      .content-img {
        max-width: 400px;
        width: 100%;
        max-height: 225px;
        height: 30%;
        margin: auto;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .content-text {
        position: relative;
        max-width: 400px;
        width: 90%;
        height: 100px;
        margin: auto;
        background-color: #fff;
        padding: 10px;
        text-align: left;
        h2 {
          font-size: 16px;
          width: 100%;
          margin: 0;
        }
        p {
          margin-top: 10px;
        }
      }
    }
  }
  .loadTest {
    margin-bottom: 0;
  }
}

</style>
