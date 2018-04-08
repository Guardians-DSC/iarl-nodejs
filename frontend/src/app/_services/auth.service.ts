import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private url = 'http://localhost:3000/api/login';
  // private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  // private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) { }

  // https://httpbin.org/post -> test post
  login(model: any): any {
    const body = JSON.stringify(model);
    this.http.post(this.url , body)
    .map((response: Response) => {

      if (response.status === 200) {
        return true;
      } else {
        return false;
    }
  }).subscribe(dados => console.log(dados));
}

// OPTIONS REQUEST
/*  login(model: any) {
    this.http.post(this.url, JSON.stringify(model), this.options).map(res => res).subscribe(dados => console.log(dados));
  }
*/
}
