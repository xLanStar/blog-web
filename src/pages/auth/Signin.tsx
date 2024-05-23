import { GoogleOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { Button, Flex, Image } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGIN_URL } from "../../data/reference";
import { IUserState, setUser } from "../../feature/user/userSlice";
import APIHelper from "../../helper/APIHelper";
import { useAppDispatch } from "../../hooks";

const Signin: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setTimeout(() => {
        // avoid 「Token used too early」
        APIHelper.post(AUTH_LOGIN_URL, {
          code: codeResponse.code,
        }).then(({ data }) => {
          dispatch(setUser(data as IUserState));
          navigate("/", { replace: true });
        });
      }, 100);
    },
    flow: "auth-code",
  });

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ minHeight: "100vh" }}
    >
      <Image src="blog.svg" preview={false} width={128} />
      <h3>登入</h3>

      <Button icon={<GoogleOutlined />} onClick={login}>
        Google 登入
      </Button>
    </Flex>
  );
};

export default Signin;
