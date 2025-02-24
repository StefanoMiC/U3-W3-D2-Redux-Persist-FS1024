import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import BookStore from "./components/BookStore";
import Cart from "./components/Cart";
import Container from "react-bootstrap/Container";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";

const App = () => (
  <BrowserRouter>
    <Container className="epizon-container">
      <TopBar />
      <Routes>
        <Route path="/" element={<BookStore />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer additionalProp="Epicode" />
    </Container>
  </BrowserRouter>
);

export default App;
