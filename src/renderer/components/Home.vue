<template>
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
          <el-col :span="10" >
            <el-button type="danger" icon="el-icon-caret-right" ref="execBtn"  @click="execTranslation" >Run</el-button>
          </el-col>
          <el-col :span="5" >
            <el-button type="default" icon="el-icon-caret-right" ref="execBtnTemp"  @click="testExec" >Parse Test</el-button>
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
</template>

<script>
  import TargetTable from './TargetTable.vue'
  const lrfs = require('@/libs/lr-fs')
  const lrutil = require('@/libs/lr-util')
  const lrparsemd = require('@/libs/lr-parse-md')
  const fs = require('fs-extra')

  export default {
    name: 'home',
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
          sourceDir: '/Users/yasuflatland/temp/damascus-document',
          distDir: '/Users/yasuflatland/Downloads/aaaaa'
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
      testExec () {
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
          try {
            const contents = fs.readFileSync(val.distName, 'utf8')
            const translated = lrparsemd.parse(contents, 'en', 'ja', 'html')

            translated.then((data) => {
              console.log(data)
            })
            // fs.writeFileSync(val.distName, translated, {encoding: 'utf8'})
            // this.$set(this.tableData, index, {
            //   processStatus: 2,
            //   srcName: val.srcName,
            //   distName: val.distName
            // })
          } catch (err) {
            console.error(err)
          }
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