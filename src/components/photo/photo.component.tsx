"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Post } from "@/types/Photo.entity";
import { useAuth } from "@/providers/authContext";
import postLike from "@/actions/postLike";

export default function FeedPosts({ posts }: { posts: Post[] }) {
  const { user } = useAuth();

  const [localPosts, setLocalPosts] = useState(posts);

  const handleLike = async (postId: number) => {
    if (!user) return;

    const res = await postLike(postId, user.id);

    setLocalPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const likedByUser = post.likes.some((like) => like?.user?.id === user.id);

          const updatedLikes = likedByUser
            ? post.likes.filter((like) => like.user?.id !== user.id)
            : [...post.likes, { user: { id: user.id } }];

          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );
  };

  return (
    <ul className="grid grid-cols-3 gap-4 mb-4 justify-items-center max-w-[50rem] mx-auto">
      {localPosts.map((post, i) => {
        const likedByUser = post.likes.some((like) => like?.user?.id === user?.id);

        return (
          <li
            key={post.id + i}
            className={`relative rounded-md overflow-hidden cursor-pointer ${i === 1 ? "col-span-2 row-span-2" : ""
              }`}
          >
            <Link href={`/post/${post.id}`} scroll={false}>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  sizes="80vw"
                  className="object-cover w-full h-full"
                />
              )}
            </Link>

            <button
              onClick={() => handleLike(post.id)}
              className="absolute top-2 right-2 bg-black/40 p-2 rounded-full hover:bg-black/60 transition"
            >
              <Heart
                size={20}
                className={`${likedByUser ? "text-red-500 fill-red-500" : "text-white"
                  }`}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
