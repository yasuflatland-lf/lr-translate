<template>
  <div id="app">
    <el-container>
      <el-menu default-active="1" :collapse="isCollapse">
        <el-menu-item index="1">
          <i class="el-icon-menu" ></i>
        </el-menu-item>
      </el-menu>

      <el-main>
        <el-form :model="formInline">
          <el-row class="error" v-if="this.errors.length">
            <el-alert title="Error" type="error" show-icon>
              <ul>
                <li v-for="error in this.errors">{{ error }}</li>
              </ul>
            </el-alert>
          </el-row>
          <el-row class="main">
            <el-form-item >
              <el-col :span="2" >
                <el-button class="btn-folder" type="default" icon="el-icon-document" ref="execBtn" @click="srcClick" ></el-button>
              </el-col>
              <el-col :span="22" >
                <el-input v-model="formInline.sourceDir" placeholder="Source Folder" ></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="2" >
                <el-button class="btn-folder" type="default" icon="el-icon-document" ref="execBtn" @click="distClick" ></el-button>
              </el-col>
              <el-col :span="22" >
                <el-input v-model="formInline.distDir" placeholder="Translated Folder" ></el-input>
              </el-col>
            </el-form-item>
            <el-button-group >
              <el-col :span="2" >
                <el-button type="danger" icon="el-icon-caret-right" ref="execBtn"  @click="execTranslation" ></el-button>
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

#app {
  min-width: 900px;
  min-height: 500px;
}
/* Main continer */
.el-main {
  .el-form {
    .el-row {
        &.main {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: solid 1px #ddd;
        }
        &.error {
          margin-bottom: 12px;
          padding-bottom: 12px;
        }
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
  import {
    fileDialog,
    listAll} from './libs/lr-fs'
  import {
    fileList} from './libs/lr-util'
  import TargetTable from './components/TargetTable.vue'

  export default {
    name: 'lr-translate',
    components: {
      'target-table': TargetTable
    },
    data: function () {
      return {
        isCollapse: true,
        labelPosition: 'left',
        tableData: [],
        errors: [],
        formInline: {
          sourceDir: null,
          distDir: null
        }
      }
    },
    methods: {
      srcClick () {
        let opendir = (this.formInline.sourceDir) ? (this.formInline.sourceDir) : __dirname

        const folder = fileDialog({
          properties: ['openDirectory'],
          defaultPath: opendir
        })
        if (folder) {
          this.formInline.sourceDir = folder
        }
      },
      distClick () {
        let opendir = (this.formInline.distDir) ? (this.formInline.distDir) : __dirname

        const folder = fileDialog({
          properties: ['openDirectory'],
          defaultPath: opendir
        })
        if (folder) {
          this.formInline.distDir = folder
        }
      },
      execTranslation () {
        this.errors = []

        if (!this.formInline.sourceDir) {
          this.errors.push('Source path is required.')
        }

        if (!this.formInline.distDir) {
          this.errors.push('Distination directory path is required.')
        }

        if (this.errors.length) {
          return
        }

        const orgList = listAll(this.formInline.sourceDir, true, '.md')
        this.tableData = fileList(orgList, this.formInline.distDir)
      }
    }
  }
</script>