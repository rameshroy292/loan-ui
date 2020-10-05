import { loanConstants } from '../constants';

export function loanInfoRequest(state = {}, action) {
	let tempArray = [];
	if(state.loanInfo)
	tempArray = state.loanInfo
	if(action.user)
	tempArray.push(action.user.user)

	switch (action.type) {
		case loanConstants.LOAN_INFO_REQUEST:
			return { ...state,
				loanInfo: tempArray, };
		
		default:
			return state;
	}
}