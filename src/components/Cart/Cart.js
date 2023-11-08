import React, { useContext } from "react";
import CartItem from "./CartItem.js";
import Modal from "../Ui/Modal.js";
import TheButton from "../Ui/TheButton.js";
import classes from "./Cart.module.css";
import CartContext from "../store/cartcontext.js";
import Pay from "./pay.js";
const Cart = (props) => {
  
  const cartCtx = useContext(CartContext);
  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const onAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  var cartItems = cartCtx.items.map((item) => (
    <CartItem
      name={item.name}
      amount={item.amount}
      price={item.price}
      key={item.id}
      src={item.src}
      onAdd={onAddHandler.bind(null, item)}
      onRemove={onRemoveHandler.bind(null, item.id)}
    />
  ));

  return (
    <Modal onCloseCart={props.onCloseCart}>
      <div className={classes.items}>
        <div className={classes.item_group}>{cartItems}</div>

        <div className={`${classes.amount} `}>
          <p>Total Amount</p>
          <p>{totalAmount}</p>
        </div>
        <div className={classes.buttons}>
          <TheButton
            onClick={props.onCloseCart}
            className={` ${classes.btn_style} me-2`}
          >
            Close
          </TheButton>
          {/* Hiding the order button if there is no item in the cart using the hasitems variable as a condition */}
          {hasItems && (
            <Pay/>
          )}
          {/* ENDS */}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
