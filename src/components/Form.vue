<template>
  <div class="form">
    <p class="form-comment">{{tx['key' + (num-1)]}}</p>
    <div class="elePadding">
      <el-input placeholder="入力してください" v-model="value"></el-input>
      <p v-if="error" style="color: red">入力してください。</p>
    </div>
    <div class="elePadding">
      <el-button type="primary" @click="nextPage">送信</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {'tx':Object,'toNext':Function,'name':String,'num':Number},
  data () {
    return {
      value: '',
      error: false
    }
  },
  methods: {
    nextPage() {
      if (this.value != '') {
        this.toNext(this.name, this.value, this.num)
        this.value = ''
        this.error = false
      } else {
        this.error = true
      }
    }
  }
}
</script>

<style scoped lang="scss">

.form {
  .elePadding {
    padding: 10px 0;
  }
}

</style>
