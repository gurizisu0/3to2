<template>
  <div class="router-manage">
    <h2>Router Management</h2>

    <h3>言語を追加</h3>
    <p>※言語(short)の文字数は2文字でお願いします。</p>
    <div class="elePadding">
      <el-input placeholder="言語(ex...'淫夢語')" v-model="lang.name"></el-input>
    </div>
    <div class="elePadding">
      <el-input placeholder="言語パス(ex...'im')" v-model="lang.lang"></el-input>
    </div>
    <div class="elePadding">
      <el-button type="primary" @click="localeAdd">言語を追加</el-button>
    </div>

    <hr/>

    <h3>ページを追加</h3>
    <p>※コンポーネント名は、頭文字を大文字にしてください。</p>
    <p>※ディレクトリ名は、3文字以上の文字列にしてください。</p>
    <div class="elePadding">
      <el-input placeholder="コンポーネント名(ex...'About')" v-model="comp"></el-input>
    </div>
    <div class="elePadding">
      <el-input placeholder="パス名(ex...'about')" v-model="path"></el-input>
    </div>
    <div class="elePadding">
      <el-button type="primary" @click="pageAdd">ページを追加</el-button>
    </div>

    <hr/>

    <el-tabs v-model="activeName">
      <el-tab-pane :label="p" :name="p" :key="p" v-for="p in pages">
        <div class="textManageTop">
          <ul>
            <li>keys</li>
            <li v-for="l in locales">{{l.name}}</li>
          </ul>
        </div>
        <div class="textManageTab">
          <ul>
            <li v-for="n in text.keys.length">{{text.keys[n-1]}} <el-button @click="openTrash(n-1)" type="danger" icon="el-icon-delete" circle></el-button></li>
          </ul>
          <ul v-for="l in locales">
            <li v-for="n in text.keys.length"><el-input type="textarea" v-model="text[l.lang][text.keys[n-1]]"></el-input></li>
          </ul>
        </div>

        <center>
          <el-button @click="textAdd" type="success" icon="el-icon-plus" circle></el-button>
        </center>

      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" @click="textChange">{{activeName}}を保存</el-button>

    <el-dialog
      title="Please type a new variable"
      :visible.sync="displayVar"
      width="30%">
      <el-button @click="displayVar = false">キャンセル</el-button>
      <el-button type="primary" @click="textTrash">消去</el-button>
    </el-dialog>

    <el-dialog
      title="Please type a new variable"
      :visible.sync="displayAdd"
      width="30%">
      <el-input placeholder="Please input" v-model="variable"></el-input>
      <el-button @click="displayAdd = false">キャンセル</el-button>
      <el-button type="primary" @click="makeVariable">追加</el-button>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import pagesJson from '@/manage/pages.json'
import localeJson from '@/router/locale.json'

export default {
  name: 'RouterManage',
  data () {
    return {
      pages: pagesJson,
      locales: localeJson,
      activeName: '',
      lang: {name:'',lang:''},
      comp: '',
      path: '',
      displayAdd: false,
      displayVar: false,
      variable: '',
      varNum: 0
    }
  },
  created() {
    //tab初期値設定
    this.activeName = this.pages[0]
  },
  computed: {
    text() {
      var v = require('@/router/pages/' + this.activeName.toLowerCase() + '.json')
      var obj = {}
      obj.keys = v.keys
      for (var i=0; i<this.locales.length; i++) {
        obj[this.locales[i].lang] = v[this.locales[i].lang]
      }
      return obj
    }
  },
  mounted() {
  },
  methods: {
    localeAdd() {
      console.log(this.lang);
      if (this.lang.lang.length == 2 && this.lang.name != '') {
        this.$message('Adding language...');
        axios.post('http://localhost:8081/locale', {lang: this.lang, pages: this.pages}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
      } else {
        this.$message.error('Please add a language!');
      }
    },
    pageAdd() {
      if (this.comp != '' && this.path != '' && this.comp[0] != this.comp.toLowerCase()[0] && this.path.length > 2) {
        this.$message('Adding page...');
        var locales = []
        for (var l of this.locales) {
          locales.push(l.lang)
        }
        console.log(locales);
        axios.post('http://localhost:8081/pages', {comp: this.comp, path: this.path, locale: locales}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
      } else {
        this.$message.error('You might have some errors...');
      }
    },
    openTrash(n) {
      this.displayVar = true
      this.varNum = n
    },
    textTrash() {
      this.displayVar = false
      this.$message('Deleting variable...');
      var locales = []
      for (var l of this.locales) {
        locales.push(l.lang)
      }
      axios.post('http://localhost:8081/trash', {key: this.text.keys[this.varNum], num: this.varNum, page: this.activeName, locale: locales}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    },
    textAdd() {
      this.displayAdd = true
    },
    makeVariable() {
      if (this.variable != '') {
        var same = false
        for (var i=0; i<this.text.keys.length; i++) {
          if (this.variable == this.text.keys[i]) {
            same = true
          }
        }
        if (same == false) {
          this.$message('Adding variable...');
          var locales = []
          for (var l of this.locales) {
            locales.push(l.lang)
          }
          axios.post('http://localhost:8081/variable', {variable: this.variable, page: this.activeName, locale: locales}).then((res) => {
            console.log(res);
            this.display = false
          }).catch((err) => {
            console.log(err);
          })
        } else {
          this.$message.error('You already made same variable!');
        }
      } else {
        this.$message.error('Please type something...');
      }
    },
    textChange() {
      console.log(this.text);
      this.$message('Changing text...');
      axios.post('http://localhost:8081/text', {text: this.text, page: this.activeName}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped lang="scss">

.router-manage {
  color: $black;
  width: 80%;
  margin: 50px auto 100px;

  hr {
    margin: 50px auto;
    width: 100%;
  }
  .elePadding {
    margin: 10px auto;
    width: 60%;
  }
  p {
    font-size: 14px;
    margin-top: 0;
  }
  
  .textManageTop {
    ul {
      display: flex;
      flex-grow: 1;
      width: 100%;

      li {
        height: 50px;
        margin-bottom: 20px;
        margin: auto;
      }
    }
  }

  .textManageTab {
    display: flex;
    flex-grow: 1;
    width: 100%;

    ul {
      margin: auto;
      width: 95%;
      border-left: 1px solid #f3f3f3;

      li {
        width: 100%;
        height: 50px;
        margin-bottom: 20px;
        border-bottom: 1px solid #f3f3f3;
        padding-bottom: 20px;
      }
    }
  }
}
</style>
