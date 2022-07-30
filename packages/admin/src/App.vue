<script setup lang="ts">
import { onMounted } from "vue";

onMounted(()=>{
  console.log("挂载成功")
})
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
