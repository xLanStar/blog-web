import {
  CheckOutlined,
  CloseOutlined,
  CommentOutlined,
  EditFilled,
  HeartFilled,
  SendOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Image, Input, Space, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { formatDateTime, formatPassedTime } from "../utils/date.utils";
import Card, { CardBlock } from "./Card";
import TextAreaWithFloatButton from "./TextAreaWithFloatButton";

const { PreviewGroup } = Image;

export const COLOR_POST_CARD_LIKE = "#eb2f96";

type PostContentBlockProps = {
  post: IPost;
  editable?: boolean;
  onEditPost?: (text: string) => void;
};

const PostContentBlock: React.FunctionComponent<PostContentBlockProps> = ({
  post,
  editable,
  onEditPost,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(post.text);

  const canSave = !!text && text !== post.text;

  useEffect(() => {
    if (!isEditing) return;
    setText(post.text);
  }, [isEditing]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CardBlock className="post-content-block">
      <Flex vertical gap={8}>
        <Meta
          avatar={<Avatar src={post.author_picture} />}
          title={post.author_name}
          description={
            <Tooltip title={formatDateTime(post.created_at)}>
              {formatPassedTime(post.created_at)}
            </Tooltip>
          }
          style={{ whiteSpace: "pre-line" }}
        />
        {isEditing ? (
          <Input.TextArea
            value={text}
            placeholder="分享你的心情"
            autoSize={{ minRows: 2, maxRows: 6 }}
            style={{ resize: "none" }}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          post.text
        )}
      </Flex>
      <Space className="post-content-control">
        {isEditing ? (
          <>
            <Button
              key="save"
              type="text"
              shape="circle"
              icon={<CheckOutlined />}
              disabled={!canSave}
              onClick={() => {
                setIsEditing(false);
                onEditPost?.(text);
              }}
            />
            <Button
              key="cancel"
              type="text"
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => {
                setIsEditing(false);
              }}
            />
          </>
        ) : (
          editable && (
            <Button
              key="edit"
              type="text"
              shape="circle"
              icon={<EditFilled />}
              onClick={() => {
                setIsEditing(true);
              }}
            />
          )
        )}
      </Space>
    </CardBlock>
  );
};

type CommentTextAreaProps = {
  onSendComment?: (comment: string) => void;
} & React.ComponentProps<typeof Input.TextArea>;

const CommentTextArea: React.FunctionComponent<CommentTextAreaProps> = ({
  onSendComment,
  ...props
}) => {
  const [comment, setComment] = useState("");

  return (
    <TextAreaWithFloatButton
      buttonProps={{
        icon: <SendOutlined />,
        type: "text",
        shape: "circle",
        disabled: !comment,
        onClick: () => {
          console.log("onClick", onSendComment);
          if (!onSendComment) return;
          try {
            console.log("onSendComment", comment);
            onSendComment(comment);
            setComment("");
          } catch (e) {
            console.error(e);
          }
        },
      }}
      value={comment}
      placeholder="發佈你的回覆"
      autoSize={{ minRows: 2, maxRows: 6 }}
      style={{ resize: "none" }}
      onChange={(e) => setComment(e.target.value)}
      {...props}
    />
  );
};

export interface IPost {
  id: number;
  text: string;
  images?: string[];
  author_id: number;
  author_name: string;
  author_picture?: string;
  likes_count: number;
  liked: boolean;
  comments: {
    author_id: number;
    author_name: string;
    author_picture: string;
    text: string;
    created_at: string;
  }[];
  created_at: string;
}

export type PostCardProps = {
  post: IPost;
  onEditPost?: (text: string) => void;
  onClickLike?: () => void;
  onSendComment?: (comment: string) => void;
};

/**
 * 文章卡片元件
 */
const PostCard: React.FunctionComponent<PostCardProps> = ({
  post,
  onEditPost,
  onClickLike,
  onSendComment,
}) => {
  const user = useAppSelector((state) => state.user);
  const [showComments, setShowComments] = useState(false);

  return (
    <Card
      cover={
        post.images && (
          <PreviewGroup items={post.images}>
            <Image alt="" src={post.images?.[0]} />
          </PreviewGroup>
        )
      }
      style={{
        minWidth: 300,
      }}
    >
      <PostContentBlock
        post={post}
        editable={post.author_id === user.id}
        onEditPost={onEditPost}
      />
      <CardBlock>
        <Flex justify="space-evenly">
          <Space key="like">
            <Tooltip title="喜歡">
              <Button
                icon={<HeartFilled />}
                style={{
                  color: post.liked ? COLOR_POST_CARD_LIKE : "",
                }}
                shape="circle"
                type="text"
                onClick={onClickLike}
              />
            </Tooltip>
            {post.likes_count ?? 0}
          </Space>
          <Space key="comment">
            <Tooltip title="留言">
              <Button
                icon={<CommentOutlined />}
                shape="circle"
                type="text"
                onClick={() => setShowComments((prev) => !prev)}
              />
            </Tooltip>
            {post.comments?.length ?? 0}
          </Space>
        </Flex>
      </CardBlock>
      {showComments && (
        <CardBlock>
          <Flex vertical gap={24}>
            {post.comments.map((comment, idx) => (
              <Space key={idx} direction="vertical" size="small">
                <Meta
                  avatar={<Avatar src={comment.author_picture} />}
                  title={comment.author_name}
                  description={
                    <Tooltip title={formatDateTime(comment.created_at)}>
                      {formatPassedTime(comment.created_at)}
                    </Tooltip>
                  }
                  style={{ whiteSpace: "pre-line" }}
                />
                {comment.text}
              </Space>
            ))}
            <Meta
              avatar={<Avatar src={user.picture} />}
              title={<CommentTextArea onSendComment={onSendComment} />}
              style={{ whiteSpace: "pre-line" }}
            />
          </Flex>
        </CardBlock>
      )}
    </Card>
  );
};
export default PostCard;
