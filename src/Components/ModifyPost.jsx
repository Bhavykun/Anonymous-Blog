import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { createPost, updatePost, getPostById } from '../API'; // Import API functions

function ModifyPost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams(); // Get post ID from URL params (if editing)
  const navigate = useNavigate(); // Use navigate instead of history

  // If editing, fetch the post data
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      getPostById(id)
        .then((postData) => {
          setFormData(postData);
        })
        .catch((err) => console.error('Error fetching post for edit:', err));
    }
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission (create or edit post)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updatePost(id, formData)
        .then(() => {
          navigate('/'); // Use navigate to redirect
        })
        .catch((err) => console.error('Error updating post:', err));
    } else {
      createPost(formData)
        .then(() => {
          navigate('/'); // Use navigate to redirect
        })
        .catch((err) => console.error('Error creating post:', err));
    }
  };

  return (
    <div className="container">
      <header className="form-header">
        <h1>{isEdit ? "Edit Blog" : "New Blog"}</h1>
        <p className="form-subtitle">
          {isEdit ? "Update your post" : "Create a new anonymous post"}
        </p>
      </header>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post here..."
            rows="10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Anonymous"
            required
          />
        </div>

        <button id="newPostBtn" type="submit">
          {isEdit ? "Update Post" : "Publish Post"}
        </button>
      </form>
    </div>

  );
}

export default ModifyPost;
