import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/Produto.dto';
//import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
//    public storage: StorageService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.itens;
  }


  removeItem(produto: ProdutoDTO){
    this.items = this.cartService.removeProduto(produto).itens;
  }

  increaseQuantity(produto: ProdutoDTO){
    console.log("Adicionado produtos ao carrinho... ");
    this.items = this.cartService.increaseQuantity(produto).itens;
  }

  decreaseQuantity(produto: ProdutoDTO){
    this.items = this.cartService.decreaseQuantity(produto).itens;
  }

  total() : number {
    return this.cartService.total();
  }

  goOn() {
   this.navCtrl.setRoot('CategoriaPage');
  }

  checkout() {
    this.navCtrl.setRoot('PickAddressPage');
   }
}
