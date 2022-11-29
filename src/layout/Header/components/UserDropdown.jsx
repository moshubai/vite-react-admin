import Icon, { GlobalOutlined, LogoutOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";

import { BritainFlag, VietnamFlag } from "../../../assets/svgs";
import { languageKeys, languages } from "../../../i18n";

const KEY_NGON_NGU = "LANGUAGE";
const KEY_TIENG_ANH = "ENG";
const KEY_TIENG_VIET = "VIE";
const KEY_DANG_XUAT = "LOGOUT";

export const UserDropdown = ({ children }) => {
  const { i18n, t } = useTranslation();

  const handleChangeLanguage = (val) => {
    i18n.changeLanguage(val);
  };

  const handleClickMenu = ({ key }) => {
    switch (key) {
      case KEY_TIENG_ANH:
        handleChangeLanguage(languages.tieng_anh);
        break;

      case KEY_TIENG_VIET:
        handleChangeLanguage(languages.tieng_viet);
        break;

      case KEY_DANG_XUAT:
        break;

      default:
        break;
    }
  };

  const menuItems = [
    {
      key: KEY_NGON_NGU,
      label: languageKeys.ngon_ngu,
      icon: <GlobalOutlined />,
      children: [
        {
          key: KEY_TIENG_VIET,
          label: t(languageKeys.ngon_ngu_tieng_viet),
          icon: <Icon component={VietnamFlag} css={styleCustomIcon} />,
        },
        {
          key: KEY_TIENG_ANH,
          label: t(languageKeys.ngon_ngu_tieng_anh),
          icon: <Icon component={BritainFlag} css={styleCustomIcon} />,
        },
      ],
    },
    { key: KEY_DANG_XUAT, label: languageKeys.dang_xuat, icon: <LogoutOutlined /> },
  ];

  return (
    <Dropdown
      overlay={<Menu items={menuItems.map((item) => ({ ...item, label: t(item.label) }))} onClick={handleClickMenu} />}
    >
      {children}
    </Dropdown>
  );
};

const styleCustomIcon = css({
  fontSize: 20,
});
