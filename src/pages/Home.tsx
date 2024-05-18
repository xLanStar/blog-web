import { PlusSquareOutlined } from "@ant-design/icons";
import { App, FloatButton, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import NewPostModal from "../components/NewPostModal";
import PostCard, { IPost } from "../components/PostCard";
import {
  API_POST_DISLIKE_URL,
  API_POST_LIKE_URL,
  API_POST_URL,
} from "../data/reference";
import APIHelper from "../helper/APIHelper";

const Home: React.FunctionComponent = () => {
  const { message } = App.useApp();
  // const user = useAppSelector((state) => state.user);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  const onClickLikeBlog = useCallback((id: number) => {
    const post = posts.find((blog) => blog.id === id);
    if (!post) return;
    APIHelper.post(
      `${post.liked ? API_POST_DISLIKE_URL : API_POST_LIKE_URL}/${id}`
    )
      .then(() => {
        setPosts((prev) => {
          const idx = prev.findIndex((blog) => blog.id === id);
          if (idx == -1) return prev;
          const newBlogs = [...prev];
          if (newBlogs[idx].liked) {
            newBlogs[idx].likes_count--;
            newBlogs[idx].liked = false;
          } else {
            newBlogs[idx].likes_count++;
            newBlogs[idx].liked = true;
          }
          return newBlogs;
        });
      })
      .catch(() => {
        message.error("操作失敗");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPosts = () => {
    APIHelper.get<IPost[]>(API_POST_URL).then((data) => {
      setPosts(data.data);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Tooltip title="發布貼文">
        <FloatButton
          type="primary"
          icon={<PlusSquareOutlined />}
          onClick={() => setIsNewPostModalOpen(true)}
        />
      </Tooltip>
      {posts.map((blog, idx) => (
        <PostCard
          key={idx}
          post={blog}
          onClickLike={() => onClickLikeBlog(blog.id)}
        />
      ))}
      <NewPostModal
        open={isNewPostModalOpen}
        onCancel={() => setIsNewPostModalOpen(false)}
        onPost={fetchPosts}
      />
    </>
  );
};

export default Home;
