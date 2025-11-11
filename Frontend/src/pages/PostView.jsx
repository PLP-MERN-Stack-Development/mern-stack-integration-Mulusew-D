import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/apiService';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api.get(`/posts/${id}`).then((res) => {
      setPost(res.data.post);
      setComments(res.data.comments);
    });
  }, [id]);

  const addComment = async (body) => {
    const res = await api.post('/comments', { post: id, body });
    setComments((c) => [res.data, ...c]);
  };

  if (!post) return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;

  // ✅ Inline CSS Styles
  const wrapper = {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "16px",
  };

  const bodyStyle = {
    lineHeight: "1.7",
    fontSize: "18px",
    marginBottom: "24px",
  };

  const divider = {
    width: "100%",
    height: "1px",
    background: "#ddd",
    margin: "30px 0",
  };

  const commentsTitle = {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "10px",
  };

  const commentBox = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "12px",
    background: "#fafafa",
  };

  const commentAuthor = {
    fontWeight: "600",
    marginBottom: "4px",
  };

  return (
    <div style={wrapper}>
      {/* ✅ Post Title */}
      <h1 style={titleStyle}>{post.title}</h1>

      {/* ✅ Post Body */}
      <div
        style={bodyStyle}
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      {/* ✅ Divider */}
      <div style={divider}></div>

      {/* ✅ Comments */}
      <h3 style={commentsTitle}>Comments</h3>

      {comments.map((c) => (
        <div key={c._id} style={commentBox}>
          <div style={commentAuthor}>{c.author?.name || "Anonymous"}</div>
          <div>{c.body}</div>
        </div>
      ))}
    </div>
  );
}
