
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Calendar, Tag, AlertCircle, Loader } from 'lucide-react';
import {  BlogPost } from '../utils/auth';
import { postApi } from '@/utils/post';
import { useToast } from '../hooks/use-toast';

const Dashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postApi.getPosts();
      setPosts(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load posts. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setDeletingId(id);
    try {
      await postApi.deletePost(id);
      setPosts(posts.filter(post => post._id !== id));
      toast({
        title: "Post deleted",
        description: "Your blog post has been deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post. Please try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Blog Posts</h1>
            <p className="mt-2 text-gray-600">Manage and edit your published content</p>
          </div>
          <Link
            to="/create-post"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Link>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Start sharing your thoughts with the world!</p>
            <Link
              to="/create-post"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="p-6">
                  {/* Post Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Post Content Preview */}
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {post.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.createdAt)}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-post/${post._id}`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      disabled={deletingId === post._id}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      {deletingId === post._id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-1"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
