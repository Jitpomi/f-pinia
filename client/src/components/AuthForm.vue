<template>
  <q-form
    @submit="submitForm"
    @reset="onReset"
    class="q-gutter-md"
  >
    <p class="text-h4 text-center text-primary">{{ props.title }}</p>
    <q-input
      filled
      no-error-icon
      v-model="auth.email"
      type="email"
      label="Email *"
      hint="Name and surname"
      lazy-rules
      :rules="[ 'email']"
    />

    <q-input
      filled
      no-error-icon
      :type="see? 'text':'password'"
      v-model="auth.password"
      label="Password *"
      lazy-rules
      :rules="[
          val => val !== null && val !== '' || 'Please type your email',
          val => val.length > 5 && val.length < 100 || 'Password should be at least 5 characters'
        ]"
    >
      <template v-slot:append>
        <q-btn :icon="!see ? 'fas fa-eye': 'fas fa-eye-slash'" flat rounded @click="see = !see"/>
      </template>
    </q-input>
    <slot name="terms">
      <q-toggle v-model="auth.accept" label="I accept the license and terms"/>
    </slot>


    <div class="row justify-between">
      <q-btn label="Reset" type="reset" color="primary" outline class="q-ml-sm"/>
      <q-btn :disable="submitting" :loading="submitting" type="submit" color="primary">
        <slot name="btn-text">
          Submit
        </slot>
      </q-btn>
    </div>
  </q-form>
</template>

<script setup>
  import {defineProps, reactive, ref, defineExpose} from 'vue';

  const props = defineProps({
    title: {type: String, required: true},
  });

  const auth = reactive({
    email: '',
    password: '',
    accept: false,
  });

  const see = ref(false);
  const submitting = ref(false);

  function onReset() {
    auth.email = null;
    auth.password = null;
    auth.accept = false;
    submitting.value = false;
  }

  defineExpose({onReset});

  const emit = defineEmits({
    submit: (payload) => {
      if (payload.email && payload.password) {
        return true;
      } else {
        console.warn('Invalid submit event payload!');
        return false;
      }
    },
  });

  function submitForm(e) {
    e.preventDefault();
    submitting.value = true;
    emit('submit', auth);
  }
</script>

<style scoped>

</style>
