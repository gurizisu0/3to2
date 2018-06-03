<template>
  <div class="content">
    <div class="content-header">
      <div class="thumbnail1">
        <img :src='contentData["_embedded"]["wp:featuredmedia"][0]["source_url"]' alt="">
      </div>
      <div class="thumbnail2">
        <img :src='contentData["_embedded"]["wp:featuredmedia"][0]["source_url"]' alt="">
      </div>
    </div>

    <div class="content-top">
      <h1>{{contentData.title.rendered}}</h1>
      <p>{{contentData.date}}</p>
    </div>

    <hr class="term-line">

    <div class="content-content">
      <div class="honbun" v-html="contentData.content.rendered"></div>
    </div>

  </div>
</template>
<script>
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
  name: "Content",
  props: {'content':Object},
  data: () => ({
    contentData:{},
  }),
  methods: {
    getContent(param) {
      var contentInfo = {}
      var contentUrl = 'https://quaerere.sakura.ne.jp/sector-queen/odai/wp-json/wp/v2/posts/' + param + '?_embed';
      axios.get( contentUrl ).then( response => {
        var newData = response.data
        newData.date = newData.date.split("T")[0]
        this.contentData = newData
      }).catch(error => {
        console.log("エラーです..." + error);
      })
      return contentInfo
    }
  },
  mounted() {
    if (!this.content.title) {
      this.contentData = this.getContent(this.$route.params.id)
    } else {
      this.contentData = this.content
    }
  }
}
</script>

<style>
.content {
  padding: 0 0 50px;
}

.honbun {
  text-align: left;
}

.term-line {
  width: 750px;
  margin: 50px auto;
}

.content-header {
  width: 100%;
  position: relative;
  height: 500px;
}

.thumbnail1 {
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  z-index: 2;
}
.thumbnail1::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,.6);
  z-index: 3;
}

.thumbnail1 img {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
}

.thumbnail2 {
  width: 50%;
  height: 350px;
  overflow: hidden;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
  border-radius: 10px;
  vertical-align: middle;
}
.thumbnail2 img {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
  border-radius: 10px;
}





.content-content,.content-top,.content-bottom {
  width: 750px;
  padding: 10px;
  margin: auto;
  background-color: #fff;
}

.content-top {
  margin: 50px auto;
}

.content-top p {
  font-size: 20px;
  margin-top: 20px;
}


/* タグのスタイル */
.content-content h1 {
	font-size: 32px;
	padding: 20px 0!important;
}
.content-content h2 {
	font-size: 28px;
	padding: 10px;
	margin: 60px 0 20px;
	background-color: #E9BB4F;
	color: white;
}
.content-content h2:first-letter {
	font-size: 28px;
	color: white;
}
.content-content h3 {
	font-size: 24px;
	margin: 30px 0 20px;
}
.content-content h3:first-letter {
	font-size: 28px;
}
.content-content p {
	font-size: 18px;
	line-height: 28px
}
.content-content a {
	color: #95CDE8;
}
.content-content ul {
	border: solid 2px #000;
	padding: 10px;
	border-radius: 5px;
}
.content-content li {
  list-style: none;
	font-size: 20px;
}
.content-content img {
  width: 500px;
}

pre {
	width: 100%!important
}

code {
  font-family: monospace;
  font-size: .8em;
  background-color: #394548;
  color: #E3E3E3;
  padding: 20px!important;
  overflow: hidden;
  position: relative;
  width: 100%!important;
  height: auto;
  line-height: 1em;
}

/* content bottom */
.content-bottom {
  margin-top: 50px;
}

@media (max-width: 767px) {
  .content-header {
    width: 100%;
    height: 300px;
  }

  .thumbnail1 {
    width: 100%;
    height: 300px;
  }
  .thumbnail1 img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
  }

  .thumbnail2 {
    width: 50%;
    height: 200px;
  }
}
@media (max-width: 476px) {
  .content-header {
    width: 100%;
    height: 200px;
  }

  .thumbnail1 {
    width: 100%;
    height: 200px;
  }
  .thumbnail1 img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
  }

  .thumbnail2 {
    width: 50%;
    height: 150px;
  }
}

@media (max-width: 767px) {

  .term-line {
    width: 90%;
    margin: 30px auto;
  }

  .content-content,.content-top,.content-bottom {
    width: 90%;
  }
  .content-content img {
    width: 100%;
  }
}

</style>
