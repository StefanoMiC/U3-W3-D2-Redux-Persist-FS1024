import { Component } from "react";
import { connect } from "react-redux";
import { addToCartActionWithThunk, setUserAction } from "../redux/actions";
// import { useSelector } from "react-redux";

// ESEMPIO DI CONNESSIONE DI UN COMPONENTE A CLASSE ALLO STORE REDUX

// connect è la funzione che connette il nostro componente allo Store
// accetta due parametri: mapStateToProps e mapDispatchToProps

// come dice il nome stesso, mapperanno, cioè applicheranno delle prop al nostro componente a classe
// che avrà sia prop riguardanti la porzione di stato che vogliamo leggere,
// sia la funzione che sarà in grado di fare il dispatch della nostra azione

const mapStateToProps = (state) => {
  // seleziono la parte di stato che voglio applicare alla prop, lo stato mi viene fornito dalla funzione connect come parametro "state" ( vedi sopra )
  return { books: state.books.content };
  // la prop prenderà il nome dalla proprietà dell'oggetto che ritorniamo
  // sarà quindi this.props.cartLength
};

const mapDispatchToProps = (dispatch) => {
  // in questa funzione la connect ci fornirà la funzione dispatch come parametro

  // ritneremo sempre un oggetto che rappresenta le prop che verranno applicate al componente, in questo caso ne avremo una chiamata this.props.addToCart,
  // che sarà una funzione, che aspetterà di essere chiamata per poi chiamare la dispatch internamente e fornire un'action al reducer.
  return {
    setUserName: () => {
      dispatch(setUserAction("Stefano"));
    },
    addToCart: (book) => {
      // book è il valore che passiamo dal JSX nell'onClick
      //  dispatch({ type: "ADD_TO_CART", payload: book });
      dispatch(addToCartActionWithThunk(book));
      // qui siamo dentro la funzione contenuta in addToCart, solo quando this.props.addToCart() verrà chiamata allora dispatch verrà eseguito, non prima.
      // quando dispatch viene eseguito, invierà effettivamente l'oggetto action al reducer.
    }
  };
};

class Footer extends Component {
  // const books = useSelector((state) => state.books.content);
  render() {
    return (
      <footer className="epizon-footer">
        <span className="text-muted" onClick={() => this.props.setUserName()}>
          Epizon {new Date().getFullYear()}©
        </span>
        <ul>
          {this.props.books.map((book) => (
            <li key={book.id} onClick={() => this.props.addToCart(book)}>
              {book.title}
            </li>
          ))}
        </ul>
      </footer>
    );
  }
}

// questo passaggio è fondamentale, è qui che la funzione connect() aumenterà il nostro componente con le prop dello stato e di dispatch,
// così come abbiamo istruito le due funzioni mapStateToProps e mapDispatchToProps che gli passiamo

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
