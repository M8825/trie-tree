import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import raw from './names.txt';
const Trie = require('./trie');


class Wrapped extends React.Component {
	constructor(props){
  	super(props)
    this.state = {
    	results: []
    }
    
    this.search = this.search.bind(this);
  }

  search(results){
  	this.setState({results})
  }


	render(){
  	return (
      <div class="Search-box">
        <div class="Temp">
          <h1 class="Title">Trie Search:</h1>
        </div>
          <div class="Search-box__search">
            <Search onSearch={this.search} />
            // TODO: solve error handling on number input
            <Result {...this.state} />
          </div>
      </div>

    )
  }

}


class Search extends React.Component {
	constructor(props){
  	super(props);
    this.state = {
    	searchValue: '',
    }
    this.root = this._buildTrie();
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  static hasError(res=false) {
    return res;
  }

  _buildTrie() {
    let root = new Trie();  // initialize root node

    // fetch names from .txt file and create trie
    fetch(raw).then((r) => r.text()).then((text) => {
      text.split(/\r?\n/).forEach((name) => root.add(name));
    });

    return root;
  }


  
  // take care input values and query Trie
  handleOnChange(e){
  	this.setState({
    	[e.target.name]: e.target.value
    }, () => {
        let userInput = "";

        // we need input greater than zero to capitalize first letter of the input
        // all names in trie start with capital letter 


        if (this.state.searchValue.length > 0) {
          userInput = (this.state.searchValue[0].toUpperCase() + this.state.searchValue.slice(1))
        } 

        const results = this.root.search(userInput);
        if (Number(userInput[userInput.length - 1])) {
          Search.hasError(true);
        } else {
          this.props.onSearch(results) // call to a search method of trie class and pass user input
        }  
    })
  }


	render(){
  	return (
    	<div class="inp">
    	  <input name="searchValue" type="text" onChange={this.handleOnChange} />
    	</div>
    )
  }
}

// list search
const Result = ({results}) => {  
	return (
    <ul class="Results">
      {results.map(result => <li key={result}>{result}</li>)}
    </ul>

  )
}

if (Search.hasError) {
  const Error = () => {
    return (
      <span>Name contains only letters</span>
    )
  }
}

// Render page
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Wrapped/>
  </React.StrictMode>
);
reportWebVitals();
