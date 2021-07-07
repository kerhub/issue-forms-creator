import { TestBed } from '@angular/core/testing';

import { YamlService } from './yaml.service';

describe('YamlService', () => {
  let service: YamlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YamlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
