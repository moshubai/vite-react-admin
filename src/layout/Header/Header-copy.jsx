import { LeftOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Avatar, Button, Layout, Space, Typography } from "antd";
import { useSelector } from "react-redux";

import { UserDropdown } from "./components/UserDropdown";

const Header = () => {
  const pageReducer = useSelector((state) => state.page);

  return (
    <Layout.Header css={styleHeader}>
      <Space>
        {!!pageReducer.onBack && (
          <Button icon={<LeftOutlined />} shape="circle" type="text" onClick={pageReducer.onBack}></Button>
        )}

        <Typography.Title level={3} css={styleTitle}>
          {pageReducer.title}
        </Typography.Title>
      </Space>

      <UserDropdown>
        <Avatar css={styleAvatar}>N</Avatar>
      </UserDropdown>
    </Layout.Header>
  );
};

export default Header;

const styleHeader = css({
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingInline: 20,
  position: "sticky",
  top: 0,
});

const styleAvatar = css({
  cursor: "pointer",
});

const styleTitle = css({
  margin: "0px !important",
});
