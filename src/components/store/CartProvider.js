import React, { useReducer } from "react";
import CartContext from "./cartcontext.js";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
   
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
            updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
      //END
    } else {
      updatedItems = state.items.concat(action.item);
      //END
    }
    return {
      //Returning the items data and totalAmount
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      //END
    };
  }
  //END

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    //END

    const existingItem = state.items[existingItemIndex];
    //END

    //Finding the accurate Total Amount
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    //END
    let updatedItems;

    //Checking if the amount is equals to 1
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }
    //END
    else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
      //END
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      //END
    };
  }
  return defaultCartState;
  //END
};

const CartProvider = (props) => {
  //Using the useReducr hook
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  
  const addItemHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
