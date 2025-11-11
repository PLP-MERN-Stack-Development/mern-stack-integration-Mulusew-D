import React, { useState, useContext } from "react";
import { PostsContext } from "../context/PostsContext";

export default function PostForm() {
  const { createPost } = useContext(PostsContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const containerStyle = {
    maxWidth: "700px",
    margin: "40px auto",
    background: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "16px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
  };

  const textareaStyle = {
    ...inputStyle,
    height: "160px",
    resize: "vertical",
  };

  const fileStyle = {
    padding: "8px 0",
  };

  const buttonStyle = {
    background: "#2563eb",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  };

  const buttonDisabled = {
    ...buttonStyle,
    background: "#9bbdf8",
    cursor: "not-allowed",
  };

  const formGap = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const fd = new FormData();
    fd.append("title", title);
    fd.append("body", body);
    if (file) fd.append("featuredImage", file);

    try {
      await createPost(fd);
      setTitle("");
      setBody("");
      setFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Create Post</h2>

      <form onSubmit={onSubmit} style={formGap}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          style={inputStyle}
          required
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post content..."
          style={textareaStyle}
          required
        />

        <div style={fileStyle}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          disabled={submitting}
          style={submitting ? buttonDisabled : buttonStyle}
        >
          {submitting ? "Saving..." : "Save Post"}
        </button>
      </form>
    </div>
  );
}
