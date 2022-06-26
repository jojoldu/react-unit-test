import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';
import CommentComponent from './hackernews/CommentComponent';
import "reflect-metadata";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <CommentComponent client={queryClient}/>
      </div>
    </QueryClientProvider>
  );
}
