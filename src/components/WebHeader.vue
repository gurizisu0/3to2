<template>
  <div class="header">
    <div class="header-img">
      <!-- ここで画像を変え、cssを編集する。.header .header-img {width: **px}でサイズを変更。} -->
      <img src="@/assets/quaerere_rogo_white.png" alt="">
    </div>

    <!-- Desctop Menu -->
    <div class="desktop-menu" v-if="$resize && $mq.above(769)">
      <ul>
        <li v-for="menu in menus">
          <router-link :to="path2Locale() + menu.path">{{menu[name2Locale()]}}</router-link>
        </li>
      </ul>
    </div>

    <!-- Mobile Menu -->
    <!-- ハンバーガーメニュー -->
    <div class="mobile-menu" v-if="$resize && $mq.below(768)">
      <a class="menu-trigger" :class="{active: isActive}" @click="openMenu">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>

    <!-- モーダルで表示されるメニュー -->
    <transition name="fade">
      <div id="menu-bg" v-if="menuOpen">
        <div id="menu-content">
          <ul class="menu-mobile">
            <li v-for="menu in menus" @click="openMenu">
              <router-link :to="path2Locale() + menu.path">{{menu[name2Locale()]}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import menuJson from '@/router/menu.json'

export default {
  name: 'AppHeader',
  data () {
    return {
      globalMenus: menuJson,
      menuNum:[1,2,3,4,5],
      menus:[],
      pageNum: -1,
      menuOpen: false,
      isActive: false,
      lang: ''
    }
  },
  methods: {
    changePage(i) {
      this.pageNum = i
    },
    openMenu() {
      var o = !this.menuOpen
      this.menuOpen = o;
      this.isActive = o;
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
    }
  },
  created() {
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
.header {
  width: 100%;
  background-color: $firstColor;
  display: inline-block;
  position: relative;
  height: 60px;
  line-height: 60px;

  .header-img {
    display: inline-block;
    float: left;
    width: 50px;
    height: 60px;
    line-height: 60px;
    padding-left: 30px;

    img {
      width: 100%;
      vertical-align: middle;
    }
  }

  .desktop-menu {
    display: inline-block;
    float: right;
    width: 70%;
    padding-right: 30px;
    ul {
      display: flex;
      width: 100%;
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        margin: auto;
        a {
          text-decoration: none;
          color: $white;
          font-weight: bold;
        }
      }
    }
  }

  .mobile-menu {
    display: block;
    position: fixed;
    right: 24px;
    top: 8px;
    width: 40px;
    height: 40px;
    z-index: 4;

    .menu-trigger,
    .menu-trigger span {
      display: inline-block;
      transition: all .4s;
      box-sizing: border-box;
    }
    .menu-trigger {
      position: relative;
      width: 30px;
      height: 30px;

      span {
        position: absolute;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: $white;
        border-radius: 3px;
      }
      span:nth-of-type(1) {
        top: 4px;
      }
      span:nth-of-type(2) {
        top: 14px;
      }
      span:nth-of-type(3) {
        bottom: 3px;
      }
    }

    .menu-trigger.active span:nth-of-type(1) {
      background-color: $white;
      -webkit-transform: translateY(10px) rotate(-45deg);
      transform: translateY(10px) rotate(-45deg);
    }
    .menu-trigger.active span:nth-of-type(2) {
      background-color: $white;
      left: 200%;
      opacity: 0;
      -webkit-transform: translateY(10px);
      transform: translateY(10px);
      -webkit-animation: active-menu-bar02 .8s forwards;
      animation: active-menu-bar02 .8s forwards;
    }
    @-webkit-keyframes active-menu-bar02 {
      100% {height: 0;}
    }
    @keyframes active-menu-bar02 {
      100% {height: 0;}
    }
    .menu-trigger.active span:nth-of-type(3) {
      background-color: $white;
      -webkit-transform: translateY(-10px) rotate(45deg);
      transform: translateY(-10px) rotate(45deg);
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  #menu-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: $firstColor;
    z-index: 3;

    #menu-content {
      position: fixed;
      top: 10%;
      width: 100%;
      z-index: 2;

      .menu-mobile {
        display: block;
        li {
          display: block;
          float: none;
          width: 100%;
          text-align: center;
          margin: 25px 0;
        }
        a {
          font-size: 30px;
          text-decoration: none;
          color: $white;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
