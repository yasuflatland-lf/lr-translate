<template>
  <div id="app">
    <el-container>
      <el-menu default-active="1" :collapse="isCollapse">
        <el-menu-item index="1">
          <i class="el-icon-menu" ></i>
        </el-menu-item>
      </el-menu>

      <el-main>
        <el-form :model="formInline" >
          <el-row>
            <el-form-item >
              <el-col :span="2" >
                <el-button type="default" icon="el-icon-document" ref="execBtn" @click="srcClick" ></el-button>
              </el-col>
              <el-col :span="21" >
                <el-input v-model="formInline.source" placeholder="Source Folder" ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="2" >
                <el-button type="default" icon="el-icon-document" ref="execBtn" @click="distClick" ></el-button>
              </el-col>
              <el-col :span="21" >
                <el-input v-model="formInline.dist" placeholder="Translated Folder" ></el-input>
              </el-col>
            </el-form-item>
            <el-button-group >
              <el-col :span="2" >
                <el-button type="danger" icon="el-icon-caret-right" ref="execBtn" @keydown="onSubmit" ></el-button>
              </el-col>
            </el-button-group>
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
        tableData: Array(1).fill(item),
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