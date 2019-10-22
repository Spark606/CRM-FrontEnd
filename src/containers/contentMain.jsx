import React from 'react';
import {HashRouter as Router,Route, Switch} from 'react-router-dom';
import ClientsTable from './clients/table';
import ClientsNew from './clients/new';
import FirmsTable from './firms/table';
import FirmsNew from './firms/new';
import AccountTable from './account/table';
import AccountNew from './account/new';
import Personal from './personal';
class ContentMain extends React.Component {
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route exact path='/main/client/table' component={ClientsTable}/>
						<Route exact path='/main/client/new' component={ClientsNew}/>
						<Route exact path='/main/firms/table' component={FirmsTable}/>
						<Route exact path='/main/firms/new' component={FirmsNew}/>
						<Route exact path='/main/account/table' component={AccountTable}/>
						<Route exact path='/main/account/new' component={AccountNew}/>
						<Route exact path='/main/personal' component={Personal}/>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default ContentMain