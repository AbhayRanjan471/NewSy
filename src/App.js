// import logo from './logo.svg';
import './App.css';

//write 'rcc' to import the class base components
 import React, { Component } from 'react'
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
 
 export default class App extends Component {
  pageSize = 6;
   render() {
     return (
      <>
      {/* We will wrap the whole content in the inside the Router tag, to use React router */}
      <Router>
         <div>
           <NavBar/>

           {/* 👇️ Wrap your Route components in a Routes component */}
           <Routes>
            {/* 'exact path' : it will find the eaxt path of the url and we use only 'path="about"': it will check for the partial url */}
            {/* Key= "" is used for unique identification */}
             <Route exact path="/" element={<News key="general" pageSize={this.pageSize} country='in' category='general'/>}></Route>
             <Route exact path="/general" element={<News key="general" pageSize={this.pageSize} country='in' category='general'/>}></Route>
             <Route exact path="/technology" element={<News key="technology"  pageSize={this.pageSize} country='in' category='technology'/>}></Route>
             <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} country='in' category='sports'/>}></Route>
             <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} country='in' category='science'/>}></Route>
             <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} country='in' category='health'/>}></Route>
             <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country='in' category='entertainment'/>}></Route>
             <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} country='in' category='business'/>}></Route>
           </Routes>
              
       </div>
      </Router>
      </>
     )
   }
 }
 