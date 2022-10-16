import {Component, OnInit, ViewChild} from '@angular/core';
import {map, Observable} from "rxjs";
import {Trade} from "../model/trade";
import {CellClickedEvent, ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TradeService} from "../trade-service/trade.service";

@Component({
  selector: 'app-trade-grid',
  templateUrl: './trade-grid.component.html',
  styleUrls: ['./trade-grid.component.css']
})
export class TradeGridComponent implements OnInit {

  constructor( private  store: AngularFirestore, private tradeService : TradeService) {
    this.newTrades = this.store.collection('trades').stateChanges(['added']).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Trade;
        data.id = a.payload.doc.id;
        return { ...data };
      }))
    );
  }


  trades: Trade[] =[];
  newTrades: Observable<any>
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'id'},
    { field: 'tradeId'},
    { field: 'version'},
    { field: 'bookId'},
    { field: 'counterPartyId'},
    { field: 'maturityDate'},
    { field: 'createdDate'},
    { field: 'expired'}
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
  };

  ngOnInit(): void {
  }

  sortData(sortModel: any[], data: any[]) {
    const sortPresent = sortModel && sortModel.length > 0;
    if (!sortPresent) {
      return data;
    }
    // do an in memory sort of the data, across all the fields
    const resultOfSort = data.slice();
    resultOfSort.sort(function (a, b) {
      for (let k = 0; k < sortModel.length; k++) {
        const sortColModel = sortModel[k];
        const valueA = a[sortColModel.colId];
        const valueB = b[sortColModel.colId];
        // this filter didn't find a difference, move onto the next one
        if (valueA == valueB) {
          continue;
        }
        const sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
        if (valueA > valueB) {
          return sortDirection;
        } else {
          return sortDirection * -1;
        }
      }
      // no filters found a difference
      return 0;
    });
    return resultOfSort;
  }

  onGridReady($event: GridReadyEvent<any>) {
    this.agGrid.api.sizeColumnsToFit()
    this.newTrades.subscribe(data=>{
      const tradesSummary = this.tradeService.process(this.trades,data);
      this.trades=tradesSummary.trades
      const dataSource = {
        rowCount: undefined, // behave as infinite scroll

        getRows: (params:any) => {
          console.log('asking for ' + params.startRow + ' to ' + params.endRow);

          // At this point in your code, you would call the server.
          // To make the demo look real, wait for 500ms before returning
          setTimeout(()=> {
            const dataAfterSortingAndFiltering = this.sortData(params.sortModel,this.trades);
            // take a slice of the total rows
            const rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
            // if on or after the last page, work out the last row.
            let lastRow = -1;
            if (dataAfterSortingAndFiltering.length <= params.endRow) {
              lastRow = dataAfterSortingAndFiltering.length;
            }
            // call the success callback
            params.successCallback(rowsThisPage, lastRow);
          }, 500);
        },
      };
      this.agGrid.api.setDatasource(dataSource)
    })
  }

  getRowId($event: any) {
    return $event.data.id
  }
}
