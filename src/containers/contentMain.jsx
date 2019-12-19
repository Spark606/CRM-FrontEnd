import React from 'react';
import {HashRouter as Router,Route, Switch} from 'react-router-dom';
import ClientsTable from './clients';
import FirmsTable from './firms';
import OrderTable from './order';
import Personal from './personal';
import TodoPage from './todo';
import EmployeeTable from './employee';
import Salary from './salary';
import Workspace from './workspace';
class ContentMain extends React.Component {
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route exact path='/main/todo' component={TodoPage}/>
						<Route exact path='/main/client' component={ClientsTable}/>
						<Route exact path='/main/firms' component={FirmsTable}/>
						<Route exact path='/main/order' component={OrderTable}/>
						<Route exact path='/main/personal' component={Personal}/>
						<Route exact path='/main/employee' component={EmployeeTable}/>
						<Route exact path='/main/salary' component={Salary}/>
						<Route exact path='/main/workspace' component={Workspace}/>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default ContentMain