import PostList from 'components/PostList';
import { RESPONSIVE_PADDING_X } from 'constants/stylings';
import { Post } from 'types/post';

const topPosts: Post[] = [
  {
    id: '1',
    title: 'Post 1',
    hub: 'gaming',
    author: 'timmy',
    point: 11,
    userStat: {
      mark: 'Endorsed',
    },
    imgSrc: '',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
  },
  {
    id: '2',
    title: 'Post 2',
    hub: 'knitting',
    author: 'john',
    point: -1,
    userStat: {
      mark: 'Blank',
    },
    imgSrc: '',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ',
  },
];

export default function Home() {
  return (
    <div className={`${RESPONSIVE_PADDING_X} py-10`}>
      <PostList postList={topPosts} />
    </div>
  );
}
