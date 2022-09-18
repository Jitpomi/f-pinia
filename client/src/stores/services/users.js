import {defineStore, BaseModel} from 'feathers-pinia';
import {api} from 'src/api/feathers';

export class Users extends BaseModel {
}

const servicePath = 'users';
export default defineStore({
  idField: '_id', // (2)
  clients: {api}, // (2)
  servicePath,
  Model: Users,
});

api.service(servicePath).hooks({});
