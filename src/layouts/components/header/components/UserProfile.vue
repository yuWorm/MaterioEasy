<script setup>
import { useUserStore } from '@/store';

const userStore = useUserStore()

const options = [
  {
    label: 'Profile',
    key: 'profile',
    icon: 'mdi-account-outline'
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: 'mdi-cog-outline'
  },
  {
    label: 'Pricing',
    key: 'pricing',
    icon: 'mdi-currency-usd'
  },
  {
    label: 'FAQ',
    key: 'FAQ',
    icon: 'mdi-help-circle-outline'
  }
]

function handleClick(key) {
  console.log("click");
  if (key === 'logout') {
    userStore.logout()
    $message.success('已退出登录')
  }
}
</script>

<template>
  <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success" bordered>
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="userStore.avatar" />

      <!-- SECTION Menu -->
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="userStore.avatar" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ userStore.name }}
            </VListItemTitle>
            <VListItemSubtitle>{{ userStore.role[0] }}</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link v-for="item in options" @click="handleClick(item.key)">
            <template #prepend v-if="item.icon">
              <VIcon class="me-2" :icon="item.icon" size="22" />
            </template>

            <VListItemTitle>{{ item.label }}</VListItemTitle>
          </VListItem>



          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="handleClick('logout')">
            <template #prepend>
              <VIcon class="me-2" icon="mdi-logout" size="22" />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
