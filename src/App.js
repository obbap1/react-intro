import React, { Component } from "react";
import "./App.css";

const Twitter = ({author, quote}) => {
  const link = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(quote)}${encodeURIComponent(author)}`
	return (
    <a href={link}>
      <button className="divButton" style={{float: 'left'}}>
        Tweet
      </button>
    </a>
  );
};

const ErrorHandler = ({error}) =>{
  return alert(error)
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { tweet: {}, quotes:[] };
		this.fetchNewQuote = this.fetchNewQuote.bind(this);
	}

	async componentDidMount() {
    const res = await fetch(
			"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );

    const {quotes} = await res.json();

    if(quotes) {
      this.setState({quotes: [...quotes]});
      this.fetchNewQuote()
    } else{
      return <ErrorHandler error="Nothing Was fetched!" />
    }
  }

	fetchNewQuote() {
    const randomNumber = Math.floor(Math.random() * this.state.quotes.length);
    const newTweet = this.state.quotes[randomNumber];
    this.setState({tweet: Object.assign({}, newTweet)})
	}

	render() {
    const {author, quote} = this.state.tweet;
		return (
			<div className="App">
        <div className="quoteBox">
          <p>"{quote}"</p>
          {this.state.quotes.length > 0 && <span>- {author}</span>}
        </div>
				
				<div>
					<button style={{float: 'right'}} className="divButton" onClick={this.fetchNewQuote}>
						New Quote
					</button>
					<Twitter {...this.state.tweet} />
				</div>
			</div>
		);
	}
}
export default App;
