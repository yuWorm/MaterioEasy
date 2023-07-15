<template>
  <template v-for="menu in menuOptions">
    <template v-if="menu.children">
      <VerticalNavSectionTitle :item="{
        heading: menu.label,
      }" />
      <VerticalNavLink v-for="children in menu.children" :item="{
        title: children.label,
        icon: children.icon,
        ...parseExternalUrl(children.path)
      }" />
    </template>
    <VerticalNavLink v-else :item="{
      title: menu.label,
      icon: menu.icon,
      to: menu.path,
    }" />
  </template>
</template>

<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue';
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';

import { useAppStore, usePermissionStore } from '@/store';
import { isExternal } from '@/utils';
import { onMounted } from 'vue';

const router = useRouter()
const curRoute = useRoute()
const permissionStore = usePermissionStore()
const appStore = useAppStore()

const activeKey = computed(() => curRoute.meta?.activeMenu || curRoute.name)

const menuOptions = computed(() => {
  return permissionStore.menus.map((item) => getMenuItem(item)).sort((a, b) => a.order - b.order)
})

const menu = ref(null)
watch(curRoute, async () => {
  await nextTick()
  menu.value?.showOption()
})

function resolvePath(basePath, path) {
  if (isExternal(path)) return path
  return (
    '/' +
    [basePath, path]
      .filter((path) => !!path && path !== '/')
      .map((path) => path.replace(/(^\/)|(\/$)/g, ''))
      .join('/')
  )
}

function getMenuItem(route, basePath = '') {
  let menuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,
    path: resolvePath(basePath, route.path),
    icon: route.meta?.icon,
    order: route.meta?.order || 0,
  }

  const visibleChildren = route.children
    ? route.children.filter((item) => item.name && !item.isHidden)
    : []

  if (!visibleChildren.length) return menuItem

  if (visibleChildren.length === 1) {
    // 单个子路由处理
    const singleRoute = visibleChildren[0]
    menuItem = {
      ...menuItem,
      label: singleRoute.meta?.title || singleRoute.name,
      key: singleRoute.name,
      path: resolvePath(menuItem.path, singleRoute.path),
      icon: singleRoute.meta?.icon,
    }
    const visibleItems = singleRoute.children
      ? singleRoute.children.filter((item) => item.name && !item.isHidden)
      : []

    if (visibleItems.length === 1) {
      menuItem = getMenuItem(visibleItems[0], menuItem.path)
    } else if (visibleItems.length > 1) {
      menuItem.children = visibleItems
        .map((item) => getMenuItem(item, menuItem.path))
        .sort((a, b) => a.order - b.order)
    }
  } else {
    menuItem.children = visibleChildren
      .map((item) => getMenuItem(item, menuItem.path))
      .sort((a, b) => a.order - b.order)
  }
  return menuItem
}

// function getIcon(meta) {
//   if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 18 })
//   if (meta?.icon) return renderIcon(meta.icon, { size: 18 })
//   return null
// }

function parseExternalUrl(path) {
  if (isExternal(path)) {
    return {
      href: path
    }
  } else {
    return {
      to: path
    }
  }
}

function handleMenuSelect(key, item) {
  if (isExternal(item.path)) {
    window.open(item.path)
  } else {
    if (item.path === curRoute.path) {
      appStore.reloadPage()
    } else {
      router.push(item.path)
    }
  }
}

onMounted(() => {
  console.log(menuOptions.value)
})
</script>
