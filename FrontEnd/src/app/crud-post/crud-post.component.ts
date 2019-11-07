import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Usuario } from '../../model/models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-crud-post',
  templateUrl: './crud-post.component.html',
  styleUrls: ['./crud-post.component.css']
})
export class CrudPostComponent implements OnInit {
  editForm: FormGroup;
  dataSource: Usuario[];

  title: string;
  body: string;
  user_id: number;
  post_id: number;

  constructor(
    private _api: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CrudPostComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.body = data.body;
    this.user_id = data.id;
    this.post_id = data.post_id;
  }

  ngOnInit() {
    this._api.getUsuarios().subscribe(res => {
      this.dataSource = res;
    }, err => {
      console.log(err);
    });

    this.editForm = this.formBuilder.group({
      'title': [this.title, Validators.required],
      'body': [this.body, Validators.required],
      'userId': [this.user_id, Validators.required]
    });

  }

  save() {
    this.dialogRef.close(this.editForm.value);
  }
}
