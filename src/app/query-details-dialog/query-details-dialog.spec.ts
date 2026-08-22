import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryDetailsDialog } from './query-details-dialog';

describe('QueryDetailsDialog', () => {
  let component: QueryDetailsDialog;
  let fixture: ComponentFixture<QueryDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryDetailsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryDetailsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
