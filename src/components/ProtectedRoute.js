import { Route, Redirect } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ProtectedRoute({ component: Component, ...props }) {
  /*props.loggedIn*/
  /*  <Redirect to="/sing-in"/> */
  return <Route>{() => <Component {...props} />}</Route>;
}

export default ProtectedRoute;
