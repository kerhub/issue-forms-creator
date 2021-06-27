import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({})
export class IconModule {
  constructor(private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry
      .addSvgIcon(
        'header-logo',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/header-logo.svg'),
      )
      .addSvgIcon(
        'github-logo',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/github-logo.svg'),
      );
  }
}
