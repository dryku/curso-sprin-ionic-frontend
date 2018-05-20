import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, AlertController } from 'ionic-angular';
import { CategoriaPage } from '../categoria/categoria';
import { CredenciaisDTO } from '../../models/Credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email : "driku.ti@gmail.com",
    senha : "123"
  };


  constructor(public navCtrl: NavController, 
              public menu: MenuController,
              public alertCtrl: AlertController,
              public auth: AuthService) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

// APROVEITANDO O USUARIO LOGADO
  ionViewDidEnter(){
    this.auth.refreshToken().
    subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriaPage');
    },
    erro => {});
  
  }



  login() {
    this.auth.authenticate(this.creds).
    subscribe(response => {
 //    console.log(response.headers.get('Authorization')); 
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriaPage');
    },
    erro => {
      //this.presentAlert();
    });
    //console.log(this.creds)

  }

  signup(){
    this.navCtrl.push('SignupPage');
}
  
presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Erro de Acesso....',
    subTitle: 'E-mail ou Senha inválido!',
    buttons: ['Fechar']
  });
  alert.present();
}


}
