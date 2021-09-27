import NavigationBar from "./NavigationBar";
import Container from "react-bootstrap/Container";
import Home from "./Home";
import TripDetails from "./TripDetails";

function App() {
  return (
    <>
      <NavigationBar />
      <Container>
        {/* <Home />                   */}
        <TripDetails />
      </Container>
    </>    
  );
}

export default App;
