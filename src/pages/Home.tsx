import { PlusSquareOutlined } from "@ant-design/icons";
import { Flex, FloatButton, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import NewPostModal from "../components/NewPostModal";
import PostCard, { IPost } from "../components/PostCard";
import { API_POST_URL } from "../data/reference";
import APIHelper from "../helper/APIHelper";

const Home: React.FunctionComponent = () => {
  // const user = useAppSelector((state) => state.user);

  const [posts, setPosts] = useState<IPost[]>([
    {
      author_id: 1,
      author_name: "test",
      comments: [
        {
          author_id: 1,
          author_name: "test",
          text: "真的",
        },
      ],
      created_at: "2024-05-16 08:28:11",
      id: 1,
      liked: false,
      likes_count: 0,
      text: "真的假的?",
    },
  ]);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  const onClickLikeBlog = useCallback((id: number) => {
    setPosts((prev) => {
      const idx = prev.findIndex((blog) => blog.id === id);
      if (idx == -1) return prev;
      const newBlogs = [...prev];
      if (newBlogs[idx].liked) {
        newBlogs[idx].likes_count = (newBlogs[idx].likes_count ?? 0) - 1;
        newBlogs[idx].liked = false;
      } else {
        newBlogs[idx].likes_count = (newBlogs[idx].likes_count ?? 0) + 1;
        newBlogs[idx].liked = true;
      }
      return newBlogs;
    });
  }, []);

  useEffect(() => {
    APIHelper.get<IPost[]>(API_POST_URL).then((data) => {
      setPosts(data.data);
    });
  }, []);

  return (
    <>
      <Flex justify="center">
        <Flex
          vertical
          gap={32}
          justify="start"
          style={{
            padding: 32,
          }}
        >
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
        </Flex>
      </Flex>
      <NewPostModal
        open={isNewPostModalOpen}
        onCancel={() => setIsNewPostModalOpen(false)}
      />
    </>
  );
};

export default Home;
