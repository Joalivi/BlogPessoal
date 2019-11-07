import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-crud-comentarios',
  templateUrl: './crud-comentarios.component.html',
  styleUrls: ['./crud-comentarios.component.css']
})
export class CRUDComentariosComponent implements OnInit {
  editForm: FormGroup;

  title: string;
  body: string;
  user_email: string;
  comment_id: number;

  constructor(
    private _api: ApiService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CRUDComentariosComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.body = data.body;
    this.user_email = data.email;
    this.comment_id = data.id;
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      'title': [this.title, Validators.required],
      'body': [this.body, Validators.required],
      'email': [this.user_email, Validators.required]
    });

  }

  save() {
    this.dialogRef.close(this.editForm.value);
  }
}

