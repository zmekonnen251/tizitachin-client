import axios from 'axios';
import Cookies from 'js-cookie';
import store from './redux/store';

const apiEndPoint = 'https://tizitachin-api.onrender.com/api';

// export const API = axios.create({
// 	baseURL: apiEndPoint,
// });

const API = axios.create(
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

API.interceptors.request.use(async (req) => {
	const data = Cookies.get('access-token');
	const { auth } = store.getState();
	const { token } = auth;

	if (!token) return req;

	req.headers.Authorization = `Bearer ${token}`;

	return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts/?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
	API.get(
		`/posts/search?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${
			searchQuery.tags
		}`
	);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) =>
	API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
	API.post(`/posts/${id}/commentPost`, { value });
export const signIn = (formData) => API.post(`/users/signin`, formData);
export const signUp = (formData) => API.post(`/users/signup`, formData);
export const signOut = () => API.get(`/users/signout`);
export const signInWithGoogle = (tokenId) =>
	API.post(`/users/google`, { tokenId });

export const verifyEmail = (id, token) =>
	API.get(`/users/${id}/confirmation/${token}`);
