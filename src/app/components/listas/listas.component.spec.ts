import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular/lazy';

import { ListasComponent } from './listas.component';

describe('ListasComponent', () => {
  let component: ListasComponent;
  let fixture: ComponentFixture<ListasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListasComponent],
      imports: [IonicModule.forRoot()],
    });

    fixture = TestBed.createComponent(ListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
