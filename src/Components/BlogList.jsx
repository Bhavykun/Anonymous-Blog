import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getPosts } from "../API";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((postsData) => {
        setPosts(postsData);
      })
      .catch((err) => console.error("error fetching posts:", err));
  }, []);

  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((err) => console.err("Error deleting post:", err));
  }


  return (
    <div className="container">
      {/* Header */}
      <header className="page-header">
        <div className="title-group">
          <h1>Anonymous Blog</h1>
          <p className="subtitle">Post anything anonymously</p>
        </div>

        <Link id="newPostBtn" to="/new">
          New Post
        </Link>
      </header>

      {/* Posts */}
      <ul className="posts-list">
        {posts.map((post) => (
          <li className="post-card" key={post.id}>
            <div className="post-meta">
              <h2 className="post-title">{post.title}</h2>
              <span className="post-date">
                {new Date(post.date).toLocaleString()}
              </span>
            </div>

            <p className="post-content">{post.content}</p>

            <div className="post-footer">
              <span className="post-author">By {post.author}</span>

              <div className="post-actions">
                <Link className="edit" to={`/edit/${post.id}`}>
                  Edit
                </Link>
                <button
                  className="delete"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default BlogList;
