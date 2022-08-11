<template>
  <div id="vditor" />
</template>

<script setup lang="ts">
import {ref, onMounted, computed, watch, onUnmounted} from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import useLocale from "@/hooks/locale";
import {useAppStore} from "@/store";
import useThemes from "@/hooks/themes";
import {Notification} from "@arco-design/web-vue";
import saveArticle from "@/api/article";

const vditor = ref<Vditor | null>(null);
const appStore = useAppStore();
const {isDark} = useThemes();
function save (e: any) {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    const mdText = vditor.value!.getValue();
    // 执行save方法
    if (mdText!==''){
      saveArticle({
        content: mdText
      }).then(()=>{
        Notification.info({
          id: 'menuNotice', // Keep the instance id the same
          content: '成功',
          closable: true,
        });
      })
    }
    // 阻止默认事件

    e.preventDefault()

  }
}
onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: '100%',
    width: '100%',
    theme: isDark ? "dark" : "classic",
    after: () => {
      vditor.value!.setValue('');
    },
  });
  document.addEventListener("keydown",save,false);
  watch(
      () => appStore.theme,
      (theme) => {
        vditor.value!.setTheme(theme === "dark" ? "dark" : "classic")
      }
  );
});
onUnmounted(()=>{
  document.removeEventListener("keydown",save,false);
})

</script>

<style></style>
