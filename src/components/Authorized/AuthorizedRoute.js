import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';

// TODO: umi只会返回render和rest
const AuthorizedRoute = (aaa) => {
  console.log('= ', aaa)
  const { component: Component, render, authority, redirectPath, ...rest } = aaa
  return (
    <Authorized
      authority={authority}
      noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
    >
      <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
    </Authorized>
  )
};

export default AuthorizedRoute;
