<template>
  <div id="vditor" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const vditor = ref<Vditor | null>(null);

onMounted(() => {
  vditor.value = new Vditor('vditor', {
    after: () => {
      vditor.value!.setValue('');
    },
  });
});
</script>

<style scoped>

</style>