<template>
  <div class="column justify-center items-center q-pa-md full-width bg-grey-1" style="min-height: 85vh">
    <auth-form title="Login" @submit="onSubmit" ref="form">
      <template #btn-text>
        Sign in
      </template>
      <template #terms>
       <p class="text-center text-caption text-primary"> No account yet? <q-btn flat @click="router.push('/register')">REGISTER</q-btn></p>
      </template>
    </auth-form>
  </div>
</template>


<script setup>
  import {useQuasar} from 'quasar';
  import AuthForm from 'components/AuthForm';
  import {ref} from 'vue';
  import {useRouter} from 'vue-router';
  import {useAuth} from 'stores/auth';

  const $q = useQuasar();

  const form = ref(null);
  const router = useRouter();


  async function onSubmit({email, password}) {
    try {
      const authStore = useAuth();
      const res = await authStore.authenticate({
        strategy: 'local',
        email,
        password,
      });
      console.log({
        res,
      });
      form.value.onReset();
      await router.push('/admin');
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Submitted',
      });


    } catch (e) {
      console.log({e});
      form.value.onReset();
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'You need to accept the license and terms first',
      });
    }

  }


</script>

<style scoped>

</style>
