import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSomething, searching } from '../../redux/actions';
import ReactLoading from 'react-loading';

import { Link } from 'react-router-dom';
import './styles.css';

class Page1 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      country: '',
      currentPage: 1,
      artistPerPage: 5,
      component: (<p>Please enter a country name</p>),
    };
  }

  componentWillMount(){
    
  }
  componentDidMount(){
    
  }
  inputCountry(event){
    this.setState({country: event.target.value});
  }
  onSubmit(){
    this.props.dispatchSearching();
    this.props.dispatchFetchSomething(this.state.country);
    this.setState({component: (<ReactLoading className="loading" type="bars" color="#444"/>)});
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render(){
    const { currentPage, artistPerPage } = this.state;

    // Logic for displaying current track
    const indexOfLastArtist = currentPage * artistPerPage;
    const indexOfFirstArtist = indexOfLastArtist - artistPerPage;
    const currentArtist = this.props.first.lastfm.slice(indexOfFirstArtist, indexOfLastArtist);

    const renderArtist = currentArtist.map((item, index) => {
      return (
        <div key={index}>
          <Link to={{pathname: process.env.PUBLIC_URL + '/artist', state: item.name}}>
          <img className="thumbnail" src={item.image[2]['#text']}/>
          </Link>
          <p>{item.name}</p>
        </div>
      );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.first.lastfm.length / artistPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick.bind(this)}
        >
          {number}
        </li>
      );
    });

    return (
      <div className="page1">
        <p className="country">Search by Country here</p>
        <input className="input" type="text" onChange={this.inputCountry.bind(this)}/>
        <button className="submit" onClick={()=>this.onSubmit()}>Submit</button>
        <h1>Top Artist</h1>
        <div className="left">
        {
          this.props.first.lastfm.length ? (
            <div>
              {renderArtist}
              <ul id="page-numbers">
                {renderPageNumbers}
              </ul>
            </div>
          ) : 
          this.props.first.warning !== "country param invalid" ? this.state.component : (<p>Country not found</p>)
        }
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state)=> {
  return {
    first: state.FirstState,
  }
}

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchFetchSomething: fetchSomething,
    dispatchSearching: searching,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Page1);