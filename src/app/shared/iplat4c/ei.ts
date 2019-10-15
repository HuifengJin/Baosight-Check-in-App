export module EI {
    class SysInfo {
        constructor() {
            this.CompanyCode = '';
            this.CompanyName = '';
            this.SvcName = '';
            this.Msg = '';
            this.Flag = 0;
            this.Sender = '';
            this.UserName = '';
            this.ForeIP = '';
            this.ForeMac = '';
            this.UUID = '';
        }
        public CompanyCode: string;
        public CompanyName: string;
        public SvcName: string;
        public Msg: string;
        public Flag: number;
        public Sender: string;
        public UserName: string;
        public ForeIP: string;
        public ForeMac: string;
        public UUID: string;
    }

    export class EIInfo {
        constructor() {
            // tslint:disable-next-line: no-use-before-declare
            this.SysInfo = new SysInfo;
            this.Tables = [];
            this.ExtendedProperties = new Map<String, Object>();
        }
        public SysInfo: SysInfo;
        public Tables: Array<EI.DataTable>;
        public ExtendedProperties: Map<String, Object>;

        // Add a table (Optional method parameters : specified table name)
        public addTable(table: DataTable, tableName?: string): void {
            try {
                if (table.Name === '') {
                    const newTableName = tableName || 'Table' + this.Tables.length;
                    table.Name = newTableName;
                }
                const tableIndex = this.Tables.findIndex(t => t.Name === table.Name);
                if (tableIndex === -1) {
                    this.Tables.push(table);
                } else {
                    throw new Error('eiinfo already has table [' + table.Name + '].');
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        }

        // remove table by table index or table name
        public remove(tableInfo: string | number): void {
            try {
                let tableIndex = -1;
                if (typeof tableInfo === 'number') {
                    tableIndex = tableInfo;
                }
                if (typeof tableInfo === 'string') {
                    const tableName: string = tableInfo;
                    tableIndex = this.Tables.findIndex(dataTable => dataTable.Name === tableName);
                }
                if (tableIndex !== -1) {
                    delete this.Tables[tableIndex];
                } else {
                    throw new Error('Index out of bounds.') ;
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        }

        // get table by table index or table name
        public getTable(tableInfo: string | number): DataTable {
            let table = null;
            let tableIndex = -1;
            if (typeof(tableInfo) === 'number') {
                tableIndex = tableInfo;
            } else if (typeof(tableInfo) === 'string') {
                const tableName: string = tableInfo;
                tableIndex = this.Tables.findIndex(dataTable => dataTable.Name === tableName);
            }
            if (tableIndex !== -1) {
                table = this.Tables[tableIndex];
            }
            return table;
        }

        public containsTable(tableName: string): boolean {
            const tableIndex = this.Tables.findIndex(item => item.Name === tableName);
            return tableIndex !== -1;
        }

        public toJsonEIInfo(): JsonEIInfo {
            // tslint:disable-next-line: no-use-before-declare
            const jsonEIInfo = new JsonEIInfo();
            jsonEIInfo.SysInfo = this.SysInfo;
            this.Tables.forEach(dataTable => jsonEIInfo.addTable(dataTable.toJsonDataTable()));
            jsonEIInfo.ExtendedProperties = this.ExtendedProperties;
            return jsonEIInfo;
        }
    }

    export class DataTable {
        constructor() {
            this.Name = '';
            this.Columns = [];
            this.Rows = [];
            this.ExtendedProperties = new Map<String, Object>();
        }
        public Name: string;
        public Rows: Array<DataRow>;
        public Columns: Array<DataColumn>;
        public ExtendedProperties: Map<String, Object>;

        // Add a column
        public addColumn(column: DataColumn): void ;
        public addColumn(newColumn: string, dataType?: string, colCaption?: string): void;
        public addColumn(newColumn: DataColumn | string, dataType?: string, colCaption?: string): void {
            try {
                // tslint:disable-next-line: no-use-before-declare
                if (newColumn instanceof DataColumn) {
                    const columnIndex = this.Columns.findIndex( column => column.Name === newColumn.Name);
                    if (columnIndex === -1) {
                        this.Columns.push(newColumn);
                        this.Rows.forEach(row =>  row.push(''));
                    } else {
                        throw new Error('table [' + this.Name + '] already has column [' + newColumn.Name + ']');
                    }
                } else {
                    // tslint:disable-next-line: no-use-before-declare
                    const column = new DataColumn(newColumn, dataType, colCaption);
                    this.addColumn(column);
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        }

        // add multiple columns
        public addColumns(...columnNames: string[]): void;
        public addColumns(columnArray: DataColumn[]): void;
        public addColumns(columns: string | DataColumn[], ...columnNames: string[]): void {
            if (Array.isArray(columns)) {
                columns.forEach(col => this.addColumn(col));
            } else {
                const columnArray: string[] = [columns, ...columnNames];
                columnArray.forEach( col => this.addColumn(col));
            }
        }

        // remove a column by column index or column name.
        public removeColumn(columnInfo: string | number): void {
            try {
                if ( typeof(columnInfo) === 'string') {
                    const columnIndex = this.Columns.findIndex( column => column.Name === columnInfo);
                    this.removeColumn(columnInfo);
                } else {
                    if (columnInfo !== -1) {
                        if (columnInfo > this.Columns.length - 1) {
                            throw new Error('The current table has no column ' + columnInfo  + '.');
                        } else {
                            this.Columns.splice(columnInfo, 1);
                            this.Rows.forEach(row => row.splice(columnInfo, 1));
                        }
                    } else {
                        throw new Error('column ["' + columnInfo + '"] not found.');
                    }
                }
            } catch (e) {
                console.log(e);
                throw e;
            }
        }

        // add one row
        public addRow(row: DataRow): void;
        public addRow(...cellValues: Object[]): void;
        public addRow(dataRow: DataRow | Object, ...cellValues: Object[]): void {
            try {
                if (Array.isArray(dataRow)) {
                    if (dataRow.length !== this.Columns.length) {
                        throw new Error('The number of row elements must be equal to the number of columns!');
                    }
                    this.Rows.push(dataRow);
                } else {
                    const rowValues: Object[] = [dataRow, ...cellValues];
                    // tslint:disable-next-line: no-use-before-declare
                    const row: DataRow = new DataRow(rowValues);
                    this.addRow(row);
                }
            } catch (e) {
                console.log(e);
                throw e;
            }
        }

        // Add multiple rows
        public addRows(dataRows: DataRow[]): void {
            dataRows.forEach(row => {
                this.addRow(row);
            });
        }

        // get the value of the specified column of the specified row
        public getRowValue(rowIndex: number, column: number | string): any {
            try {
                if (typeof column === 'number') {
                    if (rowIndex < 0 || column < 0) {
                        throw new Error('row index and column index cannot be less than 0 .');
                    } else {
                        if (rowIndex >= this.Rows.length) {
                            throw new Error('The current table has no row ' + rowIndex + ' .');
                        }
                        if (column >= this.Columns.length) {
                            throw new Error('The current table has no column ' + column + ' .');
                        }
                        return this.Rows[rowIndex][column];
                    }
                } else {
                    const columnIndex = this.Columns.findIndex(col => col.Name === column );
                    if (columnIndex < 0) {
                        throw new Error('The current table has no column [' + column + '] .');
                    }
                    return this.getRowValue(rowIndex, columnIndex);
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        }

        public setRowValue(rowIndex: number, column: number | string, value: any): void {
            try {
                if (typeof column === 'number') {
                    if (rowIndex < 0 || column < 0) {
                        throw new Error('row index and column index cannot be less than 0 .');
                    } else {
                        if (rowIndex >= this.Rows.length) {
                            throw new Error('The current table has no row ' + rowIndex + ' .');
                        }
                        if (column >= this.Columns.length) {
                            throw new Error('The current table has no column ' + column + ' .');
                        }
                        if (value instanceof Date && getJsonDataType(this.Columns[column]) === 'Date') {
                            this.Rows[rowIndex][column] = value.toISOString();
                        } else  if (typeof value === getJsonDataType(this.Columns[column])) {
                            this.Rows[rowIndex][column] = value;
                        } else {
                            throw new Error('value type and column data type do not match.');
                        }
                    }
                } else {
                    const columnIndex = this.Columns.findIndex(col => col.Name === column );
                    if (columnIndex < 0) {
                        throw new Error('The current table has no column [' + column + '] .');
                    }
                    this.setRowValue(rowIndex, columnIndex, value);
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        }

        public toJsonDataTable(): JsonDataTable {
            // tslint:disable-next-line: no-use-before-declare
            const jsonDataTable = new JsonDataTable();
            jsonDataTable.Name = this.Name;
            // tslint:disable-next-line:forin
            this.Rows.forEach( row => {
                const entity = {};
                this.Columns.forEach( (col, colIndex) => entity[col.Name] = row[colIndex] );
                jsonDataTable.addData(entity);
            });
            jsonDataTable.ExtendedProperties = this.ExtendedProperties;
            return jsonDataTable;
        }


    }

    export class DataColumn {
        constructor(name: string, dataType?: string, caption?: string) {
            this.Name = name;
            this.Caption = caption || 'C' + name;
            this.DataType = dataType || 'S';
        }

        public Name: string;
        public Caption: string;
        public DataType: string;
    }

    export class DataRow extends Array<Object> {
        constructor(cellValues?: Array<Object>) {
            super();
            if (cellValues && cellValues.length > 0) {
               cellValues.forEach(value => this.push(value));
            }
        }
    }

    export class JsonEIInfo {
        constructor() {
            this.SysInfo = new SysInfo();
            this.Tables = [];
            this.ExtendedProperties = new Map<String, Object>();
        }
        public SysInfo: SysInfo;
        public Tables: Array<JsonDataTable>;
        public ExtendedProperties: Map<String, Object>;

        public addTable(jsonDataTable: JsonDataTable): JsonDataTable {
            this.Tables.push(jsonDataTable);
            return jsonDataTable;
        }
        public contains(tableName: string): boolean {
            const tableIndex = this.Tables.findIndex(item => item.Name === tableName);
            return tableIndex !== -1;
        }

        public remove(tableInfo: number | string): void {
            try {
                let tableIndex = -1;
                if (typeof tableInfo === 'number') {
                    tableIndex = tableInfo;
                } else if (typeof tableInfo === 'string') {
                    const tableName: string = tableInfo;
                    tableIndex = this.Tables.findIndex(dataTable => dataTable.Name === tableName);
                }
                if (tableIndex !== -1) {
                    delete this.Tables[tableIndex];
                } else {
                    throw new Error('Index out of bounds.');
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        }

        public getTable(tableInfo: number | string): JsonDataTable {
            let table = null;
            let tableIndex = -1;
            if (typeof tableInfo === 'number') {
                tableIndex = tableInfo;
            }
            if (typeof tableInfo === 'string') {
                const tableName: string = tableInfo;
                tableIndex = this.Tables.findIndex(dataTable => dataTable.Name === tableName);
            }
            if (tableIndex !== -1) {
                table = this.Tables[tableIndex];
            }
            return table;
        }

        public toEIInfo(): EIInfo {
            const eiInfo = new EIInfo();
            eiInfo.SysInfo = this.SysInfo;
            eiInfo.ExtendedProperties = this.ExtendedProperties;
            this.Tables.forEach(jsTable => {
                eiInfo.addTable(jsTable.toDataTable());
            });
            return eiInfo;

        }
    }

    export class JsonDataTable {
        constructor() {
            this.Name = '';
            this.Data = [];
            this.ExtendedProperties = new Map<String, Object>();
        }

        public Name: string;
        public Data: Array<Object>;
        public ExtendedProperties: Map<String, Object>;

        public addData(entity: Object): void {
            this.Data.push(entity);
        }

        public getDataValue(rowIndex: number, key: string): any {
            try {
                if (rowIndex < 0 ) {
                    throw new Error('row index cannot be less than 0 .');
                } else if (rowIndex >= this.Data.length) {
                    throw new Error('The current table data has no entity ' + rowIndex + '.');
                } else {
                    if (Object.keys(this.Data[rowIndex]).includes(key)) {
                        return this.Data[rowIndex][key];
                    } else {
                        throw new Error('The current table has no attribute [' + key + '].');
                    }
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        }

        public setDataValue(rowIndex: number, key: string, value: any): void {
            try {
                if (rowIndex < 0 ) {
                    throw new Error('row index cannot be less than 0 .');
                } else if (rowIndex >= this.Data.length) {
                    throw new Error('The current table data has no entity ' + rowIndex + '.');
                } else {
                    if (Object.keys(this.Data[rowIndex]).includes(key)) {
                        this.Data[rowIndex][key] = value;
                    } else {
                        throw new Error('The current table has no attribute [' + key + '].');
                    }
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        }

        public toDataTable(): DataTable {
            const table = new DataTable();
            table.Name = this.Name;
            table.ExtendedProperties = this.ExtendedProperties;
            this.Data.forEach( (item, index) => {
                const row: DataRow = new DataRow();
                Object.keys(item).forEach(key => {
                    if (index === 0) {
                        const dataType = getDataType(item[key]);
                        table.addColumn(key, dataType);
                    }
                    if (item[key] instanceof Date) {
                        row.push((new Date(item[key])).toISOString());
                    } else {
                        row.push(item[key]);
                    }
                });
                table.addRow(row);
            });
            return table;
        }
    }

    // convert entity to datatable
    export function ObjectToDataTable(obj: object, name?: string): DataTable {
        const table = EI.ObjectToJsonDataTable(obj, name);
        return table.toDataTable();
    }

    // convert entity to json datatable
    export function ObjectToJsonDataTable(obj: object, name?: string): JsonDataTable {
        const jsDataTable = new EI.JsonDataTable();
        jsDataTable.addData(obj);
        jsDataTable.Name = name || 'Table1';
        return jsDataTable;
    }

    // convert array<entity> to json datatable
    export function ArrayToJsonDataTable(arrayData: Array<Object>, name?: string): JsonDataTable {
        const jsDataTable = new JsonDataTable();
        arrayData.forEach(obj => jsDataTable.addData(obj) );
        jsDataTable.Name = name || 'Table1';
        return jsDataTable;
    }

    // convert array<entity> to datatable
    export function ArrayToDataTable(arrayData: Array<Object>, name?: string): DataTable {
        const jsDataTable = EI.ArrayToJsonDataTable(arrayData, name);
        return jsDataTable.toDataTable();
    }

    // convert datatable to json datatable
    export function TableToJsonTable(table: DataTable | Object): JsonDataTable {
        if (!(table instanceof DataTable)) {
            const dataTable = new DataTable();
            dataTable.Name = table['Name'];
            dataTable.Columns = table['Columns'];
            dataTable.Rows = table['Rows'];
            dataTable.ExtendedProperties = table['ExtendedProperties'];
            return dataTable.toJsonDataTable();
        } else {
            return table.toJsonDataTable();
        }
    }

    // convert json datatable to datatable
    export function JsonTableToTable(jsonTable: JsonDataTable | Object): DataTable {
        if (!(jsonTable instanceof JsonDataTable)) {
            const jsTable = new JsonDataTable();
            jsTable.Name = jsonTable['Name'];
            jsTable.Data = jsonTable['Data'];
            jsTable.ExtendedProperties = jsonTable['ExtendedProperties'];
            return jsTable.toDataTable();
        } else {
            return jsonTable.toDataTable();
        }
    }

    // convert eiinfo to json eiinfo
    export function EIInfoToJsonEIInfo(eiInfo: EIInfo | Object): JsonEIInfo {
        if (!(eiInfo instanceof EIInfo)) {
            const info = new EIInfo();
            info.SysInfo = eiInfo['SysInfo'];
            eiInfo['Tables'].forEach( table => {
                const dataTable = new DataTable();
                dataTable.Name = table['Name'];
                dataTable.Columns = table['Columns'];
                dataTable.Rows = table['Rows'];
                dataTable.ExtendedProperties = table['ExtendedProperties'];
                info.addTable(dataTable);
            });
            info.ExtendedProperties = eiInfo['ExtendedProperties'];
            return info.toJsonEIInfo();
        } else {
            return eiInfo.toJsonEIInfo();
        }
    }

    // convert json eiinfo to eiinfo
    export function JsonEIInfoToEIInfo(jsonEIInfo: JsonEIInfo | Object): EIInfo {
        if (!(jsonEIInfo instanceof JsonEIInfo)) {
            const jsEIInfo = new JsonEIInfo();
            jsEIInfo.SysInfo = jsonEIInfo['SysInfo'];
            jsonEIInfo['Tables'].forEach(table => {
                const jsonTable = new JsonDataTable();
                jsonTable.Name = table['Name'];
                jsonTable.Data = table['Data'];
                jsonTable.ExtendedProperties = table['ExtendedProperties'];
                jsEIInfo.addTable(jsonTable);
            });
            jsEIInfo.ExtendedProperties = jsonEIInfo['ExtendedProperties'];
        } else {
            return jsonEIInfo.toEIInfo();
        }
    }

    function getJsonDataType(column: DataColumn): any {
        switch (column.DataType) {
            case 'S':
                return 'string';
            case 'F':
            case 'I':
                return 'number';
            case 'B':
                return 'boolean';
            case 'D':
                return 'Date';
            default:
                return 'string';
        }
    }

    function getDataType(value: Object): string {
        if (typeof value === 'string' ) {
            return 'S';
        } else if (typeof value === 'number') {
            return 'F';
        } else if (typeof value === 'boolean') {
            return 'B';
        } else if (value instanceof Date) {
            return 'D';
        } else {
            return 'S';
        }
    }
}
