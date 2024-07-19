import { createContext, useContext, useEffect, useState } from "react";

const ShoppingCartContext = createContext({});

const ShoppingCartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCartItems(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const getItemsQuantity = (id) => {
    return cartItems.find((item) => item._id === id)?.quantity || 0;
    
  };

  const increaseQuantity = (product) => {
    setCartItems((currItems) => {
      const existingItem = currItems.find((item) => item._id === product._id);
      if (!existingItem) {
        return [
          ...currItems,
          {
            _id: product._id,
            quantity: 1,
            name: product.name,
            price: product.price,
            image: product.image,
          },
        ];
      } else {
        return currItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    });
  };


  const decreaseQuantity = (product) => {
    setCartItems((currItems) => {
      const updatedItems = currItems
        .map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      return updatedItems;
    });
  };


  const removeItem = (product) => {
    setCartItems((currItems) =>
      currItems.filter((item) => item._id !== product._id)
    );
  };


  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const removeAllCart = () => {
    setCartItems([]);
  };

  const [checkLogin, setCheckLogin] = useState(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        checkLogin,
        setCheckLogin,
        getItemsQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        getTotalQuantity,
        getTotalPrice,
        removeAllCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
export { ShoppingCartContext };
