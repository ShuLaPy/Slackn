import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import App from "../components/App";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Spinner from "../components/Spinner";
import firebase from "../firebase";
import { clearUser, setUser } from "../redux/actions/action";

function AppRouter() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const { loading } = user;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
        history.push("/");
      } else {
        dispatch(clearUser());
        history.push("/login");
      }
    });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
}

export default AppRouter;
