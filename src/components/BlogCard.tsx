import { HeartFilled } from "@ant-design/icons";
import { Avatar, Button, Card, Image, Space, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";

const { PreviewGroup } = Image;

export const COLOR_BLOG_CARD_LIKE = "#eb2f96";

export interface IBlog {
  title: string;
  content: string;
  images: string[];
  user_image: string;
  likes: number;
  like: boolean;
}

export type IBlogCardProps = {
  blog: IBlog;
  onClickLike: () => void;
};

const BlogCard: React.FunctionComponent<IBlogCardProps> = ({
  blog,
  onClickLike,
}) => {
  return (
    <Card
      cover={
        <PreviewGroup items={blog.images}>
          <Image alt="" src={blog.images?.[0]} />
        </PreviewGroup>
      }
      actions={[
        <Space key="like">
          <Tooltip title="喜歡">
            <Button
              icon={<HeartFilled />}
              style={{
                color: blog.like ? COLOR_BLOG_CARD_LIKE : "",
              }}
              shape="circle"
              onClick={onClickLike}
            />
          </Tooltip>
          {blog.likes}
        </Space>,
      ]}
    >
      <Meta
        avatar={<Avatar src={blog.user_image} />}
        title={blog.title}
        description={blog.content}
        style={{ whiteSpace: "pre-line" }}
      />
    </Card>
  );
};
export default BlogCard;
