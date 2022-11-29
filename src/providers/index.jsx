import { AntProvider } from "./AntProvider";
import { QueryProvider } from "./QueryProvider";
import { ReduxProvider } from "./ReduxProvider";

export const Providers = ({ children }) => {
  return (
    <ReduxProvider>
      <AntProvider>
        <QueryProvider>{children}</QueryProvider>
      </AntProvider>
    </ReduxProvider>
  );
};
