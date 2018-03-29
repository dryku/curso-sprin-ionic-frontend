import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public formBild: FormBuilder) {
  
      this.formGroup = this.formBild.group({
        nmcliente : ["Adriano enviado", [Validators.required]],
        emailcliente : ["driku.tites@gmail.com", [Validators.required, Validators.email]],
        tipoCliente : ["1", [Validators.required]],
        cpfOuCnpj : ["3014758485", [Validators.required, Validators.minLength(9), Validators.maxLength(14)]],
   //   idendeco : ["1", [Validators.required]],
        logradouro : ["Rua teste", [Validators.required]],
        numero : ["10", [Validators.required]],
        complemento : ["viela", [Validators.required]],
        bairro : ["Nazaré", [Validators.required]],
        cep : ["08142460", [Validators.required]],
        telefone1 : ["25713400", [Validators.required]],
        telefone2 : [null, []],
        telefone3 : [null, []],
        cidadeId : [null, [Validators.required]],
        estadoId : [null, [Validators.required]]
      
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
 
  signupUser(){
    console.log("Enviou o Form")
  }

}
