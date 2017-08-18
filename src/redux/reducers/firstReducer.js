const initialState = {
  error: '',
  warning: '',
  lastfm: [],
  track: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ERROR_SEARCHING': {
      return {
        ...state, error: action.payload,
      }
    }
    case 'GET_ARTIST': {
      return {
        ...state, lastfm: action.payload.topartists.artist,
      }
    }
    case 'GET_TRACK': {
      return {
        ...state, track: action.payload.toptracks.track,
      }
    }
    case 'NOT_FOUND': {
      return {
        ...state, warning: action.payload.message,
      }
    }
    case 'SEARCHING': {
      return {
        ...state, warning: '', lastfm: [],
      }
    }

    default: {
      return state;
    }
  }
}