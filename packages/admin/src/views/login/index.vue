<template>
  <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="formValue"
      :rules="rules"
      :size="size"
  >
    <n-form-item label="姓名" path="user.name">
      <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
    </n-form-item>
    <n-form-item label="年龄" path="user.age">
      <n-input v-model:value="formValue.user.age" placeholder="输入年龄" />
    </n-form-item>
    <n-form-item label="电话号码" path="phone">
      <n-input v-model:value="formValue.phone" placeholder="电话号码" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        验证
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { ref,reactive } from 'vue'
const formRef = ref();
const size = ref<'small' | 'medium' | 'large'>('medium')
const formInline = reactive({
  username: 'admin',
  password: '123456',
  isCaptcha: true,
});

const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
};
const formValue =  ref({
  user: {
    name: '',
    age: ''
  },
  phone: ''
})
function handleValidateClick(){

}
</script>

<style scoped>

</style>