import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import SettingsPage from "./components/pages/SettingsPage";
import { siteTitle } from "./config/uiconfig";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage title={siteTitle} />
        </Route>
        <Route exact path="/settings">
          <SettingsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
