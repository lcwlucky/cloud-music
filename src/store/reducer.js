import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../views/Recommend/store'
import { reducer as singersReducer } from '../views/Singers/store';
import { reducer as rankReducer } from '../views/Rank/store';
import { reducer as albumReducer } from '../views/Album/store';
import { reducer as singerInfoReducer } from '../views/Singer/store'
import { reducer as playerReducer } from "../views/Player/store";
import { reducer as searchReducer } from "../views/Search/store";


export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
  player: playerReducer,
  search: searchReducer
});