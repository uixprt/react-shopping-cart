import { useState } from 'react';
import { CartEntity, CartItem } from '../entities';

function initCart(): CartEntity {
  if (localStorage.getItem('cartItems')) {
    return new Map(JSON.parse(localStorage.cartItems)) as Map<number, CartItem>;
  }

  return new Map();
}

export function useCart() {
  const [cart, setCart] = useState<CartEntity>(initCart);

  function updateCart(items: Map<number, CartItem>) {
    localStorage.cartItems = JSON.stringify([...items]);

    setCart(items);
  }

  const removeItem = (id: number) => {
    cart.delete(id);
    const items = new Map(cart);

    updateCart(items);
  };

  const addItem = (id: number, quantity: number) => {
    const items = cart.set(id, { id, quantity });

    updateCart(new Map<number, CartItem>(items));
  };

  const changeQuantity = (id: number, quantity: number) => {
    if (!quantity && !cart.get(id)?.quantity) {
      return;
    }

    if (!quantity && cart.get(id)?.quantity === 0) {
      removeItem(id);
      return;
    }

    addItem(id, quantity);
  };

  return {
    cart,
    removeItem,
    changeQuantity,
  };
}
