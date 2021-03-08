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
  @ViewChild(MatSelect) selectMonedaOrigen: MatSelect;
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
  clickCotizar() {
    console.log("clickCotizar() monto:"+this.monto+" monedaOrigen="+this.monedaOrigen+" monedaDestino="+this.monedaDestino);
    if(this.selectMonedaOrigen.value == this.selectMonedaDestino.value) {
      this.tipoCambioFinal = "Por favor seleccione un par de monedas diferentes";
      return;
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