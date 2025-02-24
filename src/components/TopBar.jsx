import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartIndicator from "./CartIndicator";
import { useDispatch, useSelector } from "react-redux";
import { getBooksAction } from "../redux/actions";
import { useEffect } from "react";

const TopBar = () => {
  const bookSelected = useSelector((state) => state.bookSelected.content);
  const dispatch = useDispatch();

  useEffect(() => {
    // la funzione getBooksAction contiene il return di una funzione,
    // questa funzione ritornata può essere anche asincrona.
    // verrà presa in carico da thunk (un middleware che gestisce operazioni intermedie)
    // prima di ritornare nel flusso classico delle operazioni Redux => dispatch che risveglia un reducer e gli passa l'action

    // si risolverà prima la fetch e sempre dentro all'action creator verrà chiamata una dispatch interna
    // quello sarà il momento in cui torneremo nel flusso delle normali operazioni redux
    // ci arriverà l'oggetto action in questo punto che verrà raccolto dalla dispatch ecc.
    dispatch(getBooksAction());
  }, []);

  return (
    <Row className="gx-0">
      <Col sm={12} className="text-center background-div">
        <Link to="/" className="text-decoration-none">
          <h1 className="display-4 d-inline-block align-middle me-3">Epizon Book Store</h1>
        </Link>
        {bookSelected && <Image src={bookSelected.imageUrl} height="100" />}
      </Col>
      <Col className="d-flex justify-content-end align-items-center">
        <CartIndicator />
      </Col>
    </Row>
  );
};
export default TopBar;
