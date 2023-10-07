import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { PATH } from 'config/paths';
import { MarkingState, Post } from 'types/post';

export default function PostItem({ post }: { post: Post }) {
  const postHeight = 'h-40';
  const router = useRouter();
  const [isMount, setIsMount] = useState(false);
  const [markingState, setMarkingState] = useState<MarkingState>(post.userStat?.mark || 'Blank');
  const [newPoint, setNewPoint] = useState(post.point);
  const onEndorse = () => setMarkingState('Endorsed');
  const onGraffitize = () => setMarkingState('Graffitized');

  const onPostClick = () => router.push(`${PATH.HUB}/${post.hub}/${post.id}`);
  const onAuthorClick = () => router.push(`${PATH.AUTHOR}/${post.author}`);

  useEffect(() => {
    if (markingState === 'Endorsed') setNewPoint(post.point + 1);
    if (markingState === 'Graffitized') setNewPoint(post.point - 1);
  }, [markingState, post.point]);

  useEffect(() => setIsMount(true), []);

  if (!isMount) return null;
  return (
    <div
      className={`flex justify-start w-10/12 h-40 bg-gray-200 rounded-lg overflow-hidden ${postHeight} max-w-5xl text-sm`}
    >
      <div className="flex text-start">
        <div className="p-4">
          <div className="h-20 w-20 flex-shrink-0 bg-gray-300 rounded-lg">
            {post?.imgSrc ? (
              <img alt="no img" src={post.imgSrc} className="h-full w-full" />
            ) : (
              <div className="h-full w-full" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <button
            type="button"
            className="text-sky-700 text-start cursor-pointer"
            onClick={onAuthorClick}
          >
            a/{post.author}
          </button>
          <button
            type="button"
            className="overflow-hidden flex-1 flex items-start justify-start cursor-pointer"
            onClick={onPostClick}
          >
            <div className="text-start align-text-top">{post.description}</div>
          </button>
        </div>
      </div>
      <div
        className={`${postHeight} w-24 flex-shrink-0 flex items-center justify-center font-base text-lg bg-zinc-200 cursor-default`}
      >
        <div
          className={clsx('whitespace-nowrap transition', {
            'text-zinc-500': markingState === 'Blank',
            'text-orange-500': markingState === 'Endorsed',
            'text-sky-600': markingState === 'Graffitized',
          })}
        >
          {newPoint}
        </div>
      </div>
      <div className="flex flex-col items-start h-40">
        <button
          type="button"
          className="w-full flex-1 bg-sky-800 pl-3 pr-2 text-start text-white font-semibold hover:brightness-125 transition"
        >
          Reply
        </button>
        <button
          type="button"
          className={clsx(
            'w-full flex-1 pl-3 pr-2 text-start font-medium hover:brightness-105 transition',
            markingState === 'Endorsed' ? 'bg-orange-400 text-white' : 'bg-zinc-200 text-gray-700',
          )}
          onClick={onEndorse}
        >
          Endorse
        </button>
        <button
          type="button"
          className={clsx(
            'w-full flex-1 pl-3 pr-2 text-start font-medium hover:brightness-105 transition',
            markingState === 'Graffitized' ? 'bg-blue-500 text-white' : 'bg-zinc-200 text-gray-700',
          )}
          onClick={onGraffitize}
        >
          Graffitize
        </button>
      </div>
    </div>
  );
}
