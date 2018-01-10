import { Comment } from './comment';
import { Vote } from './vote';
import { PostType } from './post_type';

export class Post {

  constructor(value) {
    this.Label = value.label;
    this.Url = value.link;
    this.Body = value.body;
    this.Type = value.type;
    this.PostDate = Date.now();
    this.Score = 0;
    this.Votes = [];
    this.Comments = [];
  }

  Label: string;
  Url: string;
  Body: string;
  Type: PostType;
  PostDate: number;
  Score: number;
  Votes: Vote[];
  Comments: Comment[];
}
