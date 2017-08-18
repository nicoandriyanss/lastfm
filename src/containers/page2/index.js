import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTopTrack } from '../../redux/actions';
import ReactLoading from 'react-loading';

import './styles.css';

class Page2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      trackPerPage: 5
    }
  }
  componentWillMount(){
    this.props.dispatchGetTopTrack(this.props.location.state);
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { currentPage, trackPerPage } = this.state;

    // Logic for displaying current track
    const indexOfLastTrack = currentPage * trackPerPage;
    const indexOfFirstTrack = indexOfLastTrack - trackPerPage;
    const currentTrack = this.props.first.track.slice(indexOfFirstTrack, indexOfLastTrack);

    const renderTracks = currentTrack.map((item, index) => {
      return <p key={index}>{item.name}</p>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.first.track.length / trackPerPage); i++) {
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
      <div className="page3">
        <h1>{this.props.location.state}</h1>
        <h3>Top Tracks</h3>
        {
          this.props.first.track.length ? (
            <div>
              {renderTracks}
              <ul id="page-numbers">
                {renderPageNumbers}
              </ul>
            </div>
          ) : (
            <ReactLoading className="loading" type="bars" color="#444"/>
          )
        }
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
    dispatchGetTopTrack: getTopTrack,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Page2);
