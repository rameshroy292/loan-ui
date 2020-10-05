import { combineReducers } from 'redux';

import { loanInfoRequest } from './loan.reducer';
const rootReducer = combineReducers({
    loanInfoRequest,

});
export default rootReducer;