<template>
  <div id="app">
    <el-container>
      <el-menu default-active="1" :collapse="isCollapse">
        <el-menu-item index="1">
          <i class="el-icon-upload" ></i>
        </el-menu-item>
      </el-menu>

      <el-container>
        <el-main>
          <el-form :model="formInline" label-width="120px">
            <el-row style="margin-bottom:24px;padding-bottom:24px;border-bottom: solid 1px #ddd;">
              <el-button-group >
                <el-button type="danger" icon="el-icon-circle-check" @click="onSubmit" >Run</el-button>
              </el-button-group>
            </el-row>
            <el-form-item label="Source Folder" >
              <el-input v-model="formInline.user" placeholder="Translated Folder" ></el-input>
            </el-form-item>
            <el-form-item label="Translated Folder" style="margin-bottom:24px;padding-bottom:24px;border-bottom: solid 1px #ddd;">
              <el-input v-model="formInline.user" placeholder="Translated Folder"></el-input>
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
        labelPosition: 'left',
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