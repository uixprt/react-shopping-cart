import { useState } from 'react';
import { CartEntity, CartItem, ProductEntity } from '../entities';

function initCart(): CartEntity {
  if (localStorage.getItem('cartItems')) {
    return {
      items: new Map(JSON.parse(localStorage.cartItems)) as Map<
        number,
        CartItem
      >,
      total: JSON.parse(localStorage.cartTotal),
    };
  }

  return {
    items: new Map(),
    total: 0,
  };
}

export function useCart() {
  const [cartState, setCartState] = useState<CartEntity>(initCart);

  function updateCart(items: Map<number, CartItem>, total: number) {
    localStorage.cartItems = JSON.stringify([...items]);
    localStorage.cartTotal = JSON.stringify(total);

    setCartState({
      items,
      total,
    });
  }

  const handelRemoveFromCart = (item: CartItem) => {
    const total = cartState.total - item.total;
    cartState.items.delete(item.id);
    const items = new Map(cartState.items);

    updateCart(items, total);
  };

  const handelAddToCart = (product: ProductEntity, quantity: number) => {
    if (!quantity && !cartState.items.get(product.id)?.quantity) {
      return;
    }

    if (!quantity && cartState.items.get(product.id)?.quantity === 0) {
      handelRemoveFromCart(cartState.items.get(product.id) as CartItem);
      return;
    }

    const productTotal = product.price * quantity;

    const newCartItem = {
      id: product.id,
      title: product.title,
      total: productTotal,
      quantity,
    };
    const items = cartState.items.set(product.id, newCartItem);

    const total = [...cartState.items].reduce(
      (total, [id, item]) => total + item.total,
      0,
    );

    updateCart(items, total);
  };

  return {
    cartState,
    handelAddToCart,
    handelRemoveFromCart,
  };
}
