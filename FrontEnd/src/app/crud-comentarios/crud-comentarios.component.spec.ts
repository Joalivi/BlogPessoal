import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDComentariosComponent } from './crud-comentarios.component';

describe('CRUDComentariosComponent', () => {
  let component: CRUDComentariosComponent;
  let fixture: ComponentFixture<CRUDComentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRUDComentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRUDComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
