import React, { memo } from "react";
import { hasAuth as hasAuthUtil } from "./utils";

const TYPE_ENUMS = {
  VISIBLE: "VISIBLE",
  DISABLED: "DISABLED",
  ANTD_DISABLED: "ANTDDISABLED",
};

/**
 * 权限相关高阶组件
 * @param {*} props
 * @returns
 */
const KAuthHoc = (props) => {
  const { type = TYPE_ENUMS.VISIBLE, code = "", children } = props;

  const isHasAuth = hasAuthUtil(code);

  // 有权限的统一返回
  if (isHasAuth) return children;

  // 无权限的如下处理
  // 显示隐藏
  if (type.toUpperCase() === TYPE_ENUMS.VISIBLE) {
    return null;
  }

  // 控制antd的disabled
  if (type.toUpperCase() === TYPE_ENUMS.ANTD_DISABLED) {
    return React.Children.map(children, (child) => {
      if (!child || !child.$$typeof) return child;
      // const childDisabled = child.props?.disabled || false;
      return React.cloneElement(child, {
        disabled: true,
      });
    });
  }

  // 非antd组件
  if (type.toUpperCase() === TYPE_ENUMS.DISABLED) {
    return React.Children.map(children, (child) => {
      if (!child || !child.$$typeof) return child;

      const childStyle = child.props?.style || {};

      return React.cloneElement(child, {
        style: {
          ...childStyle,
          opacity: "1",
          cursor: "not-allowed",
        },
        onClick: () => {},
      });
    });
  }

  return null;
};

export const hasAuth = hasAuthUtil;

export default memo(KAuthHoc);
