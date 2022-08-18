import { createContext, ReactNode, useEffect, useState } from "react";
import { Coffee } from "../pages/Home/components/CoffeeCard";
import { produce } from "immer"

export interface CartItem extends Coffee {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  cartQuantity: number
  cartItemTotal: number
  addCoffeeToCart: (coffee: CartItem) => void
  removeCartItem: (cartItemId: number) => void
  cleanCart: () => void
  changeCartItemQuantity: (
    cartItemId: number, 
    type: 'increase' | 'decrease'
  ) => void
}

interface CartContextProviderProps {
  children: ReactNode
}

const COFFEE_ITEMS_STORAGE_KEY = 'coffeeDelivery:cartItems'

export const CartContext = createContext({} as CartContextType) 

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem(COFFEE_ITEMS_STORAGE_KEY)

    if(storedCartItems) {
      return JSON.parse(storedCartItems)
    }

    return []
  })

  const cartQuantity = cartItems.length

  const cartItemTotal = cartItems.reduce((acc, cartItem) => {
    return acc + (cartItem.price * cartItem.quantity)
  }, 0)

  function addCoffeeToCart(coffee: CartItem) {
    const coffeeExistsInCart = 
    cartItems.findIndex(cartItem => cartItem.id === coffee.id)

    const newCart = produce(cartItems,
      (draft) => {
        if (coffeeExistsInCart < 0) {
          draft.push(coffee)
        } else {
          draft[coffeeExistsInCart].quantity += coffee.quantity
        }
      }
    )

    setCartItems(newCart)
  }
  
  function changeCartItemQuantity(cartItemId: number, type: 'increase' | 'decrease') {
    const newCart = produce(cartItems, (draft) => {
      const coffeeExistInCart = cartItems
        .findIndex(cartItem => cartItem.id === cartItemId)

        if(coffeeExistInCart >= 0) {
          const item = draft[coffeeExistInCart]
          draft[coffeeExistInCart].quantity = 
          type === 'increase' ? item.quantity + 1 
          : item.quantity - 1
        }
    })

    setCartItems(newCart)
  }

  function removeCartItem(cartItemId: number) {
    const newCart = produce(cartItems, (draft) => {
      const coffeeExistInCart = cartItems
      .findIndex(cartItem => cartItem.id === cartItemId)

      if(coffeeExistInCart >= 0) {
        draft.splice(coffeeExistInCart, 1)
      }
    })

    setCartItems(newCart)
  }

  function cleanCart() {
    setCartItems([])
  }

  useEffect(() => {
    localStorage.setItem(COFFEE_ITEMS_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider 
      value={{
        cartItems, 
        cartQuantity, 
        cartItemTotal,
        addCoffeeToCart, 
        changeCartItemQuantity, 
        removeCartItem,
        cleanCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}