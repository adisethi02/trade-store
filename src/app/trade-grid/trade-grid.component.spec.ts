import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeGridComponent } from './trade-grid.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../environments/environment";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {Trade} from "../model/trade";
import {of} from "rxjs";

describe('TradeGridComponent', () => {
  let component: TradeGridComponent;
  let fixture: ComponentFixture<TradeGridComponent>;

  const input: Trade[] = [
    new Trade({ id: 'Polska', tradeId: 'polska', version: 1}),
    new Trade({ id: 'Dolnośląskie', tradeId: 'dolnoslaskie', version: 1}),
    new Trade({ id: 'wroclaw', tradeId: 'polska', version: 0})
  ];

  const data = of(input)

  const pipeStub = {
    pipe: jasmine.createSpy('pipe').and.returnValue(data)
  }

  const collectionStub = {
    stateChanges: jasmine.createSpy('stateChanges').and.returnValue(pipeStub)
  }

  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeGridComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
      providers: [
        {
          provide: AngularFirestore,
          value: angularFirestoreStub
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    fixture.detectChanges();
  });
});
