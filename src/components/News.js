import React, { Component } from "react";
import NewsItem from "../NewsItem";

export class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>NewSy- Top Headline</h2>
        {/* Cretaing a row */}
        <div className="row">
            {/* Cretaing some column inside the column to present the card */}
          <div className="col-md-4">
            <NewsItem title="my title" description="mydesc" />
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
