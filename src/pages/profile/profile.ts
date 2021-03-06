import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  
  cliente : ClienteDTO; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      //this.email = localUser.email;
      this.clienteService.findByEmail(localUser.email)
      .subscribe( response => {
        this.cliente = response as ClienteDTO;
        //buscar imagem
      },
      error => { 
        if (error.status == 403) {
          this.navCtrl.setRoot("HomePage");
        }
        console.log("Erro ao carregar o perfil do cliente" ); });

    }
    else{
      this.navCtrl.setRoot("HomePage");
      
    }
  }

}
