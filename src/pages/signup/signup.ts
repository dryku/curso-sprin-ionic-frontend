import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { ClienteService } from '../../services/domain/cliente.service';

import { Subscriber } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  cidades: CidadeDTO[];
  estados: EstadoDTO[];

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public formBild: FormBuilder,
     public cidadeService : CidadeService,
     public estadoService : EstadoService,
     public clienteService : ClienteService,
     public alertCtrl : AlertController
  ) {
  
      this.formGroup = this.formBild.group({
        nmcliente : ["Adriano enviado", [Validators.required]],
        emailcliente : ["driku.tites@gmail.com", [Validators.required, Validators.email]],
        senha : ["123", [Validators.required]],
        tipoCliente : ["1", [Validators.required]],
        cpfOuCnpj : ["30147584850", [Validators.required, Validators.minLength(9), Validators.maxLength(14)]],
   //   idendeco : ["1", [Validators.required]],
        logradouro : ["Rua teste", [Validators.required]],
        numero : ["10", [Validators.required]],
        complemento : ["viela", []],
        bairro : ["Nazaré", [Validators.required]],
        cep : ["08142460", [Validators.required]],
        telefone1 : ["25713400", [Validators.required]],
        telefone2 : [null, []],
        telefone3 : [null, []],
        cidade : [null, [Validators.required]],
        estadoId : [null, [Validators.required]]
      
      });
    }

  ionViewDidLoad() {
    this.estadoService.buscarEstados()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].idestado);
        this.updateCidades();
      },
      error => {
 //       console.log('Erro ao Carregar estado');
      })
    
  }
 

  updateCidades(){
      let estado_id = this.formGroup.value.estadoId;
      this.cidadeService.buscarCidades(estado_id)
        .subscribe(response =>{
          this.cidades = response;
          this.formGroup.controls.cidade.setValue(null);
        },
        error => {
   //       console.log('Erro ao Atualizar Cidades')
        }); 
  }

  signupUser(){
    this.clienteService.inserirCliente(this.formGroup.value)
        .subscribe(response => {
          this.inserirClientetOK();
        },
        error => {
          this.ErroAlert(error);
          console.log(this.formGroup.value + " - " + error)
          console.log("Erro ao inserir Cliente....... " + error);
        });
    }

    inserirClientetOK(){
      let alert = this.alertCtrl.create({
        title: 'Sucesso!',
        message: 'Cadastro efetuado com sucesso!',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }


    ErroAlert(erro : any) {
      let alert = this.alertCtrl.create({

        title: 'Erro!!',
        subTitle: 'Erro ao realizar o cadastro! \n'+erro,
        buttons: ['Fechar'],
        cssClass:'alert-danger'

      });
      alert.present();
    }
    
}
