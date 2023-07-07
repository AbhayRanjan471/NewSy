import React, { Component } from "react";
import NewsItem from "../NewsItem";

export class News extends Component {

   
  constructor(){
    // we have to call the super class whenevre we create a constructor else it will through error/
    super();
    console.log("Hello I m a constructor from News component");
    this.state ={
      articles: [],
      loading: false,
      page: 1
    }
  }

  // componentDidMount is a life cycle method
  async componentDidMount(){
    console.log("componentDidMount");
    //this url is used to fetch the api
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=8e01be2e8ee9423a9fc0875c304e100f&page=1&pageSize=10";
    //using the facth api , which return a 'promise' so we will use async - await and here we are fatcing the data from the url using fetch()
    let data = await fetch(url); // async function will wait till for this promise to complete its work and then it will give its data
    //we have to parse the data to json
    let parsedData = await data.json();
    console.log(parsedData);
    //Now we will set the article with the parseData using this.setState
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults
    })

  }

   handlePrevClick = async()=>{
    console.log("previous");

    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=8e01be2e8ee9423a9fc0875c304e100f&page=${this.state.page-1}&pageSize=10`; 
    let data = await fetch(url); // async function will wait till for this promise to complete its work and then it will give its data
    let parsedData = await data.json();  
    
    this.setState({
      articles: parsedData.articles,
      page: this.state.page-1
    })
   
  }
   handleNextClick = async()=>{
    console.log("next");

    if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=8e01be2e8ee9423a9fc0875c304e100f&page=${this.state.page+1}&pageSize=20`; 
      let data = await fetch(url); // async function will wait till for this promise to complete its work and then it will give its data
      let parsedData = await data.json();  
      
      this.setState({
        articles: parsedData.articles,
        page: this.state.page+1
      })
    }
   
  }

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1>NewSy- Top Headline</h1>

        {/* Cretaing a row */}
        <div className="row">

          {/* // here .map is a higher order array and the prop elemnt contains all the key-value of the array articles  */}
          {this.state.articles.map((element)=>{
           //Cretaing some column inside the row to present the card 
          //  we have to give a unique 'key' , while returning else it will thorugh error
            return<div className="col-md-4" key={element.url}>
                    <NewsItem  title={element.title==null? "" : element.title} description={element.description==null? "" : element.description} imageUrl=
                    {element.urlToImage} newsUrl={element.url}/>
                  </div>
           })}
                      
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
