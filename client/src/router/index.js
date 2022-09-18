import {route} from 'quasar/wrappers';
import {createRouter, createMemoryHistory, createWebHistory, createWebHashHistory} from 'vue-router';

import routes from './routes';
import staticRoutes from './staticRoutes';
import {useAuth} from 'stores/auth';
// import {hooks} from 'vue-fingerprint/src/pinia-router';

// import useFingerprintAuthStore from 'stores/fingeprintAuth';
// import {api} from 'src/api/feathers';
// import feathers from '@feathersjs/feathers';


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(async function (/* { store, ssrContext } */) {



  let authStore = useAuth();

  // const fingerprintAuthStore = (await useFingerprintAuthStore())();
// able to get fingerprint oauth running
//   console.log('papa: ',fingerprintAuthStore.authenticate());
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({left: 0, top: 0}),
    routes:[...routes, ...staticRoutes ],

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });


  Router.beforeEach(async (to, /*from*/) => {

    const staticRoutesChildren = [];
    staticRoutes.forEach(route => {
      // console.log({route: route.children});
      if(route.children){
        staticRoutesChildren.push(...route.children);
      }

    });
    // ...
    // explicitly return false to cancel the navigation
    // return false;
    if (
      // make sure the user is authenticated
      !authStore.isAuthenticated &&
      // ❗️ Avoid an infinite redirect
      !staticRoutesChildren.some(route => route.name === to.name)
    ) {

     try {
       const authStore = useAuth();
       const res = await authStore.authenticate();
       console.log(res);
     }catch (e) {
       //
       return {name: 'Login'};
     }
      // redirect the user to the login page

    }
  });

  return Router;
});
