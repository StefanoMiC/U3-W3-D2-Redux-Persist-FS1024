// Abbiamo definito i TYPE come costanti, in modo da ricere un errore -non silezioso- in caso di discrepanze nel riferci a loro

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SELECT_BOOK = "SELECT_BOOK";
export const SET_USER = "SET_USER";
export const SET_BOOKS = "SET_BOOKS";

// ACTION CREATORS  ==> funzioni che ritornano l'oggetto (action)

// export const addToCartAction = () => {
//   return { type: ADD_TO_CART, payload: bookSelected };
// };

// versione condensata della precedente, le tonde servono a definire che
// stiamo tornando un oggetto evitando che le graffe vengano intese come contesto della funzione
export const addToCartAction = (book) => ({ type: ADD_TO_CART, payload: book }); // non più utilizzata

export const addToCartActionWithThunk = (bookSelected) => {
  return (dispatch, getState) => {
    const currentState = getState();

    console.log(currentState);
    const foundIndex = currentState.cart.content.findIndex((book) => book.id === bookSelected.id);
    // il metodo findIndex mi torna la posizione del primo elemento trovato che rispetta una condizione (book.id === bookSelected.id)
    // altrimenti torna -1

    // verifico che il valore trovato sia -1, in modo da avere certezza della non presenza di un elemento uguale nel carrello,
    // prima di inserirlo
    if (foundIndex === -1) {
      dispatch({ type: ADD_TO_CART, payload: bookSelected });
    } else {
      // se ho trovato un numero positivo significa che l'elemento era presente nell'array cart e quindi non lo inserisco una seconda volta
      // ma do un messaggio all'utente
      // N.B. al posto di un banale alert() potrei fare la dispatch di un'action con type es: CART_ALERT e
      // collegare nella pagina un alert in ascolto di uno stato relativo alla visualizzazione di un alert
      // in un punto qualsiasi dell'interfaccia
      alert(currentState.user.content + ", guarda che l'hai già inserito prima!");
    }
  };
};

export const removeFromCartAction = (i) => ({ type: REMOVE_FROM_CART, payload: i });
export const selectBookAction = (book) => ({ type: SELECT_BOOK, payload: book });
export const setUserAction = (value) => ({ type: SET_USER, payload: value });

export const getBooksAction = () => {
  // grazie a redux-thunk, già integrato come middleware nel nostro configureStore() di redux toolkit,
  // abbiamo la facoltà di poter ritornare dal nostro action creator, non direttamente un oggetto, ma una FUNZIONE che può gestire logica all'interno
  // ANCHE ASINCRONA!

  return async (dispatch, getState) => {
    // il primo parametro contiene la funzione dispatch, il secondo contiene una funzione che ci ricava l'oggetto di stato globale aggiornato

    console.log("getState()", getState()); // getState va chiamato per restituirci l'oggetto di stato aggiornato nel momento in cui la chiamo
    try {
      let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
      if (resp.ok) {
        let fetchedBooks = await resp.json();
        console.log(fetchedBooks);
        dispatch({ type: SET_BOOKS, payload: fetchedBooks });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
