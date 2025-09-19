export const dynamic = "force-dynamic";

import getPosts from "@/actions/getPosts";
import FeedPosts from "@/components/photo/photo.component";

export default async function Home() {
  const { data: posts } = await getPosts();

  return (
    <div className="p-4">

      {posts.length === 0 && <p className="text-center">Nenhum post encontrado.</p>}

      <FeedPosts posts={posts} />
    </div>
  );
}
