import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private toastr: ToastsManager,
    vRef: ViewContainerRef,
    private auth: AuthService
    ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
  }

  /*Para teste apenas */
  login(f) {
    if ( !this.model.username || !this.model.password ) {
      this.toastr.warning('Usuário ou senha inválido!', 'Alerta!');
    } else {
      this.auth.login(this.model);
      console.log(JSON.stringify(this.model));
    }
  }
}
