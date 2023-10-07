import { Post } from 'types/post';
import PostItem from './PostItem';

export default function PostList({ postList }: { postList: Post[] }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {postList.map((item) => (
        <PostItem post={item} />
      ))}
    </div>
  );
}
