import "./App.scss";
import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login/Login";
function App() {
    return (
        <Router>
            <div className="app-container">
                <Nav />
                <Switch>
                    <Route path="/about">about </Route>
                    <Route path="/users">users </Route>
                    <Route path="/" exact>
                        home
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="*">404 not found</Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
