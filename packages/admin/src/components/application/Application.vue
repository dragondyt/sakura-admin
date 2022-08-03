<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <dialog-content/>
      <n-notification-provider>
        <n-message-provider>
          <message-content/>
          <slot name="default"></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>
<script lang="ts" setup>
import DialogContent from "@/components/application/components/DialogContent.vue";
import MessageContent from "@/components/application/components/MessageContent.vue";
</script>