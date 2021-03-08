import {Component, OnInit} from '@angular/core';
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
    
  ngOnInit() {
    console.log("INIT():");
  }
  clickCotizar() {
    console.log("clickCotizar() monto:"+this.monto+" monedaOrigen="+this.monedaOrigen+" monedaDestino="+this.monedaDestino);
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