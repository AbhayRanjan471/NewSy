import React, { Component } from "react";
import NewsItem from "../NewsItem";

export class News extends Component {

  articles= [
    {
    "source": {
    "id": "google-news",
    "name": "Google News"
    },
    "author": null,
    "title": "Amazon, Google, Apple, Meta, Microsoft say they meet EU ... - Reuters",
    "description": "Amazon, Google, Apple, Meta, Microsoft say they meet EU ...  Reuters",
    "url": "https://consent.google.com/ml?continue=https://news.google.com/rss/articles/CBMidGh0dHBzOi8vd3d3LnJldXRlcnMuY29tL3RlY2hub2xvZ3kvYW1hem9uLWdvb2dsZS1hcHBsZS1tZXRhLW1pY3Jvc29mdC1zYXktdGhleS1tZWV0LWV1LWdhdGVrZWVwZXItc3RhdHVzLTIwMjMtMDctMDQv0gEA?oc%3D5&gl=FR&hl=en-US&cm=2&pc=n&src=1",
    "urlToImage": null,
    "publishedAt": "2023-07-04T06:52:20Z",
    "content": "We use cookies and data to<ul><li>Deliver and maintain Google services</li><li>Track outages and protect against spam, fraud, and abuse</li><li>Measure audience engagement and site statistics to unde… [+1131 chars]"
    },
    {
    "source": {
    "id": null,
    "name": "The Guardian"
    },
    "author": "Presented by Max Rushden with Barry Glendenning and Nicky Bandini. Produced by Joel Grove and our executive producer is Danielle Stephens.",
    "title": "The life and times of Nicky Bandini – Football Weekly",
    "description": "Nicky Bandini joins Max Rushden and Barry Glendenning to discuss everything from Young Gunners bus trips to covering games at San SiroRate, review, share on Apple Podcasts, Soundcloud, Audioboom, Mixcloud, Acast and Stitcher, and join the conversation on Face…",
    "url": "https://www.theguardian.com/football/audio/2023/jul/04/the-life-and-times-of-nicky-bandini-football-weekly-podcast",
    "urlToImage": "https://i.guim.co.uk/img/media/20e03a09ac60a2ee49fa2cd2a0dfbf5e176554aa/754_374_2193_1316/master/2193.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=0a871295cc1275491f946abea8c6abeb",
    "publishedAt": "2023-07-04T04:00:51Z",
    "content": "Rate, review, share on Apple Podcasts, Soundcloud, Audioboom, Mixcloud, Acast and Stitcher, and join the conversation on Facebook, Twitter and email.\r\nOn todays special episode of Football Weekly, Ni… [+242 chars]"
    },
    {
    "source": {
    "id": null,
    "name": "The Guardian"
    },
    "author": "Josh Taylor",
    "title": "Instagram’s Threads app to launch 6 July as users leave Elon Musk’s Twitter",
    "description": "Interface of Meta’s app appears similar to Twitter, whose tweet viewing restrictions have driven users to join rival platforms BlueSky and MastodonMeta’s answer to Twitter, a new app called Threads, will launch on Thursday, just as users of the platform owned…",
    "url": "https://www.theguardian.com/technology/2023/jul/04/threads-app-instagram-twitter-competitor-meta-to-launch-rival",
    "urlToImage": "https://i.guim.co.uk/img/media/68cac9da9f57890cbb83e5e4d715c1fa7d2cf1e4/59_20_909_545/master/909.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=6b85efa9cb8ba294c8201ebd33ce59bd",
    "publishedAt": "2023-07-04T04:57:41Z",
    "content": "Metas answer to Twitter, a new app called Threads, will launch on Thursday, just as users of the platform owned by Elon Musk seek out alternatives in droves.\r\nA link for the Threads app, which is lin… [+3443 chars]"
    }]

  constructor(){
    // we have to call the super class whenevre we create a constructor else it will through error/
    super();
    console.log("Hello I m a constructor from News component");
    this.state ={
      articles: this.articles,
      loading: false
    }
  }
  
  render() {
    return (
      <div className="container my-3">
        <h2>NewSy- Top Headline</h2>
        {/* Cretaing a row */}
        <div className="row">
            {/* Cretaing some column inside the column to present the card */}
          <div className="col-md-4">
            <NewsItem title="my title" description="mydesc" imageUrl="https://techcrunch.com/wp-content/uploads/2022/05/GettyImages-1031626648.jpg?resize=1200,799" newsUrl="TODO"/>
          </div>
          <div className="col-md-4">
            <NewsItem title="my title" description="mydesc" />
          </div>
          <div className="col-md-4">
            <NewsItem title="my title" description="mydesc" />
          </div>
        </div>
      </div>
    );
  }
}

export default News;
