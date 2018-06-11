import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = [];
  pagina : number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }


  loadData(){
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.buscarCategorias(categoria_id, this.pagina, 10)
        .subscribe(response =>{
          this.items = this.items.concat(response["content"]);
          loader.dismiss();
          console.log(this.pagina);
          console.log(this.items);
        },
        error => {
          loader.dismiss();
        });
  }

  showDetalhe(produto_id : string){
    this.navCtrl.push('ProdutoDetalhePage', {produto_id: produto_id});
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.pagina = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      console.log("Passou pelo refreshd");
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.pagina++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
