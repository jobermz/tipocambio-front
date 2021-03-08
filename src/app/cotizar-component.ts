import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { CotizacionRequestDto } from './modelo/CotizacionRequestDto.';
import { CotizacionResponseDto } from './modelo/CotizacionResponseDto';
import { ResponseDto } from './modelo/ResponseDto';
import { TipoCambioService } from './servicios/tipoCambio.service';

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'cotizar-component',
  styleUrls: ['cotizar-component.css'],
  templateUrl: 'cotizar-component.html',
})
export class CotizarComponent implements OnInit {
  monto:number;
  monedaDestino:string;
  monedaOrigen:string;
  tipoCambioFinal:string;
  constructor(private tipoCambioService:TipoCambioService) {
  }
  //@ViewChild(MatSelect) selectMonedaOrigen: MatSelect;
  @ViewChild(MatSelect) selectMonedaDestino: MatSelect;
  ngOnInit() {
    console.log("INIT():");
  }
  /*changeSelectMonedaDestino(e:any) {
    for(var matOption of this.selectMonedaOrigen.options) {
      if(matOption.value == e.value) {
        matOption.disabled = true;
      } else {
        matOption.disabled = false;
      }
    }
  }*/

  changeSelectMonedaOrigen(e:any) {
    console.log("changeSelectMonedaOrigen(): e.value "+e.value);

    for(var matOption of this.selectMonedaDestino.options) {
      if(matOption.value == e.value) {
        matOption.disabled = true;
      } else {
        matOption.disabled = false;
      }
    }
  }
  setMyStyles() {
    let styles = {
      'color': this.colorMsg
    };
    return styles;
  }
  colorMsg:string = "black";
  clickCotizar() {
    console.log("clickCotizar() monto:"+this.monto+" monedaOrigen="+this.monedaOrigen+" monedaDestino="+this.monedaDestino);
    if(this.monto == undefined || this.monto <= 0) {
      this.tipoCambioFinal = "Por favor ingrese un valor mayor a cero en el campo monto";
      this.colorMsg = "red";
      return;
    } else if(this.monedaOrigen == undefined || this.monedaOrigen == '') {
      this.tipoCambioFinal = "Por favor seleccione la moneda origen";
      this.colorMsg = "red";
      return;
    } else if(this.monedaDestino == undefined || this.monedaDestino == '') {
      this.tipoCambioFinal = "Por favor seleccione la moneda destino";
      this.colorMsg = "red";
      return;
    } else if(this.monedaOrigen == this.monedaDestino) {
      this.tipoCambioFinal = "Por favor seleccione un par de monedas diferentes";
      this.colorMsg = "red";
      return;
    } else {
      this.colorMsg = "black";
    }
    let req:CotizacionRequestDto;
    req = {
      monto:this.monto,
      monedaOrigen:this.monedaOrigen,
      monedaDestino:this.monedaDestino
    };
    this.tipoCambioService.cotizar(req).then(data=>{
      if(data &&  Object.keys(data).length!==0) {
        let response = data as ResponseDto;
        if(response.status) {
          let response = data.body as CotizacionResponseDto;
          console.log(" montoTipoCambio="+response.montoTipoCambio);
          console.log(" tipoCambio="+response.tipoCambio);
          this.tipoCambioFinal = "El tipo de cambio es: "+response.montoTipoCambio+ " " + response.monedaDestino+
          " El topo de cambio aplicado es: "+response.tipoCambio;
        } else {
          console.log( "Problemas " + response.message);
        }
      }
    });

  }
}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */