import {
  CheckOutlined,
  CloseOutlined,
  CommentOutlined,
  EditOutlined,
  HeartFilled,
  SendOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Image, Input, Space, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { useAppSelector } from "../hooks";
import { formatDateTime, formatPassedTime } from "../utils/date.utils";
import Card, { CardBlock } from "./Card";

const { PreviewGroup } = Image;

export const COLOR_POST_CARD_LIKE = "#eb2f96";

type MessageBlockProps = {
  authorPicture?: string;
  authorName?: string;
  text?: string;
  createdAt?: string;
  editable?: boolean;
  onEdit?: (text: string) => void;
};

const MessageBlock: React.FunctionComponent<MessageBlockProps> = ({
  authorPicture,
  authorName,
  text,
  createdAt,
  editable,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(text ?? "");

  const canSave = !!editingText && editingText !== text;

  return (
    <CardBlock style={{ position: "relative" }}>
      <Flex vertical gap={8}>
        <Meta
          avatar={<Avatar src={authorPicture} />}
          title={authorName}
          description={
            createdAt && (
              <Tooltip title={formatDateTime(createdAt)}>
                {formatPassedTime(createdAt)}
              </Tooltip>
            )
          }
          style={{ whiteSpace: "pre-line" }}
        />
        {isEditing ? (
          <Input.TextArea
            value={editingText}
            placeholder="分享你的心情"
            autoSize={{ minRows: 2, maxRows: 6 }}
            style={{ resize: "none" }}
            onChange={(e) => setEditingText(e.target.value)}
          />
        ) : (
          text
        )}
      </Flex>
      <Space style={{ position: "absolute", top: 4, right: 4 }}>
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
                onEdit?.(editingText);
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
              icon={<EditOutlined />}
              onClick={() => {
                setIsEditing(true);
                setEditingText(text ?? "");
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
    <div style={{ position: "relative" }}>
      <Input.TextArea
        value={comment}
        placeholder="發佈你的回覆"
        autoSize={{ minRows: 2, maxRows: 6 }}
        style={{ resize: "none" }}
        onChange={(e) => setComment(e.target.value)}
        {...props}
      />
      <Button
        icon={<SendOutlined />}
        type={"text"}
        shape={"circle"}
        disabled={!comment}
        style={{
          position: "absolute",
          right: 4,
          bottom: 4,
        }}
        onClick={() => {
          console.log("onClick", onSendComment);
          if (!onSendComment) return;
          try {
            console.log("onSendComment", comment);
            onSendComment(comment);
            setComment("");
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </div>
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
    id: number;
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
  onEditComment?: (commentId: number, comment: string) => void;
  onSendComment?: (comment: string) => void;
};

/**
 * 文章卡片元件
 */
const PostCard: React.FunctionComponent<PostCardProps> = ({
  post,
  onEditPost,
  onClickLike,
  onEditComment,
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
      <MessageBlock
        authorName={post.author_name}
        authorPicture={post.author_picture}
        text={post.text}
        createdAt={post.created_at}
        editable={post.author_id === user.id}
        onEdit={onEditPost}
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
            {post.comments.map((comment) => (
              <MessageBlock
                key={comment.id}
                authorName={comment.author_name}
                authorPicture={comment.author_picture}
                text={comment.text}
                createdAt={comment.created_at}
                editable={comment.author_id === user.id}
                onEdit={(text) => {
                  onEditComment?.(comment.id, text);
                }}
              />
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
