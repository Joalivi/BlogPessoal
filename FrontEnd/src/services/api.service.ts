import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Usuario } from '../model/models';
import { Post } from '../model/models';
import { Comentario } from '../model/models';
import { Busca } from '../model/models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUsuario = 'http://localhost:3333/api/usuarios';
const apiAdmUsuario = 'http://localhost:3333/api/usuariosadm';
const apiNovoUsuario = 'http://localhost:3333/api/novousuario';

const apiNovoPost = 'http://localhost:3333/api/novopost';
const apiPosts = 'http://localhost:3333/api/posts';
const apiPost = 'http://localhost:3333/api/post/${id}';

const apiNovoComentario = 'http://localhost:3333/api/comentarios';
const apiComentarios = 'http://localhost:3333/api/comentarios/${post_id}';
const apiComentario = 'http://localhost:3333/api/comentario/${id}';

const apiBusca = 'http://localhost:3333/api/search/${search}';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsuarios (): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(apiUsuario)
      .pipe(
        tap(usuarios => console.log('leu os usuarios')),
        catchError(this.handleError('getUsuarios', []))
      );
  }

  getAdmUsuarios (): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(apiAdmUsuario)
      .pipe(
        tap(usuarios => console.log('leu os usuarios')),
        catchError(this.handleError('getUsuarios', []))
      );
  }
  addUsuario (Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(apiNovoUsuario, Usuario, httpOptions).pipe(
      tap((usuario: Usuario) => console.log(`adicionou o Usuario com w/ id=${Usuario.id}`)),
      catchError(this.handleError<Usuario>('addUsuario'))
    );
  }

  
  getPosts (): Observable<Post[]> {
    return this.http.get<Post[]>(apiPosts)
      .pipe(
        tap(post => console.log('leu os posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(apiPost).pipe(
      tap(_ => console.log(`leu o post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  addPost (Post): Observable<Post> {
    return this.http.post<Post>(apiNovoPost, Post, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((post: Post) => console.log(`adicionou o Usuario com w/ id=${Post.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  updatePost(id, Post): Observable<any> {
    return this.http.put(apiPost, Post, httpOptions).pipe(
      tap(_ => console.log(`atualiza o post com id=${id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  deletePost(id): Observable<Post> {
    return this.http.delete<Post>(`http://localhost:3333/api/post/${id}`, httpOptions).pipe(
      tap(_ => console.log(`remove o Post com id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  };


  getComentarios (): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(apiComentarios)
      .pipe(
        tap(usuarios => console.log('leu os posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getComentario(id: number): Observable<Comentario> {
   
    return this.http.get<Comentario>(apiComentario).pipe(
      tap(_ => console.log(`leu o Comentario id=${id}`)),
      catchError(this.handleError<Comentario>(`getComentario id=${id}`))
    );
  }

  addComentario(Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(apiNovoComentario, Comentario, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((comentario: Comentario) => console.log(`adicionou o Comentario com w/ id=${Comentario.id}`)),
      catchError(this.handleError<Comentario>('addComentario'))
    );
  }

  updateComentario(id, comentario): Observable<any> {
   return this.http.put(`http://localhost:3333/api/comment/${id}`, comentario, httpOptions).pipe(
      tap(_ => console.log(`atualiza o Comentario com id=${id}`)),
      catchError(this.handleError<any>('updateComentario'))
    );
  }

  deleteComentario (id): Observable<Comentario> {
   return this.http.delete<Comentario>(apiComentario, httpOptions).pipe(
      tap(_ => console.log(`remove o Comentario com id=${id}`)),
      catchError(this.handleError<Comentario>('deletePost'))
    );
  };


  getSearch(string): Observable<Busca[]> {
    return this.http.get<Busca[]>(`http://localhost:3333/api/search/${string}`)
      .pipe(catchError(this.handleError<Busca[]>('search', [])));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}