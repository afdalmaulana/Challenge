import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Landing/Home';
import ViewArticle from './components/ViewArticle';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/viewarticle' element={<ViewArticle/>}/>
    </Routes>
    </>
  );
}

export default App;
