import { PlusSquareOutlined } from "@ant-design/icons";
import { Flex, FloatButton, Tooltip } from "antd";
import React, { useCallback, useState } from "react";
import BlogCard, { IBlog } from "../components/BlogCard";
import NewPostModal from "../components/NewPostModal";

const TEST_BLOGS: IBlog[] = [
  {
    title: "Blog 1",
    content: "This is the content of Blog 1",
    images: [
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    ],
    user_image: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    likes: 12,
    like: false,
  },
  {
    title: "Blog 2",
    content: "This is the content of Blog 1",
    images: [
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    ],
    user_image: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    likes: 12,
    like: false,
  },
  {
    title: "Blog 3",
    content: "This is the content of Blog 1",
    images: [
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    ],
    user_image: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    likes: 12,
    like: false,
  },
  {
    title: "Blog 4",
    content: "This is the content of Blog 1",
    images: [
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    ],
    user_image: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    likes: 12,
    like: false,
  },
  {
    title: "Blog 5",
    content: "This is the content of Blog 1",
    images: [
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    ],
    user_image: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    likes: 12,
    like: false,
  },
  {
    title: "Blog 6",
    content: "This is the content of Blog 1",
    images: [
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    ],
    user_image: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
    likes: 12,
    like: false,
  },
];

const Home: React.FunctionComponent = () => {
  const [blogs, setBlogs] = useState<IBlog[]>(TEST_BLOGS);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  const onClickLikeBlog = useCallback((idx: number) => {
    setBlogs((prev) => {
      const newBlogs = [...prev];
      if (newBlogs[idx].like) {
        newBlogs[idx].likes -= 1;
        newBlogs[idx].like = false;
      } else {
        newBlogs[idx].likes += 1;
        newBlogs[idx].like = true;
      }
      return newBlogs;
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
          {blogs.map((blog, idx) => (
            <BlogCard
              key={idx}
              blog={blog}
              onClickLike={() => onClickLikeBlog(idx)}
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
