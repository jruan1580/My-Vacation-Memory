import NavigationBar from "./NavigationBar";
import Container from "react-bootstrap/Container";
import Home from "./Home";
import TripDetails from "./TripDetails";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Container>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/trip/:id" children={ <TripDetails /> }></Route>
          </Switch>
        </Container>
        
      </Router>
      
    </>    
  );
}

export default App;
