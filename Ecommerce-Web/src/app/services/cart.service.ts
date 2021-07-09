import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  constructor() { }

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  addToCart(cartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {

      // find the item in the cart based on item id
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === cartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

      // check if we found it 
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem.quantity++;
    }
    else {
      // jsut add the item to the array
      this.cartItems.push(cartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantitytValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantitytValue += currentCartItem.quantity;
    }

    // publish the new values... all subscriber will recieve the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantitytValue);

    this.logCartData(totalPriceValue, totalQuantitytValue);
  }

  logCartData(totalPriceValue: number, totalQuantitytValue: number) {
    console.log("contents of the cart");

    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log('name : ' + tempCartItem.name + "  quantity = " + tempCartItem.quantity + "  unitprice = " + tempCartItem.unitPrice + "  subtotalprice = " + subTotalPrice);
    }

    console.log("totalprice : " + totalPriceValue.toFixed(2) + "  totalquantity : " + totalQuantitytValue);
    console.log("-----");
  }
}
