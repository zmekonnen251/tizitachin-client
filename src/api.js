import axios from 'axios';
import { refreshToken as refresh } from './redux/actions/auth';
import store from './redux/store';
// import decode from 'jwt-decode';
const apiEndPoint = '/api';

export const API = axios.create({
	baseURL: apiEndPoint,
});

const privateAPI = axios.create(
	{
		baseURL: apiEndPoint,
	},
	{
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
		},
	}
);

privateAPI.interceptors.request.use(async (req) => {
	const profile = JSON.parse(localStorage.getItem('profile'));

	if (!profile || !profile.accessToken) return req;

	// const decodedToken = decode(profile.accessToken);

	// if (decodedToken.exp * 1000 < new Date().getTime()) {
	// 	console.log('refreshing token');
	// 	store.dispatch(refresh());

	// 	const newProfile = JSON.parse(localStorage.getItem('profile'));
	// 	req.headers.Authorization = `Bearer ${newProfile.accessToken}`;
	// 	return req;
	// }

	req.headers.Authorization = `Bearer ${profile.accessToken}`;

	return req;
});

privateAPI.interceptors.response.use(
	(res) => res,
	(error) => {
		if (
			error.response.status === 401 &&
			error.response.data.message === 'jwt expired'
		) {
			store.dispatch(refresh());
		} else if (error.response.status === 401) {
			localStorage.clear();
			store.dispatch({ type: 'LOGOUT' });
			window.location.reload('/auth');
		}
		return Promise.reject(error);
	}
);

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts/?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
	API.get(
		`/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${
			searchQuery.tags
		}`
	);
export const createPost = (newPost) => privateAPI.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>
	privateAPI.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => privateAPI.delete(`/posts/${id}`);
export const likePost = (id) => privateAPI.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
	privateAPI.post(`/posts/${id}/commentPost`, { value });
export const signIn = (formData) => API.post(`/users/signin`, formData);
export const signUp = (formData) => privateAPI.post(`/users/signup`, formData);
export const signOut = () => privateAPI.get(`/users/signout`);
export const signInWithGoogle = (tokenId) =>
	API.post(`/users/google`, { tokenId });

export const verifyEmail = (id, token) =>
	API.get(`/users/${id}/confirmation/${token}`);

export const refreshToken = () => privateAPI.get('/users/refresh');
