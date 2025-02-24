// Questo sarà il nostro primo Reducer! (possiamo immaginarlo come l'ufficio postale che smista le richieste)
// un reducer dev'essere una funzione PURA, che prenderà lo STATO CORRENTE nel momento in cui il reducer viene risvegliato
// (al momento dell'esecuzione della dispatch() da un nostro componente)

const initialState = {
  cart: {
    content: []
    // createdAt: new Date().toISOString()
  },
  bookSelected: {
    content: null
  },
  user: {
    content: ""
  }
};

// OGNI VOLTA CHE VIENE RISVEGLIATO quindi riceve lo stato nella condizione attuale come primo parametro
// e riceve la ACTION che arriva dalla chiamata della dispatch

const mainReducer = (state = initialState, action) => {
  // da qui dentro IN OGNI CASO o SITUAZIONE ci dovrà PER FORZA essere un NUOVO Stato RITORNATO!
  // quanto meno, torneremo il precedente (vedi default)
  // per mantenere il funzionamento del Redux Store, bisognerà evitare a tutti i costi, che per qualche motivo dal nostro reducer venga ritornato undefined,
  // per questo motivo abbiamo strutturato il default case in questo modo

  // dovrà quindi valutare il type della nostra action
  switch (action.type) {
    // e ci sarà un case che corrisponderà ESATTAMENTE allo stesso valore di stringa type
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          //   content: state.cart.content.push(action.payload)  ❌ VIETATO USARE METODI CHE MUTANO I DATI DELLO STATO DIRETTAMENTE
          // content: state.cart.content.concat(action.payload) ✅ operazione consentita perché il metodo concat ritorna un nuovo array
          content: [...state.cart.content, action.payload] // ✅ operazione consentita perché stiamo CREANDO UN NUOVO ARRAY spalmando all'interno i dati del precedente
        }
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          //   content: state.cart.content.splice(action.payload, 1) ❌ VIETATO USARE METODI CHE MUTANO I DATI DELLO STATO DIRETTAMENTE
          //   content: state.cart.content.slice(0, action.payload).concat(state.cart.content.slice(action.payload + 1)) ✅ operazione consentita perché sia il metodo concat che slice ritornano un nuovo array
          //   content: [...state.cart.content.slice(0, action.payload), ...state.cart.content.slice(action.payload + 1)]// ✅ operazione consentita perché sia il metodo concat che slice ritornano un nuovo array
          content: state.cart.content.filter((_, i) => i !== action.payload) //✅ operazione consentita perché il metodo concat ritorna un nuovo array
        }
      };
    case "SELECT_BOOK":
      return {
        ...state,
        bookSelected: {
          ...state.bookSelected,
          content: action.payload
        }
      };

    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          content: action.payload
        }
      };
    default:
      return state;
  }
};

export default mainReducer;
