import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

import { Row, Col, Table } from 'reactstrap';

var config = require('../config/server.js');


const apiBaseUrl = `http://${config.API_SERVER_HOST}:${config.API_SERVER_PORT}/api/`;
console.log(apiBaseUrl)



class Datafetcher extends Component {

	constructor() {
		super();
		this.state = {
			data: [],
			latestUpdateDate: 0
		}
	}

	componentDidMount() {
		var self = this;

		// Fetch securities, their OHVC and date of most recent data
		fetch(apiBaseUrl + 'securitiesLatestUpdate')
		.then(res => res.json())
		.then(json => {
			self.setState({data: json})
		})
		
		// Fetch latest date of price update
		fetch(apiBaseUrl + 'latestUpdateDate')
		.then(res => res.json())
		.then(json => {
			self.setState({latestUpdateDate: json['latestDate']})
		})
		
	}

	render() {
		return (
			<div>
			<Row>
				<Col xs={12}>
					<h1>Latest Daily Price Updates</h1>

					<p>Latest Update: <strong><Moment format="ddd MMM DD YYYY">{this.state.latestUpdateDate}</Moment></strong></p>
					<p>Total securities: <strong>{ this.state.data.length }</strong></p>

					<Table striped>
						<thead>
							<tr>
								<th>Security</th>
								<th>Date</th>
								<th>O</th>
								<th>H</th>
								<th>L</th>
								<th>C</th>
								<th>V</th>
							</tr>
						</thead>
						<tbody>
							{ 
								this.state.data.map(function(item, key) {
									return (
										<tr key={key}>
											<td>{ item.symbol }</td>
											<td>
												<Moment format="YYYY-MM-DD, ddd" tz="America/New_York">
													{ item.date }
												</Moment>
											</td>
											<td>{ item.open }</td>
											<td>{ item.high }</td>
											<td>{ item.low }</td>
											<td>{ item.close }</td>
											<td>{ item.volume }</td>
										</tr>
									)
								})
							}
						</tbody>

					</Table>
				</Col>
			</Row>
			</div>
		)
	}

}



export default Datafetcher;