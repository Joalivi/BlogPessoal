import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl} from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: 'cadastro.component.html',
  styleUrls: ['cadastro.component.css']
})

export class CadastroComponent implements OnInit{

  usuarioForm: FormGroup;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  //emaill = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
   'name' : [null, Validators.required],
   'username' : [null, Validators.required],
   'adm' : [null,Validators.required],
   'email':[null,[Validators.required, Validators.email]]
   
 });
 }

 

 addUsuario(form: NgForm) {
  this.api.addUsuario(form).subscribe(err => {
    console.log(err);
  });
  this.usuarioForm.controls['name'].setValue("");
  this.usuarioForm.controls['name'].setErrors(null);
  this.usuarioForm.controls['username'].setValue("");
  this.usuarioForm.controls['username'].setErrors(null);
  this.usuarioForm.controls['email'].setValue('')
  this.usuarioForm.controls['email'].setErrors(null);
}
}
