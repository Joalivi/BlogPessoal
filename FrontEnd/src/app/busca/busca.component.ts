import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Busca } from '../../model/models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {
  dataSource: Busca[];

  constructor(
    private appService: AppService,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getSearch(this.route.snapshot.params['string']).subscribe(res => {
      this.dataSource = res;
    }, err => {
      console.log(err);
    });
  }
}
