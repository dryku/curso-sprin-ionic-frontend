import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/Produto.dto";

@Injectable()
export class CartService{

    constructor(public storage: StorageService) {
    }

    creatOrClearCart() : Cart {
        let cart: Cart = {itens: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.creatOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart: Cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.idProduto == produto.idProduto);
        if (position == -1 ) {
            cart.itens.push({qtdItem: 1, produto: produto});
        }
        this.storage.setCart(cart);    
        return cart;
    }

    removeProduto(produto: ProdutoDTO) : Cart {
        let cart: Cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.idProduto == produto.idProduto);
        if (position != -1 ) {
            cart.itens.splice(position, 1);
        }
        this.storage.setCart(cart);    
        return cart;
    }
    
    
    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart: Cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.idProduto == produto.idProduto);
        if (position != -1 ) {
            cart.itens[position].qtdItem++;
        }
        this.storage.setCart(cart);    
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart: Cart = this.getCart();
        let position = cart.itens.findIndex(x => x.produto.idProduto == produto.idProduto);
        if (position != -1 ) {
            cart.itens[position].qtdItem--;
            if (cart.itens[position].qtdItem < 1) {
                cart = this.removeProduto(produto);
                }
        }
        this.storage.setCart(cart);    
        return cart;
    }
    
    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i = 0; i < cart.itens.length; i++) {
            sum += cart.itens[i].produto.preco * cart.itens[i].qtdItem; 
        }
        return sum;
    }


}