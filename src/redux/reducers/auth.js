import { AUTH, LOGOUT } from '../actionTypes';

const authReducer = (state = {}, action) => {
	switch (action.type) {
		case AUTH:
			return {
				...state,

				user: action.payload.user,
				token: action.payload.accessToken,
			};

		case LOGOUT:
			return {
				...state,
				user: null,
				token: null,
			};
		default:
			return state;
	}
};

export default authReducer;
