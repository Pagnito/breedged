import { combineReducers } from 'redux';
import SessionReducer from 'reducers/session-reducer';
import SessionsReducer from 'reducers/sessions-reducer';
import AuthReducer from 'reducers/auth-reducer';
import DeviceReducer from 'reducers/devices-reducer';
import DashboardReducer from 'reducers/dashboard-reducer';
import AppReducer from 'reducers/app-reducer';
import DmsReducer from 'reducers/dms-reducer';
import SurklReducer from 'reducers/surkl-reducer';
import NotifReducer from 'reducers/notif-reducer';
export default combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  session: SessionReducer,
  sessions: SessionsReducer,
  devices: DeviceReducer,
  dashboard: DashboardReducer,
  dms: DmsReducer,
  surkl: SurklReducer,
  notifs: NotifReducer
});
