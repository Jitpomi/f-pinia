<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <div class="row justify-between q-pa-md q-ma-md" >
        <q-item-label
          header
          class="col-8 text-primary text-h5  text-bold"
        >
          Essential Links
        </q-item-label>
        <div v-if="leftDrawerOpen && screen.lt.md">
          <q-btn color="primary" @click="leftDrawerOpen = false" outline round icon="fas fa-arrow-alt-circle-left"/>
        </div>
      </div>
      <q-list class="q-ma-md">
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item>
          <q-item-section avatar>
            <q-avatar rounded color="purple" text-color="white" icon="fas fa-user" />
          </q-item-section>
          <q-item-section>
            <q-btn label="logout" color="primary" outline @click="logout"/>
          </q-item-section>

        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import EssentialLink from 'components/EssentialLink.vue';
  import {useQuasar} from 'quasar';
  import {useAuth} from 'stores/auth';
  // import {useRouter} from 'vue-router/dist/vue-router';


  const linksList = [
    {
      title: 'Docs',
      caption: 'quasar.dev',
      icon: 'school',
      link: 'https://quasar.dev'
    },
    {
      title: 'Github',
      caption: 'github.com/quasarframework',
      icon: 'code',
      link: 'https://github.com/quasarframework'
    },
    {
      title: 'Discord Chat Channel',
      caption: 'chat.quasar.dev',
      icon: 'chat',
      link: 'https://chat.quasar.dev'
    },
    {
      title: 'Forum',
      caption: 'forum.quasar.dev',
      icon: 'record_voice_over',
      link: 'https://forum.quasar.dev'
    },
    {
      title: 'Twitter',
      caption: '@quasarframework',
      icon: 'rss_feed',
      link: 'https://twitter.quasar.dev'
    },
    {
      title: 'Facebook',
      caption: '@QuasarFramework',
      icon: 'public',
      link: 'https://facebook.quasar.dev'
    },
    {
      title: 'Quasar Awesome',
      caption: 'Community Quasar projects',
      icon: 'favorite',
      link: 'https://awesome.quasar.dev'
    }
  ];

  export default defineComponent({
    name: 'MainLayout',

    components: {
      EssentialLink
    },

    setup () {
      const leftDrawerOpen = ref(false);
      const {screen,} = useQuasar();
      // const router = useRouter();
      return {
        screen,
        essentialLinks: linksList,
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value;
        },
        async logout(){
          try {
            localStorage.removeItem('feathers-jwt');
            const authStore = useAuth();
            await authStore.authenticate();
            location.reload();
          }catch (e) {
            console.log(e);
          }
        }
      };
    }
  });
</script>
