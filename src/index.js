import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
const  Trie = require('./trie.js');



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
  	const { results } = this.state
  	return (
      <div class="Search-box">
        <div class="Temp">
          <h1>Trei Search:</h1>
        </div>
          <div class="Search-box__search">
            <Search onSearch={this.search} />
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
    	searchValue: ''
    }
    this.root = this._buildTrie();
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  _buildTrie() {
    let root = new Trie();
    let names = [
        'malkhaz',
        'malo',
        'mal',
        'meg',
        'peter',
        'louis',
        'stevie',
        'jonathan',
        'jon',
        'john',
        'david',
        'dave',
        'daniel',
        'lory',
        'larry',
        'linux',
        'cornel',
        'manny'
    ]
  
      for (let i = 0; i < names.length; i++) {
          root.add(names[i]);
      }

      return root;
  }
  

  // Take care input values and querie Trie
  handleOnChange(e){
  	this.setState({
    	[e.target.name]: e.target.value
    }, () => {
    	setTimeout(() => {

        const results = this.root.search(this.state.searchValue);
        this.props.onSearch(results)
      }, 1000)
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

// Render page
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Wrapped/>
  </React.StrictMode>
);
reportWebVitals();
