import { PostModel } from './post-model';
import { FriendModel } from './friend-model';
export interface UserModel {
  _id?: String;
  name?: String;
  email?: String;
  avatar?: String;
  status?: PostModel;
  birthday?: Date;
  password?: String;
  friend?: FriendModel;
  active?: Boolean;
  activeStatus?: Boolean;
}
