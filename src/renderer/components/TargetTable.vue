<template>
	<el-table :data="this.items">
		<el-table-column prop="processStatus" label="Status" width="60">
      <template slot-scope="scope">
  			<i v-if="scope.row.processStatus === -1" class="el-icon-error" ></i>
  			<i v-if="scope.row.processStatus === 0" class="el-icon-circle-check-outline" ></i>
  			<i v-if="scope.row.processStatus === 1" class="el-icon-loading" ></i>
  			<i v-if="scope.row.processStatus === 2" class="el-icon-success" ></i>
      </template>
		</el-table-column>
		<el-table-column prop="srcName" label="Source" >
		</el-table-column>
		<el-table-column prop="distName" label="Translated File" >
		</el-table-column>
	</el-table>
</template>

<style lang="scss">
	@import '../assets/css/custom.scss';
</style>

<script>
export default {
  name: 'target-table',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      labelPosition: 'left',
      isCollapse: true
    }
  }
}
</script>