// import logo from './logo.svg';
import './App.css';

//write 'rcc' to import the class base components
 import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
// import NavBar from './components/NavBar';

//In react-router-dom v6, ‘Switch’ is replaced by ‘Routes’.
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
 
const App = ()=> {
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API;
 
  const [progress, setProgress] = useState(0);


   
     return (
      <>
      {/* We will wrap the whole content in the inside the Router tag, to use React router */}
      <Router>
         <div>
           <NavBar />
           
           {/* Adding react top loading bar */}
            <LoadingBar
              color='#f11946'
              progress={progress}
            />

           {/* 👇️ Wrap your Route components in a Routes component */}
           <Routes>
            {/* 'exact path' : it will find the eaxt path of the url and we use only 'path="about"': it will check for the partial url */}
            {/* Key= "" is used for unique identification */}
             <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='in' category='general'/>}></Route>
             <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='in' category='general'/>}></Route>
             <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology"  pageSize={pageSize} country='in' category='technology'/>}></Route>
             <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country='in' category='sports'/>}></Route>
             <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country='in' category='science'/>}></Route>
             <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country='in' category='health'/>}></Route>
             <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country='in' category='entertainment'/>}></Route>
             <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country='in' category='business'/>}></Route>
           </Routes>
           
       </div>
      </Router>
      </>
     )
 }

 export default App
 