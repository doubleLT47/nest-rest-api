import { PostSearchBody } from './post-search.interface';

export interface PostSearchResponse {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}
