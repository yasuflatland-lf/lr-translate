<template>
  <div id="app">
    <el-container>
      <el-menu default-active="1" :collapse="isCollapse">
        <el-menu-item index="1">
          <i class="el-icon-menu" ></i>
        </el-menu-item>
      </el-menu>

      <el-main>
        <el-form :model="formInline" label-width="120px">
          <el-row>
            <el-button-group >
              <el-button type="default" icon="el-icon-circle-check" ref="execBtn" @keydown="onSubmit" >Run</el-button>
            </el-button-group>
          </el-row>
          <el-row>
            <el-form-item label="Source Folder" >
              <el-input v-model="formInline.source" placeholder="Translated Folder" @focus="srcClick" ></el-input>
            </el-form-item>
            <el-form-item label="Translated Folder">
              <el-input v-model="formInline.dist" placeholder="Translated Folder" @focus="distClick"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <!-- Target list -->
        <target-table :items="tableData"></target-table>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
@import 'assets/css/custom.scss';

/* Main continer */
.el-main {
  .el-form {
    .el-row {
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: solid 1px #ddd;
    }
  }
}

/* Side bar*/
.el-menu {
  background-color: #444;
  color: #303133;
}
</style>

<script>
  import {fileDialog, listAll} from './discaccess'
  import TargetTable from './components/TargetTable.vue'

  export default {
    name: 'lr-translate',
    components: {
      'target-table': TargetTable
    },
    data: function () {
      const item = {
        srcName: 'Tom',
        distName: 'Tom',
        processStatus: 'No. 189, Grove St, Los Angeles'
      }
      return {
        isCollapse: true,
        labelPosition: 'left',
        tableData: Array(10).fill(item),
        formInline: {
          source: '',
          dist: ''
        }
      }
    },
    methods: {
      srcClick () {
        const folder = fileDialog({
          properties: ['openDirectory'],
          defaultPath: __dirname
        })
        if (folder) {
          this.formInline.source = folder
          listAll(folder, true, '.md')
        }
        this.$refs.execBtn.$el.focus()
      },
      distClick () {
        const folder = fileDialog({
          properties: ['openDirectory'],
          defaultPath: __dirname
        })
        if (folder) {
          this.formInline.dist = folder
        }
        this.$refs.execBtn.$el.focus()
      },
      onSubmit () {
      }
    }
  }
</script>