import { ConfigProvider } from 'antd';
// import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

// import { languages } from '../i18n';

// const i18nLocal = localStorage.getItem('i18nextLng');
// const locale = i18nLocal === languages.tieng_viet ? zhCN : enUS;

// if (i18nLocal === languages.tieng_viet) {
//   moment.locale('cn');
// }

export const AntProvider = ({ children }) => {
  return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
};
