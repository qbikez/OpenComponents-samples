import { Badge, Button, Drawer, Grid, LinearProgress } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import { CartItemType } from "../interfaces";
import Cart from "./Cart";
//import { useQuery } from "react-query";
//import { Wrapper, StyledButton } from "./App.styles";
// import Item from "./Item/Item";
// import Cart from "./Cart/Cart";
// import "./styles.css";
export type Props = { name: string };

// const getProducts = async (): Promise<CartItemType[]> =>
//   await (await fetch("https://fakestoreapi.com/products")).json();

export function ShoppingCart() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    window.oc.cmd.push((oc) => {
      oc.events.on("webshop:add-to-cart", (_eventDetails, eventData) => {
        const item = eventData as CartItemType;
        console.log("adding item to cart");
        console.log(item);
        handleAddToCart(item);
      });
    });
  }, []);
  // const { data, isLoading, error } = useQuery<CartItemType[]>(
  //   "products",
  //   getProducts
  // );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };

  // if (isLoading) return <LinearProgress />;
  // if (error) return <div>Something went wrong</div>;

  return (
    <>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <Button onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </Button>

      {/* <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid> */}
    </>
  );
}
