import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container } from 'reactstrap';

import Datafetcher from './Datafetcher';

const Main = () => (
	<main>
		<Container>
			<Switch>
				<Route exact path='/' component={Datafetcher} />
				<Route exact path='/datafetcher' component={Datafetcher} />
			</Switch>
		</Container>
	</main>
)

export default Main;