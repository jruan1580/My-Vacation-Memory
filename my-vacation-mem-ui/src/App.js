import NavigationBar from "./NavigationBar";
import Container from "react-bootstrap/Container";
import Home from "./Home";

function App() {
  return (
    <>
      <NavigationBar />
      <Container>
        <Home />                  
      </Container>
    </>    
  );
}

export default App;
