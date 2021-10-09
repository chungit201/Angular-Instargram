import { UserModel } from './user-model';
import { PostModel } from './post-model';
export interface LikeModel {
  _id?: String;
  user?: UserModel;
  status: PostModel;
  amount: number;
}
