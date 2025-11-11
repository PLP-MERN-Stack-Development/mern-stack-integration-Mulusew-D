import React, { useEffect, useContext, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

export default function PostList() {
  const { posts, fetchPosts, meta } = useContext(PostsContext);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPosts({ page, search });
  }, [page, search, fetchPosts]);

  // ✅ Styles
  const container = {
    maxWidth: "1000px",
    margin: "20px auto",
    padding: "0 16px",
  };

  const topBar = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "600",
  };

  const searchStyle = {
    padding: "10px 14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    width: "220px",
    outline: "none",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  };

  return (
    <div style={container}>
      {/* ✅ Top section with title + search */}
      <div style={topBar}>
        <h1 style={titleStyle}>Posts</h1>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchStyle}
        />
      </div>

      {/* ✅ Grid of post cards */}
      <div style={gridStyle}>
        {posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>

      {/* ✅ Pagination */}
      <Pagination
        page={meta.page}
        total={meta.total}
        limit={meta.limit}
        onChange={(p) => setPage(p)}
      />
    </div>
  );
}
