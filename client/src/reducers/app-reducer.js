import { CLOSE_ALLMENUS, TOGGLE_MENU, UPDATE_APP } from "actions/types";
//import {isEmpty} from '../../tools/isEmpty';
const initialState = {
	menu: '',
	menuState: 'closed',
	accMenuVisible: false,
	notifMenuVisible: false,
	sessionMenuVisible: false,
	signInMenuVisible: false,
	pulloutMenuVisible: false,
	messagesMenuVisible: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case UPDATE_APP:
			return {
				...state,
				...action.payload
			}
		case CLOSE_ALLMENUS:
			return {
				...state,
				...action.payload
			};
		case TOGGLE_MENU:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
}
