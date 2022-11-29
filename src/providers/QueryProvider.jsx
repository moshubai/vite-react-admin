import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <>{children}</>

      {process.env.NODE_ENV !== "production" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};
