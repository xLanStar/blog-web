import { PlusSquareOutlined } from "@ant-design/icons";
import { App, FloatButton, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import NewPostModal from "../components/NewPostModal";
import PostCard, { IPost } from "../components/PostCard";
import {
  API_COMMENT_URL,
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

  const editPost = useCallback(
    (id: number, text: string) => {
      APIHelper.patch(`${API_POST_URL}/${id}`, { text })
        .then(() => {
          message.success("編輯成功");
          fetchPosts();
        })
        .catch(() => {
          message.error("操作失敗");
        });
    },
    [message]
  );

  const likePost = useCallback(
    (id: number) => {
      const post = posts.find((blog) => blog.id === id);
      if (!post) return;
      APIHelper.post(
        `${post.liked ? API_POST_DISLIKE_URL : API_POST_LIKE_URL}/${id}`
      )
        .then(() => {
          setPosts((prev) => {
            const idx = prev.findIndex((blog) => blog.id === id);
            if (idx == -1) return prev;
            const newPosts = [...prev];
            if (newPosts[idx].liked) {
              newPosts[idx].likes_count--;
              newPosts[idx].liked = false;
            } else {
              newPosts[idx].likes_count++;
              newPosts[idx].liked = true;
            }
            return newPosts;
          });
        })
        .catch(() => {
          message.error("操作失敗");
        });
    },
    [message, posts]
  );

  const deletePost = useCallback(
    (id: number) => {
      APIHelper.delete(`${API_POST_URL}/${id}`)
        .then(() => {
          message.success("刪除成功");
          fetchPosts();
        })
        .catch(() => {
          message.error("操作失敗");
        });
    },
    [message]
  );

  const createComment = useCallback(
    (postId: number, comment: string) => {
      const post = posts.find((post) => post.id === postId);
      if (!post) return;
      APIHelper.post(API_COMMENT_URL, { post_id: postId, text: comment })
        .then(() => {
          message.success("留言成功");
          fetchPosts();
        })
        .catch(() => {
          message.error("操作失敗");
        });
    },
    [message, posts]
  );

  const editComment = useCallback(
    (commentId: number, text: string) => {
      APIHelper.patch(`${API_COMMENT_URL}/${commentId}`, { text })
        .then(() => {
          message.success("編輯成功");
          fetchPosts();
        })
        .catch(() => {
          message.error("操作失敗");
        });
    },
    [message]
  );

  const deleteComment = useCallback(
    (commentId: number) => {
      APIHelper.delete(`${API_COMMENT_URL}/${commentId}`)
        .then(() => {
          message.success("刪除成功");
          fetchPosts();
        })
        .catch(() => {
          message.error("操作失敗");
        });
    },
    [message]
  );

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
      {posts.map((post, idx) => (
        <PostCard
          key={idx}
          post={post}
          onEditPost={(text) => {
            editPost(post.id, text);
          }}
          onLikePost={() => {
            likePost(post.id);
          }}
          onDeletePost={() => {
            deletePost(post.id);
          }}
          onSendComment={(comment) => {
            createComment(post.id, comment);
          }}
          onEditComment={editComment}
          onDeleteComment={deleteComment}
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
