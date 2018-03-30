import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';

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
     public estadoService : EstadoService
  ) {
  
      this.formGroup = this.formBild.group({
        nmcliente : ["Adriano enviado", [Validators.required]],
        emailcliente : ["driku.tites@gmail.com", [Validators.required, Validators.email]],
        tipoCliente : ["1", [Validators.required]],
        cpfOuCnpj : ["3014758485", [Validators.required, Validators.minLength(9), Validators.maxLength(14)]],
   //   idendeco : ["1", [Validators.required]],
        logradouro : ["Rua teste", [Validators.required]],
        numero : ["10", [Validators.required]],
        complemento : ["viela", []],
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
          this.formGroup.controls.cidadeId.setValue(null);
        },
        error => {
   //       console.log('Erro ao Atualizar Cidades')
        }); 
  }

  signupUser(){
    console.log("Enviou o Form")
  }

}
