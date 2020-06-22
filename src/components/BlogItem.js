import React from 'react';
import { useParams } from "react-router-dom"

const BlogItem = ({ blogs, addLike }) => {
    const id = useParams().id
    const blog = blogs.find(n => n.id === id)

  const updateBlog = () => {
    let updatedBlog = { title: blog.title, author: blog.author, url: blog.url, likes: blog.likes };
    updatedBlog.user = blog.user.id;
    addLike(blog.id, updatedBlog);
  };

  return (
    <div>
      <p>Title: {blog.title} Author: {blog.author}</p>
      <p>Url: {blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={updateBlog}>like</button></p>
    </div>
  );
};

export default BlogItem;
