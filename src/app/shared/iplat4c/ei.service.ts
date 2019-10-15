import { HttpResponse, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_RUL } from '../../app.constants';
import {EI} from './ei';
import {map, tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class EIService {
    constructor(private http: HttpClient) { }

    callService(serviceUrl: string, inBlock: Object | EI.EIInfo | EI.JsonEIInfo, options?: any): Observable<any> {
        const inBlk = this.buildInBlock(inBlock, options);
        return this.http.post(SERVER_API_RUL + 'api/' + serviceUrl, inBlk, { observe: 'response' })
            .pipe(
                map( (response: HttpResponse<any>) => {
                    const outBlk: EI.JsonEIInfo = EI.EIInfoToJsonEIInfo(response.body);
                    return outBlk;
                })
            );
    }

    buildInBlock(inBlock: Object | EI.EIInfo | EI.JsonEIInfo , options?: any): EI.EIInfo {
        /* let testInfo: EI.EIInfo = new EI.EIInfo();
        let table: EI.DataTable = new EI.DataTable();
        table.addColumns('username', 'password');
        table.addRow('admin', 'admin9');
        testInfo.addTable(table, 'Table1');
        console.log(JSON.stringify(testInfo));

        let result: EI.EIInfo = new EI.EIInfo();
        let table1: EI.DataTable = new EI.DataTable();
        table1.addColumns('code', 'token');
        table1.addRow('0', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        result.addTable(table1, 'Table1');
        console.log(JSON.stringify(result)); */
        let inBlk: EI.EIInfo = null;
        if (inBlock instanceof EI.EIInfo) {
            inBlk = inBlock;
        } else if (inBlock instanceof EI.JsonEIInfo) {
            inBlk = inBlock.toEIInfo();
        } else {
            inBlk = new EI.EIInfo();
            let tableName = 'Table1';
            if (options && options['TableName']) {
                tableName = options['TableName'];
            }
            let dataTable: EI.DataTable = null;
            if (!Array.isArray(inBlock)) {
                dataTable = EI.ObjectToDataTable(inBlock, tableName);
            } else {
                dataTable = EI.ArrayToDataTable(inBlock, tableName);
            }
            inBlk.addTable(dataTable);
        }

        return inBlk;
    }
}
