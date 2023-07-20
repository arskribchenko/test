import { React } from "react";

import { Route, Redirect } from "react-router";

export default function GuardedRoute({
  component: Component,
  auth,
  redirect,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
}
