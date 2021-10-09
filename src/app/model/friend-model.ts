import { UserModel } from './user-model';
import { PostModel } from './post-model';
export interface FriendModel {
  _id: string;
  user: UserModel;
  friends: Object;
  status: PostModel;
}
