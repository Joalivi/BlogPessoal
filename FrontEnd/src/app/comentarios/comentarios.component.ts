import { Component, OnInit } from '@angular/core';
import { Post } from '../../model/models';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../../model/models';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  commentForm: FormGroup;
  dataSource: Post;
  newDataSource: Comentario;
  commentSource: Comentario[];
  post_id: number;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  
  ngOnInit() {
    this.init(this.route.snapshot.params['id']);
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
    this.loadComments(id);
  }

  addComentario(form: NgForm) {
    this.api.addComentario(form)
      .subscribe(() => {
        this.loadComments(this.post_id);
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

  loadComments(id) {

    this.api.getComentarios(id).subscribe(res => {
    console.log(res)

      this.commentSource = res;
    }, err => {
      console.log(err);
    });
  }

  deleteComment(event, id) {
    this.api.deleteComentario(id).subscribe(() => {
      this.loadComments(id);
    }, err => {
      console.log(err);
    });
  }


}
