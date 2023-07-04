// import logo from './logo.svg';
import './App.css';

//write 'rcc' to import the class base components
 import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
// import NavBar from './components/NavBar';
 
 export default class App extends Component {
   render() {
     return (
       <div>
           <NavBar/>
           <News/>
       </div>
     )
   }
 }
 