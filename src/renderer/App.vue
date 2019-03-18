<template>
  <div id="app">
    <el-container>
      <el-menu default-active="1" :collapse="isCollapse" router>
        <el-menu-item index="/">
          <i class="el-icon-menu" ></i>
        </el-menu-item>
        <el-menu-item index="/Config" to="/Config">
          <i class="el-icon-setting"></i>
        </el-menu-item>
      </el-menu>

      <!-- Target list -->
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    </el-container>
  </div>
</template>

<style lang="scss">
@import '@/assets/css/custom.scss';

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
  import Home from './components/Home.vue'

  export default {
    name: 'lr-translate',
    components: {
      'home': Home
    },
    data: function () {
      return {
        isCollapse: true,
        labelPosition: 'left'
      }
    }
  }
</script>