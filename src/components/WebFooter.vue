<template>
  <div class="web-footer">
    <ul>
      <li v-for="menu in menus">
        <router-link :to="path2Locale() + menu.path">{{menu[name2Locale()]}}</router-link>
      </li>
    </ul>

    <div class="locale-menu">
      <a v-for="locale in locales" @click="localeChange(locale.lang)">{{locale.name}}</a>
    </div>

    <div class="share-sns">
      <a v-for="share in shares" @click="shareBtn(share.url)"><icon :name="share.icon"></icon></a>
    </div>

    <div class="powered-by">
      <a href="http://quaerere.org/"><span style="font-family: Arial">©</span> 2018 Powered by Quaerere Co,. Ltd.</a>
    </div>
    </div>
  </div>
</template>

<script>
import menuJson from '@/router/menu.json'
import localeJson from '@/router/locale.json'
import shareJson from '@/router/share.json'

export default {
  name: 'AppHeader',
  data () {
    return {
      globalMenus: menuJson,
      menuNum:[1,2,3,4,6,7,5],//router/menu.jsonの配列からメニューをカスタマイズ
      menus:[],
      locales: localeJson,
      lang: '',
      shares: shareJson
    }
  },
  methods: {
    localeChange(l) {
      if (l != 'ja') {
        window.location.href = window.location.origin + '/' + l
      } else {
        window.location.href = window.location.origin
      }
    },
    path2Locale() {
      if (this.lang != 'ja') {
        return '/' + this.lang
      } else {
        return ''
      }
    },
    name2Locale() {
      if (this.lang != 'ja') {
        return this.lang
      } else {
        return 'ja'
      }
    },
    shareBtn(url) {
      open(url + window.location.origin)
    }
  },
  created() {//言語を変えた際にメニューのパスも変更するようにする。
    //このコンポーネントのメニューを設定
    for (var m of this.menuNum) {
      this.menus.push(this.globalMenus[m-1])
    }

    //最初にURLから言語を判断しておく。
    var lang = window.location.href.split('/')[3]
    if (lang.length == 2) {
      this.lang = lang
    } else {
      this.lang = 'ja'
    }
  }
}
</script>

<style scoped lang="scss">
.web-footer {
  background-color: $gray;
  margin-top: 100px;

  ul {
    text-align: center;
    display: flex;
    height: 100px;
    line-height: 50px;
    margin: 0 0 0 30px;
    li {
    height: 100px;
    line-height: 100px;
    list-style: none;
    text-align: left;
    padding: 0 20px;
      a {
        text-decoration: none;
        color: $black;
        font-weight: bold
      }

    }
  }

  .locale-menu, .share-sns, .powered-by {
    height: 50px;
    line-height: 50px;
    text-align: center;
    a {
      color: $black;
      font-size: 14px;
      cursor: pointer;
      padding-right: 20px;
    }
  }
  .share-sns {
    a {
      padding-right: 40px;
      .fa-icon {
        width: auto;
        height: 20px;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .powered-by {
    a {
      font-weight: bold;
    }
  }
}

@media (max-width: 768px) {
  .web-footer {
    width: 100%;
    position: relative;
    background-color: $gray;
    padding-top: 20px;
    ul {
      display: block;
      width: 90%;
      height: auto;
      margin: auto;
      float: none;
      li {
        height: 50px;
        line-height: 50px;
        list-style: none;
        text-align: left;
        padding: 0;
        margin: auto;
        a {
          text-decoration: none;
          color: $black;
          font-weight: bold
        }
      }
    }

    .locale-menu {
      position: relative;
      float: none;
      width: 90%;
      height: 50px;
      line-height: 50px;
      margin: auto;
      padding-right: 0;
      a {
        padding-right: 20px;
        font-size: 14px;
        text-align: center;
      }
    }

    .powered-by {
      position: relative;
      float: none;
      width: 90%;
      height: 50px;
      line-height: 50px;
      margin: auto;
      padding-right: 0;
      a {
        font-weight: bold;
        color: $black;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}

</style>
