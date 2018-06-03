<template>
  <div class="style-manage">
    <h2>Style Management</h2>
    <p>色コード: {{color}}</p>
    <el-color-picker v-model="color" show-alpha></el-color-picker>

    <h3>選択した色コードを設定</h3>
    <el-button :plain="true" @click="pickColor(1)">$firstColorに設定</el-button>
    <el-button :plain="true" @click="pickColor(2)">$secondColorに設定</el-button>
    <el-button :plain="true" @click="pickColor(3)">$thirdColorに設定</el-button>
    <el-button :plain="true" @click="pickColor(4)">$fourthColorに設定</el-button>
    <el-button :plain="true" @click="pickColor(5)">$fifthColorに設定</el-button>

    <hr/>

    <h3>フォントをアップロード</h3>
    <el-upload
      class="upload-demo"
      action="http://localhost:8081/fontup"
      ref="uploadFont"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">ファイル選択</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadFont">アップロード</el-button>
      <div slot="tip" class="el-upload__tip"></div>
    </el-upload>

    <h3>フォントを選択</h3>
    <el-select v-model="font" placeholder="フォント選択">
      <el-option
        v-for="font in fonts"
        :key="font"
        :label="font"
        :value="font">
      </el-option>
    </el-select>

    <h3>フォントを変更</h3>
    <el-button type="primary" @click="fontChange">フォント変更</el-button>

    <hr/>

    <h3>favicon/pwa用の画像をアップロード</h3>
    <el-upload
      class="upload-demo"
      action="http://localhost:8081/icon"
      ref="uploadIcon"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">画像選択</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadIcon">アップロード</el-button>
      <div slot="tip" class="el-upload__tip"></div>
    </el-upload>
  </div>
</template>

<script>
import axios from 'axios'
import json from '@/manage/fonts.json'

export default {
  name: 'StyleManage',
  data () {
    return {
      color: '',
      fonts: json,
      font: ''
    }
  },
  methods: {
    submitUploadFont() {
      this.$message('Uploading file...');
      this.$refs.uploadFont.submit();
    },
    submitUploadIcon() {
      this.$message('Uploading image...');
      this.$refs.uploadIcon.submit();
    },
    pickColor(id) {
      if (this.color != '') {
        this.$message('Changing color...');
        axios.post('http://localhost:8081/color', {id: id, color: this.color}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
      } else {
        this.$message.error('Please select a color code!');
      }
    },
    fontChange() {
      if (this.font != '') {
        this.$message('Changing font...');
        axios.post('http://localhost:8081/fontchg', {font: this.font}).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
      } else {
        this.$message.error('Please select a font!');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.style-manage {
  color: $black;
  margin: 50px auto 100px;

  hr {
    margin: 50px auto;
    width: 80%;
  }
}

</style>
