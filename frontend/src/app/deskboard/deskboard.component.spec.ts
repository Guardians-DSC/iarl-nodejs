import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskboardComponent } from './deskboard.component';

describe('DeskboardComponent', () => {
  let component: DeskboardComponent;
  let fixture: ComponentFixture<DeskboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
