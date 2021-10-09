import { PostModel } from './post-model';
import { UserModel } from './user-model';

export interface CommentModel {
  _id?: String;
  content: String;
  user: UserModel;
  status: PostModel;
}
