import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http : HttpClient) {}

  cep: string = ''

  consultarEndereco(){
    return this.http.get(`viacep.com.br/ws/${this.cep}/json/`)
  }

}
