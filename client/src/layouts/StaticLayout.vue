Layout Builder
Visible Header
Visible Footer
Visible left-side Drawer
Visible right-side Drawer
Inject Drawer content for scrolling
<template>
  <q-layout view="hhh LpR fff">

    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
