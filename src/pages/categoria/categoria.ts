import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
//import { Observable } from 'rxjs/Observable';
import { CategoriaDTO } from '../../models/categoria.dto';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {

//  public categoriaDTO: Observable<CategoriaDTO[]>;
  itens: CategoriaDTO[]; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) { 

    }

  ionViewDidLoad() {
    this.categoriaService.buscarCategorias()
          .subscribe(response => {
            this.itens = response;
         //   console.log(response);
          },
          error => {
            console.log(error);
          });
}


}
