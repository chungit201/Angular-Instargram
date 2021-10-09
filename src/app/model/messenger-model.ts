import { UserModel } from './user-model';

export interface MessengerModel {
  _id: String;
  user: UserModel;
  content: Object;
}
