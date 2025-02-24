import { Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUserAction } from "../redux/actions";

const CartIndicator = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.content);
  const dispatch = useDispatch();

  console.log("CartIndicator render");
  // useSelector si aspetta che gli venga passata una funzione come argomento
  // in questa funzione ci possiamo aspettare l'intero stato globale dal suo parametro (arriverà sempre)
  // e dentro alla funzione possiamo estrarre la porzione di stato (quindi di dato) che ci interessa
  // in questo caso raggiungiamo l'array di state.cart.content e ne estraiamo direttamente il valore di length che verrà ritornato dalla funzione
  // qualsisi dato ritornato dalla funzione interna allo useSelector verrà raccolto dalla variabile alla sua sinistra
  const cartLength = useSelector((state) => state.cart.content.length);
  // quindi da questo punto in poi, ci possiamo aspettare di avere un valore di cartLength sempre aggiornato che
  // rifletta il numero effettivo di elementi nel carrello in ogni momento!

  // usare useSelector vi garantisce che ad ogni cambio di stato il componente subisca un re-render,
  // dando la possibilità al dato di cambiare nell'interfaccia
  return (
    <div className="ms-auto text-end mt-3 mb-4">
      {user ? (
        <>
          <span className="me-2">
            Ciao, <strong className="text-capitalize">{user}!</strong>
          </span>
          <Button color="primary" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            <span className="ms-2">{cartLength}</span>
          </Button>
        </>
      ) : (
        <div className="d-flex align-items-center">
          <FormControl placeholder="Inserisci il tuo nome" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <Button
            variant="info"
            className="ms-1 flex-shrink-0"
            onClick={() => {
              // dispatch({ type: "SET_USER", payload: inputValue });
              dispatch(setUserAction(inputValue));
            }}
          >
            Log In
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartIndicator;
