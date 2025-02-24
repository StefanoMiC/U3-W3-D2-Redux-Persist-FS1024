import { Col, Row } from "react-bootstrap";
import BookList from "./BookList";
import BookDetail from "./BookDetail";

const BookStore = () => {
  return (
    <Row className="center-row">
      <Col lg={4}>
        <BookList />
      </Col>
      <Col lg={8}>
        <BookDetail />
      </Col>
    </Row>
  );
};

export default BookStore;
