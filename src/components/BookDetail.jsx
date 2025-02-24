import { Col, Row, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCartActionWithThunk } from "../redux/actions";

const BookDetail = () =>
  // { bookSelected }
  {
    const dispatch = useDispatch();
    const bookSelected = useSelector((state) => state.bookSelected.content);
    const user = useSelector((state) => state.user.content);
    return (
      <div className="mt-3 mb-4 mb-lg-0">
        {bookSelected ? (
          <>
            <Row>
              <Col sm={12}>
                <h1>{bookSelected.title}</h1>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <div className="mt-3">
                  <img className="book-cover" src={bookSelected.imageUrl} alt="book selected" />
                </div>
              </Col>
              <Col sm={8}>
                <p>
                  <span className="font-weight-bold">Description:</span>&nbsp;
                  {bookSelected.description}
                </p>
                <p>
                  <span className="font-weight-bold">Price:</span>&nbsp;
                  {bookSelected.price}€
                </p>

                {user ? (
                  <Button
                    color="primary"
                    onClick={() => {
                      // dispatch attiva il processo di cambio di stato globale / aggiornamento componenti
                      // si aspetta di ricevere come argomento un oggetto chiamato ACTION
                      // la action deve obbligatoriamente avere una proprietà type (che coinciderà con uno dei case dello switch del reducer)
                      // e opzionalmente un payload
                      // dispatch({ type: ADD_TO_CART, payload: bookSelected });

                      // dispatch(addToCartAction(bookSelected));

                      // inseriamo condizionalmente un libro nel carrello (SOLO SE NON GIA' PRESENTE, vedi logica interna)
                      dispatch(addToCartActionWithThunk(bookSelected));
                    }}
                  >
                    ADD TO CART
                  </Button>
                ) : (
                  <Alert variant="warning">Fai il login per poter inserire questo libro nel carrello</Alert>
                )}
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col sm={12}>
              <h3>Start by clicking on a book!</h3>
            </Col>
          </Row>
        )}
      </div>
    );
  };

export default BookDetail;
