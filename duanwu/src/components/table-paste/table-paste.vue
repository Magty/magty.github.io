<template>
  <div class="ivu-table-paste">
    <div v-if="!hideTable && value" class="ivu-table-paste-input">
      <i-input v-model="content" @on-change="handleContentChange" type="textarea"></i-input>
    </div>
    <Row v-else :gutter="32">
      <i-Col :span="12">
        <i-input v-model="content" type="textarea" @on-change="handleContentChange"></i-input>
      </i-Col>
      <i-Col :span="12">
        <i-table :columns="tableColumns" :data="tableData"></i-table>
      </i-Col>
    </Row>
  </div>
</template>

<script>
import deepCopy from 'deepcopy'
export default {
  name: 'TablePaste',
  props: {
    value: {
      type: String
    },
    inputProps: {
      type: Object,
      default: function() {
        return {}
      }
    },
    tableProps: {
      type: Object,
      default: function() {
        return {}
      }
    },
    hideTable: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      content: '',
      tableColumns: [],
      tableData: []
    }
  },
  watch: {
    value: {
      handler: function(e) {
        this.handleResolveContent(e)
      },
      immediate: true
    }
  },
  methods: {
    handleContentChange: function(content) {
      const targetValue = content.target.value.trim()
      this.$emit('on-change', targetValue)
      this.handleResolveContent(targetValue)
    },
    handleResolveContent: function(content) {
      let contentArray = []
      if (content && content !== '') {
        contentArray = content
          .split(/[\n\u0085\u2028\u2029]|\r\n?/g)
          .map(item => {
            item.split('\t')
          })
        const index = this.handleGetErrorIndex(contentArray)
        const contentTable = this.contentToTable(contentArray)
        this.tableColumns = contentTable.columns
        this.tableData = contentTable.data
        if (index.length > 0) {
          this.$emit('on-error', contentTable, index)
        } else {
          this.$emit('on-success', contentTable)
        }
      }
    },
    handleGetErrorIndex: function(table) {
      const copyTable = deepCopy(table)
      const errorIndexArray = []
      if (copyTable.length) {
        var length = copyTable[0].length
        copyTable.forEach((item, index) => {
          if (item.length !== length) {
            errorIndexArray.push(index)
          }
        })
      }
      return errorIndexArray
    },
    contentToTable: function(content) {
      const copyContent = deepCopy(content)
      let columns = []
      let data = []
      if (copyContent.length > 1) {
        columns = copyContent.shift().map((item, index) => {
          return {
            title: item,
            key: 'key' + String(index)
          }
        })
      }
      data = copyContent.map(item => {
        item.forEach((item, index) => {
          item['key' + String(index)] = item
        })
      })
      return {
        columns,
        data
      }
    }
  }
}
</script>

<style></style>
