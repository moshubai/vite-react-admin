# KAuthHoc

权限相关高阶组件

#### Props

| props | type   | default | info                              |
| ----- | ------ | ------- | --------------------------------- |
| type  | string | visable | visable / disabled / antdDisabled |
| code  | string | -       | code 码                           |

#### demo

```jsx
import React, { memo } from "react";
import { Button } from "antd";
import KAuthHoc, { hasAuth } from "@/components/KAuthHoc/index";

const Demo = (props) => {
  // 函数用法 使用组件可不调用
  const isHasAuth = hasAuth("changeSingleInfo");

  // jsx用法
  return (
    <>
      {/* 简单用法 无权限时隐藏 */}
      <KAuthHoc code="changeSingleInfo">
        <Button type="primary">编辑门店信息</Button>
      </KAuthHoc>

      {/* type="disabled" 内置会降低透明度 并注销click事件 */}
      <KAuthHoc code="changeSingleInfo" type="disabled">
        <p type="primary" onClick={onEdit}>
          编辑门店信息
        </p>
      </KAuthHoc>

      {/* type="antdDisabled" 控制antd组件的disabled属性 */}
      <KAuthHoc code="changeSingleInfo" type="antdDisabled">
        <Button type="primary">编辑门店信息</Button>
      </KAuthHoc>
    </>
  );
};

export default memo(KShopStatusControl);
```
