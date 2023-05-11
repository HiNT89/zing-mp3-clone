import { combineReducers } from 'redux';
import loginReducer from './containers/Login/reducer';
import globalReducer from './components/GlobalStyle/reducers';
const rootReducer = combineReducers({
    loginReducer,
    globalReducer,
});
export default rootReducer;
