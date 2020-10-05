import { loanConstants } from '../constants';
import { toast } from 'react-toastify';

export const loanActions = {
	loanInfoRequest,
};

function loanInfoRequest(user) {

	return dispatch => {
		dispatch(request({ user }));
		toast.info("Recordes submited successfully", {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 5000,
		});
		
	};

	function request(user) {
		return { type: loanConstants.LOAN_INFO_REQUEST, user };
	}
	
}
