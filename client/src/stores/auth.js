// import {defineAuthStore} from 'feathers-pinia';
// import {api as feathersClient} from '~/feathers';
//
// export const useAuth = defineAuthStore({
//   feathersClient,
// });

import {defineAuthStore} from 'feathers-pinia';
import {api as feathersClient} from 'src/api/feathers';
// import {Users} from 'stores/services/users';

export const useAuth = defineAuthStore({
  feathersClient,
  // state: () => ({
  //   _userId: null,
  // }),
  // getters: {
  //   user() {
  //     // localStorage.getItem('feathers-jwt');
  //     return this._userId ? Users.getFromStore(this._userId) : null;
  //   },
  // },
  // actions: {
  //   handleResponse(response) {
  //     this._userId = response.user._id || response.user._id;
  //     Users.addToStore(response.user);
  //     return response;
  //   },
  // },
});
