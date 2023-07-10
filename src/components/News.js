import React, { Component } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes ={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
   
  constructor(){
    // we have to call the super class whenevre we create a constructor else it will through error/
    super();
    console.log("Hello I m a constructor from News component");
    this.state ={
      articles: [],
      loading: true,
      page: 1
    }
  }

  // componentDidMount is a life cycle method
  async componentDidMount(){
    console.log("componentDidMount");
    //this url is used to fetch the api
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e01be2e8ee9423a9fc0875c304e100f&page=1&pageSize=${this.props.pageSize}`;
    //we will set the loading as true whever we will hit the url, at that time only loading will occure
    this.setState({loading: true});
    //using the facth api , which return a 'promise' so we will use async - await and here we are fatcing the data from the url using fetch()
    let data = await fetch(url); // async function will wait till for this promise to complete its work and then it will give its data
    //we have to parse the data to json
    let parsedData = await data.json();
    console.log(parsedData);
    //Now we will set the article with the parseData using this.setState
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })

  }

   handlePrevClick = async()=>{
    console.log("previous");

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e01be2e8ee9423a9fc0875c304e100f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`; 
    //we will set the loading as true whever we will hit the url, at that time only loading will occure
    this.setState({loading: true});
    let data = await fetch(url); // async function will wait till for this promise to complete its work and then it will give its data
    let parsedData = await data.json();  
    
    this.setState({
      articles: parsedData.articles,
      page: this.state.page-1,
      loading: false
    })
   
  }
   handleNextClick = async()=>{
    console.log("next");

    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e01be2e8ee9423a9fc0875c304e100f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`; 
      //we will set the loading as true whever we will hit the url, at that time only loading will occure
      this.setState({loading: true});
      let data = await fetch(url); // async function will wait till for this promise to complete its work and then it will give its data
      let parsedData = await data.json();  
      
      this.setState({
        articles: parsedData.articles,
        page: this.state.page+1,
        //when we got the data we will set the loading as false
        loading: false
      })
    }
    
  }

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: "35px 0px;"}}>NewSy- Top Headline</h1>
        {this.state.loading && <Spinner/>}

        {/* Cretaing a row */}
        <div className="row">

          {/* // here .map is a higher order array and the prop elemnt contains all the key-value of the array articles  */}
          {/* when the loading is false then only whole article will be shown on the screen */}
          {!this.state.loading && this.state.articles.map((element)=>{
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
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/(this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
