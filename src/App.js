import './App.css';
import React from "react";
import Header from "./Component/TestNavBar";
import Footer from './Container/Footer';
import Main from "./Container/Main/Main.js";

import PortfolioView from "./Container/Portfolio/PortfolioView.js";
import WritePortfolio from './Container/Portfolio/WritePortfollio';
import ModifyPortfolio from './Container/Portfolio/ModifyPortfolio';
import UserPortfoiloList from './Container/Profile/UserPortfolioList';

import Profile from "./Container/Profile/Profile.js";
import Search from './Container/Search.js';

import WantedDev from './Container/Wanted/WantedDev';
import WantedJob from './Container/Wanted/WantedJob';
import WriteWantedJob from './Container/Wanted/WriteWantedJob';
import ViewWantedJob from './Container/Wanted/ViewWantedJob';

import ApplyListView from './Container/Wanted/ApplyListView';
import ApplyWrite from './Container/Wanted/ApplyWrite';


import Message from './Container/Message/Message';

import NotFound from './Container/NotFound/NotFound';


import TestVeiw from './Container/Portfolio/TestVeiw'


import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplyView from './Container/Wanted/ApplyView';



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

        <Route path="/portfolio/:pfid" element={<PortfolioView/>}></Route>
        <Route path="/portfolio/write" element={<WritePortfolio/>}></Route>.
        <Route path="/portfolio/modify/:pfId" element={<ModifyPortfolio/>}></Route>

        <Route path="/search/" element={<Search></Search>}></Route>
        <Route path="/search/?query=keyword" element={<Search></Search>}></Route>

        <Route path="/Wanted/" element={<WantedDev/>}></Route>
        <Route path="/Wanted/dev" element={<WantedDev/>}></Route>
        <Route path="/Wanted/job" element={<WantedJob/>}></Route>
        <Route path="/Wanted/job/Write" element={<WriteWantedJob/>}></Route>
        <Route path="/Wanted/job/view/:wjid" element={<ViewWantedJob/>}></Route>

        <Route path='/wanted/job/apply/list/:wjid' element={<ApplyListView/>}></Route>
        <Route path='/wanted/job/apply/view/:apid' element={<ApplyView/>}></Route>
        <Route path='/wanted/job/apply/write' element={<ApplyWrite/>}></Route>

        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/portfolio/list/:userId" element={<UserPortfoiloList></UserPortfoiloList>}></Route>
        
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
