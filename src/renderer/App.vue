<template>
  <div id="app">
    <el-container>
      <el-menu default-active="1" :collapse="isCollapse">
        <el-menu-item index="1">
          <i class="el-icon-upload"></i>
          <span slot="title">Navigator Four</span>
        </el-menu-item>
      </el-menu>

      <el-container>
        <el-main>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formInline.user" placeholder="Source Folder"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="formInline.user" placeholder="Translated Folder"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Run</el-button>
            </el-form-item>
          </el-form>        
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140">
            </el-table-column>
            <el-table-column prop="name" label="Name" width="120">
            </el-table-column>
            <el-table-column prop="address" label="Address">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style>
</style>

<script>
  export default {
    name: 'lr-translate',
    data: function () {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
      return {
        isCollapse: true,
        tableData: Array(20).fill(item),
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>