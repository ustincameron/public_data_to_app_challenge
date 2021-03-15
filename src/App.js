import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";

import HomePage from './pages/HomePage'

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
      },
   },
});

function App() {
  return (
     <QueryClientProvider client={queryClient}>
        <HomePage/>
     </QueryClientProvider>
  );
}

export default App;
