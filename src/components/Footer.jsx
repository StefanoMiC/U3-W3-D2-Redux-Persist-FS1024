import { Component } from "react";
import { connect } from "react-redux";
import { addToCartActionWithThunk, setUserAction } from "../redux/actions";
// import { useSelector } from "react-redux";

const mapStateToProps = (state) => {
  return { books: state.books.content };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserName: () => {
      dispatch(setUserAction("Stefano"));
    },
    addToCart: (book) => {
      dispatch(addToCartActionWithThunk(book));
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
