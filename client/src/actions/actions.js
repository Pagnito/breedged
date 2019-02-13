import {
	SET_USER,
	GET_USER,
	START_SESSION,
	JOIN_SESSION,
	GET_SESSIONS,
	GET_DEVICES,
	UPDATE_SESSION,
	SEND_VIDEO,
	NEW_ADMIN,
	UNPICK_VIDEO,
	SEND_TWEET
} from 'actions/types';
import axios from 'axios';
export const getUser = () => (dispatch) => {
	axios
		.get('/account')
		.then((data) => {
			dispatch({
				type: GET_USER,
				payload: data.data
			});
		})
		.catch((err) => {
			console.log(err, 'yoooo');
			dispatch({
				type: GET_USER,
				payload: {}
			});
		});
};
export const getSessions = () => (dispatch) => {
	fetch('/api/sessions').then((data) => data.json()).then((sessions) => {
		let rooms = [];
		for (let room in sessions) {
			rooms.push(JSON.parse(sessions[room]));
		}
		dispatch({
			type: GET_SESSIONS,
			payload: rooms
		});
	});
};

export const getDevices = () => (dispatch) => {
	let cams = [];
	let mics = [];
	navigator.mediaDevices.enumerateDevices().then((devices) => {
		devices.forEach((device) => {
			if (device.kind === 'videoinput') {
				cams.push(device);
			} else if (device.kind === 'audioinput') {
				mics.push(device);
			}
		});
		let deviceObj = {
			mics: mics,
			cams: cams
		};
		dispatch({
			type: GET_DEVICES,
			payload: deviceObj
		});
	});
};
export const signUpOrLogin = (user, cb) => (dispatch) => {
	let options = {
		method: 'POST',
		mode: 'cors',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8'
		},
		body: user
	};
	fetch('/auth/login', options)
		.then((res) => res.json())
		.then((user) => {
			dispatch({
				type: SET_USER,
				payload: user
			});
			cb();
		})
		.catch(() => {
			dispatch({
				type: SET_USER,
				payload: {}
			});
		});
};
export const startSession = (sessionInfo, cb) => (dispatch) => {
	dispatch({
		type: START_SESSION,
		payload: sessionInfo
	});
	cb();
};
export const joinSession = (sessionInfo, cb) => (dispatch) => {
	dispatch({
		type: JOIN_SESSION,
		payload: sessionInfo
	});
	cb();
};
export const updateSession = (payload) => (dispatch) => {
	dispatch({
		type: UPDATE_SESSION,
		payload: payload
	});
};
export const newAdmin = () => (dispatch)=>{
	dispatch({
		type: NEW_ADMIN,
		payload: {
			isAdmin: true
		}
	})
}
export const sendTweetAction = (tweetObj) => (dispatch)=>{
	dispatch({
		type:SEND_TWEET,
		payload:tweetObj
	})
}
export const sendThisVideoAction = (playState) => (dispatch)=>{
	dispatch({
		type:SEND_VIDEO,
		payload:playState
	})
}
export const unpickThisVideoAction = (playState) => (dispatch)=>{
	dispatch({
		type:UNPICK_VIDEO,
		payload:playState
	})
}

