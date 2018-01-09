import { Vote } from './vote';

export class Comment {
  Text: string;
  Votes: Vote[];
  Comments: Comment[];
}
