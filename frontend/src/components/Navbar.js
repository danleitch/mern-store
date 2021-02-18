import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const email = useSelector((state) => state.login.userEmail);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>MERN Shopping Cart</h2>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>

          </Link>
        </li >

        {email &&
          <li className="name_text">
            <h5 className="cart__link">{email}</h5>
          </li>
        }

        <Login />
        <li>
          <Link to="/">Shop</Link>
        </li>
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
