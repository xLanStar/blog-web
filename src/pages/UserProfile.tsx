import { Card } from "antd";
import React from "react";
import { useAppSelector } from "../hooks";

const UserProfile: React.FunctionComponent = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <>
      <Card title={user.name}>
        <p>電子郵件: {user.email}</p>
      </Card>
    </>
  );
};

export default UserProfile;
