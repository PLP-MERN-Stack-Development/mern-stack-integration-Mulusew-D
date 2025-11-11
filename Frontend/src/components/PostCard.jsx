import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition">
      {post.featuredImage && (
        <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover rounded" />
      )}
      <h3 className="text-xl font-semibold mt-3">{post.title}</h3>
      <p className="text-gray-600 mt-1 line-clamp-3">{post.body?.slice(0,200)}{post.body && post.body.length>200 ? '...' : ''}</p>
      <Link to={`/post/${post._id}`} className="text-blue-600 mt-2 inline-block hover:underline">Read More →</Link>
    </div>
  );
}
