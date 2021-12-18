import React, {  Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import loadable from '@loadable/component'; 
import GuestContainer from "./components/GuestContainer";
import NotFound from "./components/NotFound"; 
import Spinner from "./components/Spinner";

const Home = loadable(() => import('./pages/Home'))

function App() {

  axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';
  return (
      <Suspense fallback={<Spinner/>}>
        <Routes>
        
          <Route path="/" element={<GuestContainer />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Suspense>

    
  );
}

export default App;
