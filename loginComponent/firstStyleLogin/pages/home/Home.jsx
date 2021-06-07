import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from './routes';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { match } = this.props;
        const { path: currentPath } = match;

        return (
            <div>
                <Switch>
                    {<Redirect exact from={currentPath} to={currentPath + '/' + routes[0].path} />}
                    {routes.map(item => {
                        const { path, component: Component, ...rest } = item;
                        return <Route key={path} path={currentPath + '/' + path} {...rest} render={props => <Component {...props} />} />;
                    })}
                </Switch>
            </div>
        );
    }
}

Home.propTypes = {
    match: PropTypes.object
};