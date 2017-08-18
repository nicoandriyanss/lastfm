import axios from 'axios';

export const fetchSomething = (param) => (dispatch, getState) => {
  axios.get(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${param}&api_key=6850cb53b0c2198fbb3d4d16069ce92d&format=json`)
    .then((response) => {
      //console.log(response);
      if(response.data.message == "country param invalid"){
        dispatch({
          type: 'NOT_FOUND',
          payload: response.data,
        })
      } else {
        dispatch({
          type: 'GET_ARTIST',
          payload: response.data,
        })
      }
    
    })
    .catch((err)=>{
      //console.log(err);
      dispatch({
        type: 'ERROR_SEARCHING',
          payload: err,
      })
    })
}

export const getTopTrack = (param) => (dispatch, getState) => {
  axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${param}&api_key=6850cb53b0c2198fbb3d4d16069ce92d&format=json`)
    .then((response) => {
      //console.log(response);
      dispatch({
        type: 'GET_TRACK',
        payload: response.data,
      })
    })
    .catch((err)=>{
      //console.log(err);
      dispatch({
        type: 'ERROR_SEARCHING',
        payload: err,
      })
    })
}

export const searching = () => (dispatch, getState) => {
  dispatch({
    type: 'SEARCHING',
  })
}