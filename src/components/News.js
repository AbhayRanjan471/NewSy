import React, { Component } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
  
  //this function makes the 1st letter of word capital
  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    // we have to call the super class whenevre we create a constructor else it will through error/
    super(props);
    console.log("Hello I m a constructor from News component");
    this.state ={
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    //using this we are changing the title of our page , whenevr we click on any category on th news app
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewSy`;
  }

  async updateNews(pageNo){
    console.log("componentDidMount");
    this.props.setProgress(10);
    //this url is used to fetch the api
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //we will set the loading as true whever we will hit the url, at that time only loading will occure
    this.props.setProgress(30);
    this.setState({loading: true});
    //using the facth api , which return a 'promise' so we will use async - await and here we are fatcing the data from the url using fetch()
    let data = await fetch(url); // async function will wait till for this promise to complete its work and then it will give its data
    //we have to parse the data to json
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(70);
    //Now we will set the article with the parseData using this.setState
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  // componentDidMount is a life cycle method
  async componentDidMount(){
    console.log("componentDidMount");
    // //this url is used to fetch the api
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e01be2e8ee9423a9fc0875c304e100f&page=1&pageSize=${this.props.pageSize}`;
    // //we will set the loading as true whever we will hit the url, at that time only loading will occure
    // this.setState({loading: true});
    // //using the facth api , which return a 'promise' so we will use async - await and here we are fatcing the data from the url using fetch()
    // let data = await fetch(url); // async function will wait till for this promise to complete its work and then it will give its data
    // //we have to parse the data to json
    // let parsedData = await data.json();
    // console.log(parsedData);
    // //Now we will set the article with the parseData using this.setState
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })

    this.updateNews();

  }

   handlePrevClick = async()=>{
    console.log("previous");

    //setting the size of the page
    this.setState({page: this.state.page-1});
    //instead of writing the whole function agin we build a common function updateNews()
    this.updateNews();
   
  }

   handleNextClick = async()=>{
    console.log("next");

    this.setState({page: this.state.page+1});
    this.updateNews();

  }

  //Creating a fetch more function whih will help in infinte scroll , which will fetch the data
  fetchMoreData = async () => {
    
      this.setState({
         page: this.state.page + 1
      });
      
      
    //this url is used to fetch the api
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     
    //using the facth api , which return a 'promise' so we will use async - await and here we are fatcing the data from the url using fetch()
    let data = await fetch(url); // async function will wait till for this promise to complete its work and then it will give its data
    //we have to parse the data to json
    let parsedData = await data.json();
    //Now we will set the article with the parseData using this.setState
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults  
    })

  };

  render() {
    console.log("render");
    return (
      <> 
       {/* <div className="container my-3"> */}
        <h1 className="text-center" style={{margin: "35px 0px"}}>NewSy- Top {this.capitalizeFirstLetter(this.props.category)} Headline</h1>
        {this.state.loading && <Spinner/>}

        {/* https://codesandbox.io/s/yk7637p62z?file=/src/index.js:309-554 */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

          <div className="container">
            {/* Cretaing a row */}
            <div className="row">
              {/* // here .map is a higher order array and the prop elemnt contains all the key-value of the array articles  */}
              {/* when the loading is false then only whole article will be shown on the screen */}
              { this.state.articles.map((element)=>{
              //Cretaing some column inside the row to present the card 
              //  we have to give a unique 'key' , while returning else it will thorugh error
                return<div className="col-md-4" key={element.url}>
                        <NewsItem  title={element.title==null? "" : element.title} description={element.description==null? "" : element.description} imageUrl=
                        {element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                      </div>
              })}             
            </div>
          </div>
  
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/(this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

      {/* </div> */}
      </>
    );
  }
}

export default News;
