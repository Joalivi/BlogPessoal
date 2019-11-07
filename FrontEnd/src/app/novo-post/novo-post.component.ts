import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Usuario } from '../../model/models';
import { __values } from 'tslib';


@Component({
  selector: 'app-novo-post',
  templateUrl: './novo-post.component.html',
  styleUrls: ['./novo-post.component.css']
})
export class NovoPostComponent implements OnInit{

  postForm: FormGroup;
  dataSource: Usuario[];

  constructor(
    private _api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this._api.getAdmUsuarios().subscribe(res => {
      this.dataSource = res;
    }, err => {
      console.log(err);
    });

    this.postForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'body': [null, Validators.required],
      'userId': [null, Validators.required]
    });
  }


  addPost(form: NgForm) {
    this._api.addPost(form).subscribe(err => {
      console.log(err);
    });
    this.postForm.controls['title'].setValue("");
    this.postForm.controls['title'].setErrors(null);
    this.postForm.controls['body'].setValue("");
    this.postForm.controls['body'].setErrors(null);
    this.postForm.controls['userId'].setValue(0);
    this.postForm.controls['userId'].setErrors(null);
  }
}
