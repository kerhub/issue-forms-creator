import { CheckboxesCreatorComponent } from './checkboxes-creator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { checkboxesForm } from '../../../test/test.util';

describe('CheckboxesCreatorComponent', () => {
  it('should create', () => {
    cy.mount(CheckboxesCreatorComponent, {
      componentProperties: {
        formGroup: checkboxesForm(),
      },
      imports: [BrowserAnimationsModule],
    });
  });
});
