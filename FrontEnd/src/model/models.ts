export class Usuario {
    _id: number;
    nome: string;
    username: string;
    email: string;
    adm: Boolean;
  }

  export class Post {
    _id: string;
    titulo: string;
    corpo: string;
    user_id: number;
  }  

  export class Comentario {
    _id: number;
    title: string;
    body: string;
    email: string;
    post_id: number;
  }

  export class Busca {
    _id: number;
    title: string;
    body: string;
}