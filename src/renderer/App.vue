<template>
  <div id="app">
    <el-container>
      <el-menu default-active="1" :collapse="isCollapse">
        <el-menu-item index="1">
          <i class="el-icon-menu" ></i>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-setting"></i>
        </el-menu-item>
      </el-menu>

      <el-main>
        <el-form :model="formInline">
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
          <el-row class="error" v-if="this.errors.length">
            <el-alert title="Error" type="error" :closable="false" show-icon>
              <ul>
                <li v-for="error in this.errors">{{ error }}</li>
              </ul>
            </el-alert>
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
  display: flex;
  min-width: 900px;
  min-height: 500px;
  flex-direction: column;
  height: 100vh;
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
  import TargetTable from './components/TargetTable.vue'
  const lrfs = require('./libs/lr-fs')
  const lrutil = require('./libs/lr-util')
  const fs = require('fs-extra')

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
      openFolder (orgFolder) {
        let opendir = (orgFolder) || __dirname

        return lrfs.fileDialog({
          properties: ['openDirectory'],
          defaultPath: opendir
        })
      },
      srcClick () {
        const folder = this.openFolder(this.formInline.sourceDir)

        if (folder) {
          this.formInline.sourceDir = folder
        }
      },
      distClick () {
        const folder = this.openFolder(this.formInline.distDir)

        if (folder) {
          this.formInline.distDir = folder
        }
      },
      validation () {
        this.errors = []

        if (!this.formInline.sourceDir) {
          this.errors.push('Source path is required.')
        }

        if (!this.formInline.distDir) {
          this.errors.push('Distination directory path is required.')
        }

        return (!this.errors.length)
      },
      copyFiles (pathList) {
        pathList.forEach((pathInfo, index) => {
          fs.copySync(pathInfo.srcName, pathInfo.distName)
        })
      },
      execTranslation () {
        if (!this.validation()) {
          return
        }

        const pathList = lrfs.getPathList(
          this.formInline.sourceDir,
          this.formInline.distDir,
          '.md'
        )

        this.copyFiles(pathList)

        this.tableData = pathList

        this.tableData.forEach((val, index) => {
          this.$set(this.tableData, index, {
            processStatus: 1,
            srcName: val.srcName,
            distName: val.distName
          })

          try {
            const contents = fs.readFileSync(val.distName, 'utf8')
            const translatedData = lrutil.translate(contents, 'en', 'ja')

            translatedData.then((data) => {
              if (data.hasOwnProperty(data.err)) {
                this.$set(this.tableData, index, {
                  processStatus: -1,
                  srcName: val.srcName,
                  distName: val.distName
                })

                return
              }

              fs.writeFileSync(val.distName, data.translated, {encoding: 'utf8'})

              this.$set(this.tableData, index, {
                processStatus: 2,
                srcName: val.srcName,
                distName: val.distName
              })
            })
          } catch (err) {
            console.error(err)
          }
        })
      }
    }
  }
</script>