<template>
  <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      :rules="rules"
      :size="size"
  >
    <n-form-item label="姓名" path="username">
      <n-input v-model:value="formValue.username" placeholder="输入姓名"/>
    </n-form-item>
    <n-form-item label="年龄" path="password">
      <n-input v-model:value="formValue.password" placeholder="输入年龄"/>
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleLoginClick" :loading="loading" :block="true">
        登录
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import {ref, reactive} from 'vue'
import {useMessage} from 'naive-ui'
import {useUserStore} from "@/store/modules/user";

const formRef = ref();
const size = ref<'small' | 'medium' | 'large'>('medium')
const rules = {
  username: {required: true, message: '请输入用户名', trigger: 'blur'},
  password: {required: true, message: '请输入密码', trigger: 'blur'},
};
const formValue = reactive({
  username: '',
  password: '',
  isCaptcha: true,
})
const loading = ref(false);
const message = useMessage();
const userStore = useUserStore();

function handleLoginClick(e: KeyboardEvent): void {
  e.preventDefault();
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      const {username, password} = formValue;
      message.loading('登录中...');
      loading.value = true;
      try {
        const {code, message: msg} = await userStore.login({username, password});
        console.log(message)
        message.destroyAll();
      } catch (e) {

      } finally {
        loading.value = false
      }
    } else {
      message.error('请填写完整信息，并且进行验证码校验');
    }
  })
}
</script>

<style scoped>

</style>