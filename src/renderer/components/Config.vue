<template>
  <el-main>
    <el-form ref="form" :model="form">
      <el-form-item label="Translation Server Path">
        <el-input v-model="form.name" placeholder="http://localhost:3000/"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<style lang="scss">
	@import '@/assets/css/custom.scss';
</style>

<script>
const Store = require('electron-store')
const store = new Store({
  name: 'lr-translate',
  cwd: 'lr-translate'
})

export default {
  name: 'config',
  data: function () {
    return {
      translateServerPath: '',
      form: {
        name: store.get('translation.server.path', '')
      }
    }
  },
  methods: {
    onSubmit () {
      store.store = {
        name: this.form.name
      }
      console.log('submit!')
    }
  }
}
</script>