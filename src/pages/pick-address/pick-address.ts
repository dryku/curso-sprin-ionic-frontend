import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
}

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe( response => {
        this.items = response ['enderecos'];

        let cart = this.cartService.getCart();

        this.pedido = {
          cliente: {idcliente: response['idcliente']},
          enderecoEntrega: null,
          pgto: null,
          itens : cart.itens.map(x => {return {qtdItem: x.qtdItem, produto: {idProduto: x.produto.idProduto}}})
          }
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot("HomePage");
          }
        });
      }
      else {
        this.navCtrl.setRoot('HomePage');
      }
    }

    nextPage(item: EnderecoDTO) {
      this.pedido.enderecoEntrega = {idendereco: item.idendereco};
      this.navCtrl.push('PaymentPage', {pedido: this.pedido});
      console.log(this.pedido);

    }
}
