import { Comment } from './comment';
import { Vote } from './vote';
import { PostType } from './post_type';

export class Post {
  Label: string;
  Url: string;
  Body: string;
  Type: PostType;
  Votes: Vote[];
  Comments: Comment[];
}
