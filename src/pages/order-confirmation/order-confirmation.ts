import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codpedido: string;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public pedidoService: PedidoService,
    public clienteService: ClienteService
  ) {

     this.pedido =  this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().itens;
    this.clienteService.findById(this.pedido.cliente.idcliente)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findByEndereco(this.pedido.enderecoEntrega.idendereco, response['enderecos'])
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findByEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.idendereco == id);
    return list[position];
  }

  total(){
    return this.cartService.total();
  }

  back(){
    this.navCtrl.setRoot('CartPage');
  }

  home(){
    this.navCtrl.setRoot('CategoriaPage');
  }



  checkout(){
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.creatOrClearCart();
        this.codpedido = this.extractId(response.headers.get('location'));
        console.log(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  private extractId(location : string) : string {
    let posicion = location.lastIndexOf('/');
    return location.substring(posicion + 1, location.length);
  }
}
