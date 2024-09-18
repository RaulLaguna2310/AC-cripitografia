import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private http: HttpClient) {}

  cep: string = '';
  endereco: any = {
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: ''
  };

  consultarEndereco() {
    if (this.cep !== '') {
      this.http.get(`https://viacep.com.br/ws/${this.cep}/json/`).subscribe(
        (dados) => {
          this.endereco = dados;
        },
        (erro) => {
          console.error('Erro ao consultar CEP:', erro);
          alert('Erro ao consultar CEP. Verifique se o CEP está correto.');
        }
      );
    } else {
      alert('Por favor, insira um CEP válido.');
    }
  }

  procurarPorEndereco() {
    const { logradouro, localidade, uf } = this.endereco;

    const url = `https://viacep.com.br/ws/${logradouro}&cidade=${localidade}&estado=${uf}/json/`;

    this.http.get(url).subscribe(
      (dados: any) => {
        if (dados && dados.length > 0) {
          this.cep = dados[0].cep; // Ajuste conforme a estrutura da resposta
        } else {
          alert('Endereço não encontrado.');
        }
      },
      (erro) => {
        console.error('Erro ao procurar pelo endereço:', erro);
        alert('Erro ao procurar pelo endereço. Verifique os dados fornecidos.');
      }
    );
  }
}
