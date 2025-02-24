import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions";

const initialState = {
  content: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        //   content: state.content.push(action.payload)  ❌ VIETATO USARE METODI CHE MUTANO I DATI DELLO STATO DIRETTAMENTE
        // content: state.content.concat(action.payload) ✅ operazione consentita perché il metodo concat ritorna un nuovo array
        content: [...state.content, action.payload] // ✅ operazione consentita perché stiamo CREANDO UN NUOVO ARRAY spalmando all'interno i dati del precedente
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        //   content: state.content.splice(action.payload, 1) ❌ VIETATO USARE METODI CHE MUTANO I DATI DELLO STATO DIRETTAMENTE
        //   content: state.content.slice(0, action.payload).concat(state.content.slice(action.payload + 1)) ✅ operazione consentita perché sia il metodo concat che slice ritornano un nuovo array
        //   content: [...state.content.slice(0, action.payload), ...state.content.slice(action.payload + 1)]// ✅ operazione consentita perché sia il metodo concat che slice ritornano un nuovo array
        content: state.content.filter((_, i) => i !== action.payload) //✅ operazione consentita perché il metodo concat ritorna un nuovo array
      };

    default:
      return state;
  }
};

export default cartReducer;
