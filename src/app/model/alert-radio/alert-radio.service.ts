import { Injectable } from '@angular/core';
import { EIService } from '../../shared/iplat4c/ei.service';
import { SERVER_API_RUL } from '../../app.constants';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EI } from '../../shared/iplat4c/ei';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertRadioService {

  constructor(private http: HttpClient, private eiService: EIService) { }

}
