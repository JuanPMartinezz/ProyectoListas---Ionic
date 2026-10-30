import { TestBed } from '@angular/core/testing';
import { Lista } from './lista';

describe('Lista', () => {
  let service: Lista;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lista);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
