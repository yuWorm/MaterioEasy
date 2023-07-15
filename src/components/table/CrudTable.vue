<template>
  <QueryBar v-if="$slots.queryBar" @search="handleSearch" @reset="handleReset">
    <slot name="queryBar" />
  </QueryBar>

  <v-data-table-server v-model="selected" :show-select="props.showSelect" p-4 v-model:items-per-page="pagination.pageSize"
    :headers="props.columns" :items-length="pagination.itemCount" :items="tableData" :loading="loading"
    @update:options="onPageChange">

    <template v-for="c in props.columns" #[`item.${c.key}`]="{ item }">
      <template v-if="c?.render">
        <component v-for="node in c.render(item.raw)" :is="node"></component>
      </template>
      <template v-else>
        {{ item.columns[c.key] }}
      </template>
    </template>
    <template v-if="false" v-slot:item.actions="{ item }">
      <slot name="actions" :row="item.raw" />
    </template>
  </v-data-table-server>
</template>

<script setup>
import { onMounted } from 'vue';
import { utils, writeFile } from 'xlsx';
import QueryBar from '../query_bar/QueryBar.vue';
const props = defineProps({
  /**
   * @remote true: 后端分页  false： 前端分页
   */
  remote: {
    type: Boolean,
    default: true,
  },
  /**
   * @remote 是否分页
   */
  isPagination: {
    type: Boolean,
    default: true,
  },
  scrollX: {
    type: Number,
    default: 1200,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  showSelect: {
    type: Boolean,
    default: true
  },
  showActions: {
    type: Boolean,
    default: true
  },
  columns: {
    type: Array,
    required: true,
  },
  /** queryBar中的参数 */
  queryItems: {
    type: Object,
    default() {
      return {}
    },
  },
  /** 补充参数（可选） */
  extraParams: {
    type: Object,
    default() {
      return {}
    },
  },
  /**
   * ! 约定接口入参出参
   * * 分页模式需约定分页接口入参
   *    @pageSize 分页参数：一页展示多少条，默认10
   *    @pageNo   分页参数：页码，默认1
   * * 需约定接口出参
   *    @pageData 分页模式必须,非分页模式如果没有pageData则取上一层data
   *    @total    分页模式必须，非分页模式如果没有total则取上一层data.length
   */
  getData: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['update:queryItems', 'onChecked', 'onDataChange'])
const selected = ref([])
const loading = ref(false)
const initQuery = { ...props.queryItems }
const tableData = ref([])
const pagination = reactive({ page: 1, pageSize: 10 })

async function handleQuery() {
  try {
    loading.value = true
    let paginationParams = {}
    // 如果非分页模式或者使用前端分页,则无需传分页参数
    if (props.isPagination && props.remote) {
      paginationParams = { pageNo: pagination.page, pageSize: pagination.pageSize }
    }
    const { data } = await props.getData({
      ...props.queryItems,
      ...props.extraParams,
      ...paginationParams,
    })
    console.log("succ")

    tableData.value = data?.pageData || data
    pagination.itemCount = data.total ?? data.length
  } catch (error) {
    tableData.value = []
    pagination.itemCount = 0
    console.log("err")
  } finally {
    console.log(tableData.value)
    emit('onDataChange', tableData.value)
    loading.value = false
  }
}
function handleSearch() {
  pagination.page = 1
  handleQuery()
}
async function handleReset() {
  const queryItems = { ...props.queryItems }
  for (const key in queryItems) {
    queryItems[key] = ''
  }
  emit('update:queryItems', { ...queryItems, ...initQuery })
  await nextTick()
  pagination.page = 1
  handleQuery()
}
function onPageChange(currentPage) {
  console.log(currentPage)
  pagination.page = currentPage.page
  if (props.remote) {
    handleQuery()
  }
}
function onChecked(rowKeys) {
  if (props.columns.some((item) => item.type === 'selection')) {
    emit('onChecked', rowKeys)
  }
}

function getChecked() {
  return selected.value
}

function handleExport(columns = props.columns, data = tableData.value) {
  if (!data?.length) return $message.warning('没有数据')
  const columnsData = columns.filter((item) => !!item.title && !item.hideInExcel)
  const thKeys = columnsData.map((item) => item.key)
  const thData = columnsData.map((item) => item.title)
  const trData = data.map((item) => thKeys.map((key) => item[key]))
  const sheet = utils.aoa_to_sheet([thData, ...trData])
  const workBook = utils.book_new()
  utils.book_append_sheet(workBook, sheet, '数据报表')
  writeFile(workBook, '数据报表.xlsx')
}


onMounted(() => {
  console.log(props.columns)
  console.log(tableData.value)
})

defineExpose({
  handleSearch,
  handleReset,
  handleExport,
  getChecked
})
</script>

