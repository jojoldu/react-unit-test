import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";

import logo from './logo.svg';
import './App.css';
import CommentComponent from './hackernews/CommentComponent';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <CommentComponent />
      </div>
    </QueryClientProvider>
  );
}
