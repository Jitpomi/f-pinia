<template>
  <div class="column justify-center items-center q-pa-md full-width bg-grey-1" style="min-height: 85vh">

    <auth-form title="Register" @submit="onSubmit" ref="form">
      <template #btn-text>
        Sign up
      </template>
    </auth-form>

  </div>
</template>


<script setup>
  // import {useQuasar} from 'quasar';
  import AuthForm from 'components/AuthForm';
  import {ref} from 'vue';

  import { useRouter } from 'vue-router';
  import {models} from 'feathers-pinia';



  // const $q = useQuasar();

  const form = ref(new models.api.Users());
  const router = useRouter();


  async function onSubmit({accept, email, password}) {
    try {
      if (accept !== true) {
        // $q.notify({
        //   color: 'red-5',
        //   textColor: 'white',
        //   icon: 'warning',
        //   message: 'You need to accept the license and terms first',
        // });{
      } else {

        console.log({email, password});
        const res = await form.value.create();
        console.log({
          res,
        });
        form.value.onReset();
        await router.push('/login');
        // $q.notify({
        //   color: 'green-4',
        //   textColor: 'white',
        //   icon: 'cloud_done',
        //   message: 'Submitted',
        // });

      }
    } catch (e) {
      console.log({e});
      form.value.onReset();
      // $q.notify({
      //   color: 'red-5',
      //   textColor: 'white',
      //   icon: 'warning',
      //   message: 'You need to accept the license and terms first',
      // });
    }

  }


</script>

<style scoped>

</style>
