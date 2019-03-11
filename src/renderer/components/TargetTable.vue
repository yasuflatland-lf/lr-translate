<template>
	<el-table :data="this.items">
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