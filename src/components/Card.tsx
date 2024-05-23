import { Card as AntdCard } from "antd";
import type { CardProps as AntdCardProps } from "antd/lib/card";

type BlockProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
};
export const CardBlock: React.FunctionComponent<BlockProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={className ? className + " card-block" : "card-block"}
      {...props}
    >
      {children}
    </div>
  );
};

type CardProps = AntdCardProps & {
  children?: React.ReactNode;
};

const Card: React.FunctionComponent<CardProps> = ({ children, ...props }) => {
  return (
    <AntdCard
      {...props}
      styles={{
        body: { padding: 12, display: "flex", flexDirection: "column" },
      }}
    >
      {children}
    </AntdCard>
  );
};

export default Card;
