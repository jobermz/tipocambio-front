import { Injectable } from '@angular/core';
import { CotizacionRequestDto } from '../modelo/CotizacionRequestDto.';
import { LoginRequestDto } from '../modelo/loginRequestDto';
import { LoginResponseDto } from '../modelo/loginResponseDto';
import { ResponseDto } from '../modelo/ResponseDto';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})

export class TipoCambioService {

  constructor(private apiService:ApiService) {}

  async getToken(loginRequest:LoginRequestDto):Promise<any>{
    return await new Promise(
        (resolve, reject) => {
        this.apiService.postResource("/seguridad/login", loginRequest).toPromise().then((data) => {
            console.log("OK actualizado...");
            if (data && Object.keys(data).length !== 0) {                       
                let formDto = data as ResponseDto;                
                resolve(formDto.body);              
            } else {
              console.log("error...");
              resolve([]);
            }
        }).catch(
            (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
            });
        });
  }
  async cotizar(cotizacion:CotizacionRequestDto):Promise<any>{
    let loginRequest:LoginRequestDto;
    loginRequest = {
     identificador:"admin",
     ip:"127.0.0.1",
     password:"123",
     tokenGoogleV3: ""
    };
    let rs:LoginResponseDto = await this.getToken(loginRequest);
    console.log("token = "+rs.token);
    return  new Promise(
        (resolve, reject) => {
        this.apiService.postResourceToken("/tipoCambio/cotizar", cotizacion, rs.token).toPromise().then((data) => {
            console.log("OK actualizado...");
            if (data && Object.keys(data).length !== 0) {                       
                let formDto = data as ResponseDto;                
                resolve(formDto);              
            } else {
              console.log("error...");
              resolve([]);
            }
        }).catch(
            (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
            });
        });
  }
  /*
  async registrar(rol:Rol):Promise<any>{
    return await new Promise(
        (resolve, reject) => {
        this.apiService.postResource("/rol/registrar",rol).toPromise().then((data) => {
            console.log("OK registrado...");
            if (data && Object.keys(data).length !== 0) {                       
                let formDto = data as ResponseDTO;                
                resolve(formDto);              
            } else {
              console.log("error...");
              resolve([]);
            }
        }).catch(
            (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
            });
        });
  }

  getRoles():Promise<any>{
    let providers = [];
    return new Promise(
      (resolve, reject) => {
        this.apiService.getResource("/rol/consultar?d="+new Date().getTime()).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            let endPoint = data as ResponseDTO;                 
            resolve(endPoint);
          } else {
            console.log("Error found...");
            resolve([]);
          }   
        }).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          });
      });
  }
*/
}