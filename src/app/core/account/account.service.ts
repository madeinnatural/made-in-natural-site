import { Router } from '@angular/router';
import { CookieOptions, CookieService } from '@ngx-toolkit/cookie';
import { UserRegister } from './../model/User';
import { ServerService } from './../server/server.service';
import { GlobalEventService } from './../global/global.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import User, { UserLogin } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  hidderHeaderFooter = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private globalEventService: GlobalEventService,
    private cookieService:CookieService,
    private router: Router
  ) {}

  loginActiver(active: boolean) {
    this.hidderHeaderFooter.emit(active);
  }

  login(dataUser: UserLogin) {
    return this.http.post(environment.apiUrl + 'api/token/login',{email: dataUser.email, password: dataUser.password});
  }

  logout () {
    this.cookieService.removeItem('auth_token');
    this.cookieService.removeItem('current_user');
  }

  reginterUser(dataReginter: UserRegister) {

    const data_cpf_cpnj = dataReginter.cpf_cnpj;

    const data = {
      name: dataReginter.name,
      password: dataReginter.password,
      lastname: dataReginter.lastname,
      email: dataReginter.email,
      cpf: this.verifica_cpf_cnpj(data_cpf_cpnj) == 'CPF' ? data_cpf_cpnj : null,
      cnpj: this.verifica_cpf_cnpj(data_cpf_cpnj) == 'CNPJ' ? data_cpf_cpnj : null,
    }

    this.http.post(environment.apiUrl + 'api/users/register', data)
      .subscribe( {
        next: (res: any) => {

          this.logout();

          const { user, auth_token } = res;
          const current_user_string = JSON.stringify(user);

          this.cookieService.setItem('current_user', current_user_string);
          this.cookieService.setItem(this.globalEventService.AUTH_TOKEN_COOKIE, auth_token);

          this.router.navigate(['/']);
        },
        error: (rej: any) => {

        },
      });
  }

  private verifica_cpf_cnpj ( valor: string ) {

    // Garante que o valor ?? uma string
    valor = valor.toString();

    // Remove caracteres inv??lidos do valor
    valor = valor.replace(/[^0-9]/g, '');

    // Verifica CPF
    if ( valor.length === 11 ) {
        return 'CPF';
    }

    // Verifica CNPJ
    else if ( valor.length === 14 ) {
        return 'CNPJ';
    }

    // N??o retorna nada
    else {
        return false;
    }


  }

}
