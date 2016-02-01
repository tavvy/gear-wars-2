import React from 'react';
import Sidebar from './Sidebar';

class App extends React.Component {
	render() {
		return (
			<div className="collapsible-container">
					<div className="row">
						<div className="hidden-sm-down col-md-2">
							<Sidebar />
						</div>
						<div className="col-xs-12 col-md-10">
							{this.props.children}
						</div>
					</div>
			</div>
		);
	}
}

export default App;