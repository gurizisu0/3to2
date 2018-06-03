<template>
  <div class="app-footer">
    <div class="padDiv"></div>
    <div class="menu-footer">
      <ul class="app-menu">
        <li @click="changePage(index)" v-for="(menu, index) in menus">
          <router-link :to="path2Locale() + menu.path">
            <icon :class="pageNum | largeIcon(pageNum, index, index)" :name="menu.icon"></icon>
          </router-link>
        </li>
      </ul>
    </div>
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
      menuOpen: false,
      pageNum: -1,
      lang: ''
    }
  },
  methods: {
    changePage(i) {
      this.pageNum = i
    },
    path2Locale() {
      if (this.lang != 'ja') {
        return '/' + this.lang
      } else {
        return ''
      }
    }
  },
  filters: {//曲者だからいじらないほうがいい。
    largeIcon(a, b, c) {
      if (a == c) {
        return 'large_icon';
      } else {
        false
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
.padDiv {
  height: 60px;
}
.menu-footer {
  position: fixed;
  display: table-cell;
  z-index: 2;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: $white;
  border-top: 1px solid $gray;

  .app-menu {
    position: relative;
    display: flex;
    width: 100%;
    height: 60px;
    margin: 0;

    li {
      position: relative;
      width: 20%;
      text-align: center;
      height: 60px;
      line-height: 60px;
      margin: 0;
      font-size: 30px;

      a {
        display: inline-block;
        position: relative;
        color: $secondColor;
        width: 100%;
        height: 60px;
        .fa-icon {
          width: auto;
          height: 20px;
          max-width: 100%;
          max-height: 100%;
          transition: .2s;
        }
      }

      .large_icon {//メニュークリック時のアイコンの変化を記述。
        height: 30px!important;
        transition: .2s;
      }
    }
  }
}

</style>
