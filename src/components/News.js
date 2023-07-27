import React from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { useState } from "react";

const News = (props)=> {

  const [articles ,setArticles] = useState([]);
  const [loading ,setLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // //using this we are changing the title of our page , whenevr we click on any category on th news app
  // document.title = `${capitalizeFirstLetter(props.category)} - NewSy`;
  
  //this function makes the 1st letter of word capital
  const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

   
   const updateNews = async ()=>{
    console.log("componentDidMount");
    props.setProgress(10);
    //this url is used to fetch the api
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    //we will set the loading as true whever we will hit the url, at that time only loading will occure
    props.setProgress(30);
    setLoading(true);
    //using the facth api , which return a 'promise' so we will use async - await and here we are fatcing the data from the url using fetch()
    let data = await fetch(url); // async function will wait till for this promise to complete its work and then it will give its data
    //we have to parse the data to json
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(70);
    //Now we will set the article with the parseData using this.setState
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
    props.setProgress(100);
  }

  useEffect(() => {
     updateNews();
  }, [])
  
   
  // const handlePrevClick = async()=>{
  //   console.log("previous");
  //   //setting the size of the page
  //   setpage(page-1);
  //   //instead of writing the whole function agin we build a common function updateNews()
  //   updateNews();
  // }

  // const handleNextClick = async()=>{
  //   console.log("next");
  //   setpage(page+1);
  //   updateNews();
  // }

  //Creating a fetch more function whih will help in infinte scroll , which will fetch the data
  const fetchMoreData = async () => {
    setpage(page+1)
       
    //this url is used to fetch the api
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
     
    //using the facth api , which return a 'promise' so we will use async - await and here we are fatcing the data from the url using fetch()
    let data = await fetch(url); // async function will wait till for this promise to complete its work and then it will give its data
    //we have to parse the data to json
    let parsedData = await data.json();
    //Now we will set the article with the parseData using this.setState
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
     
  };

  
    console.log("render");
    return (
      <> 
        
        <h1 className="text-center" style={{margin: "35px 0px"}}>NewSy- Top {capitalizeFirstLetter(props.category)} Headline</h1>
        {loading && <Spinner/>}

        {/* https://codesandbox.io/s/yk7637p62z?file=/src/index.js:309-554 */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading && <Spinner/>}
        >

          <div className="container">
            {/* Cretaing a row */}
            <div className="row">
              {/* // here .map is a higher order array and the prop elemnt contains all the key-value of the array articles  */}
              {/* when the loading is false then only whole article will be shown on the screen */}
              {articles.map((element)=>{
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
          <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={page+1 > Math.ceil(totalResults/(props.pageSize))} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}

       
      </>
    );
  }


News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes ={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News;
