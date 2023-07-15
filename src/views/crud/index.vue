<template>
  <CommonPage>
    <template #action>
      <div>
        <v-btn prepend-icon="mdi-download" @click="$table?.handleExport()">导出</v-btn>
        <v-btn ml-2 prepend-icon="mdi-plus" @click="handleAdd">新建文章</v-btn>
      </div>
    </template>
    <CrudTable ref="$table" v-model:query-items="queryItems" :extra-params="extraParams" :columns="columns"
      :get-data="api.getPosts" @on-checked="onChecked" @on-data-change="(data) => (tableData = data)">
      <template #queryBar>
        <QueryBarItem label="标题" :label-width="50">
          <v-text-field density="compact" label="标题" placeholder="请输入标题" variant="outlined"></v-text-field>
        </QueryBarItem>
      </template>

      <template v-slot:actions="{ row }">
        <v-btn mr-1 density="compact" icon="mdi-pencil"></v-btn>
        <v-btn density="compact" icon="mdi-delete"></v-btn>
      </template>
    </CrudTable>

    <CrudModal v-model:visible="modalVisible" :title="modalTitle" :loading="modalLoading"
      :show-footer="modalAction !== 'view'" @on-save="handleSave">
      <v-form ref="modalFormRef" :disabled="modalAction === 'view'">
        <v-text-field style="margin-bottom: 10px;" variant="outlined" v-model="modalForm.author" disabled></v-text-field>
        <v-text-field style="margin-bottom: 10px;" :rules="[v => !!v || '文章标题不可为空']" label="文章标题" required
          variant="outlined" v-model="modalForm.title"></v-text-field>
        <v-textarea label="文章内容" required :rules="[v => !!v || '文章内容不可为空']" v-model="modalForm.content"
          variant="outlined"></v-textarea>
      </v-form>
    </CrudModal>
  </CommonPage>
</template>

<script setup>
import QueryBarItem from '@/components/query_bar/QueryBarItem.vue';
import { useCRUD } from '@/composables';
import { formatDateTime, isNullOrUndef } from '@/utils';
import { VBtn } from 'vuetify/components/VBtn';
import CommonPage from '../../components/page/CommonPage.vue';
import CrudModal from '../../components/table/CrudModal.vue';
import CrudTable from '../../components/table/CrudTable.vue';
import api from './api';

defineOptions({ name: 'Crud' })

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
/** QueryBar筛选参数（可选） */
const queryItems = ref({})
/** 补充参数（可选） */
const extraParams = ref({})

const columns = [
  {
    title: '标题',
    align: 'start',
    sortable: false,
    key: 'title',
  },
  { title: '分类', key: 'category', align: 'end' },
  { title: '创建人', key: 'author', align: 'end' },
  {
    title: '创建时间', key: 'createDate', align: 'end', render(row) {
      return [h('span', formatDateTime(row['createDate']))]
    },
  },
  {
    title: '最后更新时间', key: 'updateDate', align: 'end', render(row) {
      return [h('span', formatDateTime(row['createDate']))]
    },
  },
  {
    title: '操作', key: 'actions', align: 'end', width: 150, render(row) {
      return [
        h(VBtn, {
          density: "compact",
          icon: "mdi-eye",
          style: "margin-right:4px",
          onClick: () => handleView(row),
        }),
        h(VBtn, {
          density: "compact",
          icon: "mdi-pencil",
          style: "margin-right:4px",
          onClick: () => handleEdit(row),
        }), h(VBtn, {
          density: "compact",
          icon: "mdi-delete",
          onClick: () => handleDelete(row.id),
        })
      ]
    }
  },
]

onActivated(() => {
  $table.value?.handleSearch()
})

// 选中事件
function onChecked(rowKeys) {
  if (rowKeys.length) $message.info(`选中${rowKeys.join(' ')}`)
}

// 发布
function handlePublish(row) {
  if (isNullOrUndef(row.id)) return

  row.publishing = true
  setTimeout(() => {
    row.isPublish = !row.isPublish
    row.publishing = false
    $message?.success(row.isPublish ? '已发布' : '已取消发布')
  }, 1000)
}

const {
  modalVisible,
  modalAction,
  modalTitle,
  modalLoading,
  handleAdd,
  handleDelete,
  handleEdit,
  handleView,
  handleSave,
  modalForm,
  modalFormRef,
} = useCRUD({
  name: '文章',
  initForm: { author: '大脸怪' },
  doCreate: api.addPost,
  doDelete: api.deletePost,
  doUpdate: api.updatePost,
  refresh: () => $table.value?.handleSearch(),
})
</script>

