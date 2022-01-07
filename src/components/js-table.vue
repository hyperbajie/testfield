<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    tableHeader: {
      type: Array,
      required: true,
    },
  },
  render: function (h) {
    return (
      <el-table data={this.tableData}>
        {this.tableHeader.map(function (item) {
          return <el-table-column prop={item.prop} label={item.label} />;
        })}
      </el-table>
    );
  },
};
</script>
