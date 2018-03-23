import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CategoriasPage } from '../categorias/categorias';
import { FormularioPage } from '../formulario/formulario';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);

  }

  ionViewDidEnter(){
    this.menu.swipeEnable(true);
  }

  login() {
   // console.log("Olá estou no console...")
    this.navCtrl.setRoot('CategoriasPage');
  }

  openFormulario() {
    this.navCtrl.setRoot('FormularioPage');
  }

  ion

}
