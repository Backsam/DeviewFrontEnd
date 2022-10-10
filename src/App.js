import './App.css';
import React from "react";
import Header from "./Component/TestNavBar";
import Footer from './Container/Footer';
import Main from "./Container/Main/Main.js";
import PortfolioView from "./Container/Portfolio/PortfolioView.js";
import WritePortfolio from './Container/Portfolio/WritePortfollio';
import Profile from "./Container/Profile/Profile.js";
import Search from './Container/Search.js';

import WantedDev from './Container/Wanted/WantedDev';
import WantedJob from './Container/Wanted/WantedJob';
import ViewWantedJob from './Container/Wanted/ViewWantedJob';


import Message from './Container/Message/Message';

import NotFound from './Container/NotFound/NotFound';


import TestVeiw from './Container/Portfolio/TestVeiw'


import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <>
    <BrowserRouter>
    <div className='Header'>
     <Header></Header>
    </div>

    <div className="wrap clearfix">
      <Routes>
        <Route path="/" element={<Main/>}></Route>

        <Route path="/portfolioView" element={<PortfolioView/>}></Route>
        <Route path="/writePortfolio" element={<WritePortfolio/>}></Route>

        <Route path="/search/" element={<Search></Search>}></Route>
        <Route path="/search/?query=keyword" element={<Search></Search>}></Route>

        <Route path="/Wanted/" element={<WantedDev/>}></Route>
        <Route path="/Wanted/dev" element={<WantedDev/>}></Route>
        <Route path="/Wanted/job" element={<WantedJob/>}></Route>
        <Route path="/Wanted/job/view" element={<ViewWantedJob/>}></Route>

        <Route path="/profile" element={<Profile></Profile>}></Route>
        
        <Route path="/Message" element={<Message/>}></Route>
        <Route path="/TestView" element={<TestVeiw/>}></Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      </div>
    </BrowserRouter>

    <div className='wrap'>
      <Footer></Footer>
    </div>
    </>
  );
}

export default App;
