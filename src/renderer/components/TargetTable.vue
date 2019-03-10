<template>
	<el-table :data="tableData">
		<el-table-column prop="processStatus" label="Status">
			<i class="el-icon-circle-check-outline"></i>
		</el-table-column>
		<el-table-column prop="srcName" label="Source" width="120">
		</el-table-column>
		<el-table-column prop="distName" label="Translated File" width="120">
		</el-table-column>
	</el-table>
</template>

<style lang="scss">
	@import '../assets/css/custom.scss';
</style>

<script>
export default {
  name: 'target-table',
  data: function () {
    const item = {
      srcName: 'Tom',
      distName: 'Tom',
      processStatus: 'No. 189, Grove St, Los Angeles'
    }
    return {
      labelPosition: 'left',
      isCollapse: true,
      tableData: Array(20).fill(item),
      formInline: {
        source: '',
        dist: ''
      }
    }
  }
}
</script>