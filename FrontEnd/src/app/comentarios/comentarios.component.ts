import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/models';
import { AppService } from '../../services/app.service';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../../model/models';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CRUDComentariosComponent } from '../crud-comentarios/crud-comentarios.component';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  commentForm: FormGroup;
  dataSource: Post;
  newDataSource: Comentario;
  editSource: Comentario;
  commentSource: Comentario;
  post_id: number;

  constructor(
    private api: ApiService,
    private appService: AppService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.init(this.route.snapshot.params['id']);
    this.appService.setTitle('Post');
    this.commentForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'body': [null, Validators.required],
      'email': [null, Validators.required],
      'post_id': [this.route.snapshot.params['id']]
    });
  }

  init(id) {
    this.post_id = id;
    this.api.getPost(id).subscribe(res => {
      this.dataSource = res;
    }, err => {
      console.log(err);
    });
    this.loadComments();
  }

  addComentario(form: NgForm) {
    this.api.addComentario(form)
      .subscribe(() => {
        this.loadComments();
      },
        err => {
          console.log(err);
        });
    this.commentForm.controls['title'].setValue("");
    this.commentForm.controls['title'].setErrors(null);
    this.commentForm.controls['body'].setValue("");
    this.commentForm.controls['body'].setErrors(null);
    this.commentForm.controls['email'].setValue("");
    this.commentForm.controls['email'].setErrors(null);
  }

  loadComments() {
    this.api.getComentario(this.post_id).subscribe(res => {
      this.commentSource = res;
    }, err => {
      console.log(err);
    });
  }

  openDialog(event, id) {
    console.log(id)
    this.api.getComentario(id).subscribe(res => {
      this.editSource = res;
      this.send(id);
    }, err => {
      console.log(err);
    });
  }

  deleteComment(event, id) {
    this.api.deleteComentario(id).subscribe(() => {
      this.loadComments();
    }, err => {
      console.log(err);
    });
  }

  send(id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: this.editSource[0].title,
      body: this.editSource[0].body,
      email: this.editSource[0].email,
      id: id
    };

    const dialogRef = this.dialog.open(CRUDComentariosComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data =>
        this.api.updateComentario(id, data).subscribe(res => {
          this.newDataSource = res;
          this.loadComments();
        }, err => {
          console.log(err);
        })
    );
  }
}
