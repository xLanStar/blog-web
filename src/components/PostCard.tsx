import { HeartFilled } from "@ant-design/icons";
import { Avatar, Button, Card, Image, Space, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { formatDateTime, formatPassedTime } from "../utils/date.utils";

const { PreviewGroup } = Image;

export const COLOR_POST_CARD_LIKE = "#eb2f96";

export interface IPost {
  id: number;
  text: string;
  images?: string[];
  author_id: number;
  author_name: string;
  author_image?: string;
  likes_count: number;
  liked: boolean;
  comments: {
    author_id: number;
    author_name: string;
    text: string;
    created_at: string;
  }[];
  created_at: string;
}

export type IPostCardProps = {
  post: IPost;
  onClickLike: () => void;
};

const PostCard: React.FunctionComponent<IPostCardProps> = ({
  post,
  onClickLike,
}) => {
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
      actions={[
        <Space key="like">
          <Tooltip title="喜歡">
            <Button
              icon={<HeartFilled />}
              style={{
                color: post.liked ? COLOR_POST_CARD_LIKE : "",
              }}
              shape="circle"
              onClick={onClickLike}
            />
          </Tooltip>
          {post.likes_count ?? 0}
        </Space>,
      ]}
    >
      <Space direction="vertical" size="large">
        <Meta
          avatar={<Avatar src={post.author_image} />}
          title={post.author_name}
          description={
            <Tooltip title={formatDateTime(post.created_at)}>
              {formatPassedTime(post.created_at)}
            </Tooltip>
          }
          style={{ whiteSpace: "pre-line" }}
        />
        {post.text}
      </Space>
    </Card>
  );
};
export default PostCard;
