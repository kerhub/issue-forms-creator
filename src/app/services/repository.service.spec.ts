import { TestBed } from '@angular/core/testing';

import { RepositoryService } from './repository.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UntypedFormControl } from '@angular/forms';

describe('RepositoryService', () => {
  let service: RepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      teardown: { destroyAfterEach: false },
    });
    service = TestBed.inject(RepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should extract the repository name', () => {
    // Given
    let spy = jest.spyOn(service, 'loadRepositoryInfo');

    // When
    service.repositoryValidator()(
      new UntypedFormControl('https://github.com/kerhub/issue-forms-creator'),
    );

    // Then
    expect(spy).toHaveBeenCalledWith('kerhub/issue-forms-creator');
  });
});
