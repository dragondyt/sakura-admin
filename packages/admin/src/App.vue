<script setup lang="ts">
import Application from "@/components/application/Application.vue";
</script>

<template>
  <n-config-provider>
    <application>
      <RouterView/>
    </application>
  </n-config-provider>
</template>
