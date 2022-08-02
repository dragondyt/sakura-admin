<template>
  <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      :rules="rules"
      :size="size"
  >
    <n-form-item label="邮箱" path="email">
      <n-input v-model:value="formValue.email" placeholder="输入姓名"/>
    </n-form-item>
    <n-form-item label="密码" path="password">
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
import {reactive, ref} from 'vue'
import {useMessage} from 'naive-ui'
import {useUserStore} from "@/store/modules/user";
import {ResultEnum} from "@/enums/httpEnum";
import {useRoute, useRouter} from "vue-router";
import {PageEnum} from "@/enums/pageEnum";

const formRef = ref();
const size = ref<'small' | 'medium' | 'large'>('medium')
const rules = {
  username: {required: true, message: '请输入用户名', trigger: 'blur'},
  password: {required: true, message: '请输入密码', trigger: 'blur'},
};
const formValue = reactive({
  email: '',
  password: '',
  isCaptcha: true,
})
const loading = ref(false);
const message = useMessage();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

function handleLoginClick(e: KeyboardEvent): void {
  e.preventDefault();
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      message.loading('登录中...');
      loading.value = true;
      try {
        const {errno, errmsg} = await userStore.login(formValue);
        message.destroyAll();
        if (errno == ResultEnum.SUCCESS) {
          const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
          message.success('登录成功，即将进入系统');
          if (route.name === LOGIN_NAME) {
            await router.replace('/');
          } else await router.replace(toPath);
        } else {
          message.info(errmsg || '登录失败');
        }
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