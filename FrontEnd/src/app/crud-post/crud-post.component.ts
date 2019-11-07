import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Post, Usuario } from '../../model/models';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crud-post',
  templateUrl: './crud-post.component.html',
  styleUrls: ['./crud-post.component.css']
})
export class CrudPostComponent implements OnInit {
  editForm: FormGroup;
  dataSource: Post;
  userSource: Usuario[];
  postId: number;

  constructor(private _api: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    this._api.getAdmUsuarios().subscribe(res => {
      this.userSource = res;
      this.loadPost();
    }, err => {
      console.log(err);
    });

    this.editForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'body': [null, Validators.required],
      'userId': [null, Validators.required]
    });
  }

  loadPost() {
    this._api.getPost(this.postId).subscribe(res => {
      this.dataSource = res;
      this.loadForm();
    }, err => {
      console.log(err);
    });
  }

  loadForm() {
    this.editForm.controls['title'].setValue(this.dataSource[0].title);
    this.editForm.controls['body'].setValue(this.dataSource[0].body);
    this.editForm.controls['userId'].setValue(this.dataSource[0].id);
  }

  editPost(form: NgForm) {
    this._api.updatePost(this.postId, form).subscribe(res => {
      this.router.navigate(['/principal']);
    }, err => {
      console.log(err);
    });
  }
}
