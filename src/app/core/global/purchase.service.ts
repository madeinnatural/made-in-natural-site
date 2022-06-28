import { CookieService } from '@ngx-toolkit/cookie';
import { Injectable } from '@angular/core';
import { Item } from '../model/Product';

interface Cart {
  puchase: Array<Item>
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor( private cookieService:CookieService ) { }

  itemCount() {
    const cart_jason = this.cookieService.getItem('cart');

    if (cart_jason) {
      const cart = this.getCartLocalStorage();
      return cart.length
    }

    return 0;
  }

  clearCart() {
    this.cookieService.removeItem('cart');
  }

  deleItem(item: Item) {
    const cart_json = this.cookieService.getItem('cart');

    if (cart_json) {
      const cart = this.getCartLocalStorage();

      if (cart.some(e => e.id == item.id)) {

        cart.splice(cart.findIndex(e => e.id == item.id), 1);

        this.cookieService.setItem('cart', JSON.stringify(cart));

      }

    }
  }

  removeItem(item: Item) {

    // CASO JÁ EXISTA CARRINHO
    if (this.cookieService.hasItem('cart')) {

      const cart = this.getCartLocalStorage();

      // VERIFICA SE EXISTE ALGUM ITEM COM O ID IDENTICO.
      if ( cart.some(current_item => current_item.id == item.id )) {

        const count_item = cart[cart.findIndex((e)=> e.id == item.id)].amount - 1;
        const curret_price = cart[cart.findIndex((e)=> e.id == item.id)].product.price * count_item;

        if (count_item == 0) {

          cart.splice(cart.findIndex((e)=> e.id == item.id), 1)

          this.cookieService.setItem('cart', JSON.stringify(cart));

          return;

        }

        cart.splice(cart.findIndex((e)=> e.id == item.id), 1)

        cart.push({
          amount: count_item,
          id: item.id,
          parcial_price: curret_price,
          product: item.product
        });



        this.cookieService.setItem('cart', JSON.stringify(cart));

      } else {

        cart.push(item)

        this.cookieService.setItem('cart', JSON.stringify(cart));
      }
    } else {
      this.addDirectItem(item);
    }

  }

  addItemCart(item: Item) {

    // CASO JÁ EXISTA CARRINHO
    if (this.cookieService.hasItem('cart')) {

      const cart = this.getCartLocalStorage();

      // VERIFICA SE EXISTE ALGUM ITEM COM O ID IDENTICO.
      if ( cart.some(current_item => current_item.id == item.id )) {

        const count_item = cart[cart.findIndex((e)=> e.id == item.id)].amount + 1;
        const curret_price = cart[cart.findIndex((e)=> e.id == item.id)].product.price * count_item;

        cart.splice(cart.findIndex((e)=> e.id == item.id), 1)

        cart.push({
          amount: count_item,
          id: item.id,
          parcial_price: curret_price,
          product: item.product
        });

        this.cookieService.setItem('cart', JSON.stringify(cart));

      } else {

        cart.push(item)

        this.cookieService.setItem('cart', JSON.stringify(cart));
      }
    } else {
      this.addDirectItem(item);
    }

  }

  private addDirectItem(item: Item){

    const current_cart = this.cookieService.getItem('cart');

    // CASO EXISTA O CARRINHO VASIO DEVO APENAS ADICIONAR MAIS UM ITEM LÁ
    if (current_cart) {

      const _cart = JSON.parse(current_cart);

      _cart.push(item);

      this.cookieService.setItem('cart', JSON.stringify(_cart));

    } else {

      // CASO O CARRINHO NÃO EXITA CRIE UM.

      const _cart: Array<Item> = [];

      _cart.push(item)

      this.cookieService.setItem('cart', JSON.stringify(_cart));
    }
  }

  private getCartLocalStorage(): Array<Item> {
    const current_cart_save = JSON.parse(this.cookieService.getItem('cart') as string);
    return current_cart_save
  }

}
