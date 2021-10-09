import { UserModel } from './user-model';
import { LikeModel } from './like-model';
import { CommentModel } from './comment-model';

export interface PostModel {
  _id: String;
  user: UserModel;
  like: LikeModel;
  photo: String[];
  comments: CommentModel;
  description: String;
  createdAt: Date;
  updatedAt: Date;
}
