import {defineStore} from 'feathers-pinia';

import {plugins} from 'vue-fingerprint';

const feathersClient = () => import('../api/feathers');

export default function useFingerprintAuthStore () {

  return (async () => {
    return  await  plugins.defineFingerprintAuth({feathersClient, defineStore});
  })();
}
