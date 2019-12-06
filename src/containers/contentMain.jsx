import React from 'react';
import {HashRouter as Router,Route, Switch} from 'react-router-dom';
import ClientsTable from './clients/table';
import FirmsTable from './firms/table';
import OrderTable from './order/table';
import Personal from './personal';
import TodoPage from './todo';
class ContentMain extends React.Component {
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route exact path='/main/todo' component={TodoPage}/>
						<Route exact path='/main/client/table' component={ClientsTable}/>
						<Route exact path='/main/firms/table' component={FirmsTable}/>
						<Route exact path='/main/order/table' component={OrderTable}/>
						<Route exact path='/main/personal' component={Personal}/>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default ContentMain