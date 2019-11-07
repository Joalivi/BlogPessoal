import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Post } from '../../model/models';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  
  dataSource: Post[];
  p: number = 1;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadPosts();
  }

  
  deletePost(event, id) {
    console.log(id);
    this.api.deletePost(id).subscribe(() => {
      this.loadPosts();
    }, err => {
      console.log(err);
    });
  }

  
  loadPosts() {
    this.api.getPosts().subscribe(res => {
      this.dataSource = res;
    }, err => {
      console.log(err);
    });
  }
}
