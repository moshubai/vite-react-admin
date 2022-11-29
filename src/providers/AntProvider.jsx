import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import viVN from "antd/lib/locale/vi_VN";
import moment from "moment";
import "moment/locale/vi";

import { languages } from "../i18n";

moment.locale("en");
const i18nLocal = localStorage.getItem("i18nextLng");
const locale = i18nLocal === languages.tieng_viet ? viVN : enUS;

if (i18nLocal === languages.tieng_viet) {
  moment.locale("vi");
}

export const AntProvider = ({ children }) => {
  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
};
