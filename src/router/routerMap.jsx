import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';

import getComponent from '../components/common/getComponent';
import App from '../containers/App';
import Header from '../components/Header';


const routes = [
	{ 
        path: '/',
		exact: true,
		component: App
	},
	{ 
        path: '/counter',
		exact: false,
		component: (props) => getComponent(props, () => import('../containers/Counter'))
	},
	{ 
        path: '/time',
		exact: false,
		component: (props) => getComponent(props, () => import('../containers/Time'))
	},
	{ 
        path: '/route',
		exact: false,
		component: (props) => getComponent(props, () => import('../containers/RouteBack'))
	},
	{ 
        path: '/404',
		exact: false,
		component: (props) => getComponent(props, () => import('../containers/NotFoundPage'))
	}
];

const Router = process.env.NODE_ENV == 'production' ? BrowserRouter : HashRouter;
const RouterMap = ({ history }) => (
    <Router hisroty={history}>
        <div>
            <Header />
            <Switch>
                {
                    routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    ))
                }
            </Switch>
        </div>
    </Router>
)

export default RouterMap;