import { AUTH, LOGOUT } from '../actionTypes';

const authReducer = (state = {}, action) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
			return {
				...state,
				user: action.payload.user,
			};

		case LOGOUT:
			localStorage.clear('profile');
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

export default authReducer;
