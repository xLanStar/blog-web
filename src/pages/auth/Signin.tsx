import {
  GoogleCircleFilled,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Flex, Form, Image, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CommonRules } from "../../data/form";
import { AUTH_LOGIN_URL } from "../../data/reference";
import { setUser } from "../../feature/user/userSlice";
import APIHelper from "../../helper/APIHelper";
import { useAppDispatch } from "../../hooks";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  id: number;
  name: string;
}

const Signin: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const onFinish = (data: LoginFormData) => {
    APIHelper.post<LoginResponse>(AUTH_LOGIN_URL, data).then(({ data }) => {
      console.log(data);
      dispatch(setUser(data));
      navigate("/", { replace: true });
    });
  };

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ minHeight: "100vh" }}
    >
      <Image src="blog.svg" preview={false} width={128} />
      <h3>登入</h3>
      <Form
        form={form}
        layout="vertical"
        scrollToFirstError
        onFinish={onFinish}
        noValidate
      >
        <Form.Item
          name="email"
          label="信箱"
          rules={[CommonRules.Email, CommonRules.Required]}
        >
          <Input prefix={<UserOutlined />} placeholder="信箱" required />
        </Form.Item>
        <Form.Item name="password" label="密碼" rules={[CommonRules.Required]}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="密碼"
            required
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            登入
          </Button>
          <Divider>或</Divider>
          <Button icon={<GoogleCircleFilled />} style={{ width: "100%" }}>
            Google
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Signin;
