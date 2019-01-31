import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { GET_USER } from 'actions/types';
import { Route, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from '../store';
import Home from 'components/Home';
import Dashboard from 'components/Dashboard';
import Session from 'components/Session';
import Rooms from 'components/Rooms';
import Header from 'components/Header/Header';


/*const Loading = () => Loader;

const Entries = Loadable({
  loader: () => import('./entries'),
  loading: Loading(),
});*/

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
	}

	componentDidMount() {
		fetch('/account').then((res) => res.json()).then((user) =>{
			Store.dispatch({
				type: GET_USER,
				payload: user
			})
			//this.props.history.push('/rooms')
		});
	}

	render() {
		return (
			<Provider store={Store}>	
				<Header />
				<Route exact path="/" component={Home}  />
        <Route exact path="/dashboard" component={Dashboard}  />
				<Route exact path="/session" component={Session}  />
				<Route exact path="/rooms" component={Rooms}  />
			</Provider>
		);
	}
}
App.propTypes = {
	getUser: PropTypes.func,
	history: PropTypes.object
};
export default withRouter(App);
