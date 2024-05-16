import { App as AntdApp, ConfigProvider } from "antd";
import zhTW from "antd/locale/zh_TW";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { COLOR_PRIMARY } from "./data/color";
import store from "./store.ts";

import "antd/dist/reset.css";
import "./assets/scss/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider
        locale={zhTW}
        theme={{
          token: {
            colorPrimary: COLOR_PRIMARY,
          },
        }}
      >
        <AntdApp>
          <App />
        </AntdApp>
      </ConfigProvider>
    </Provider>
  </BrowserRouter>
);
