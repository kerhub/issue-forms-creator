import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { YamlService } from '../../services/yaml.service';
import { Issue } from '../../models/issue';
import { PresetEnum } from '../../enums/preset.enum';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-template-selection',
  templateUrl: './template-selection.component.html',
  styleUrls: ['./template-selection.component.scss'],
})
export class TemplateSelectionComponent {
  PresetEnum = PresetEnum;

  @Output() createNew: EventEmitter<void> = new EventEmitter<void>();
  @Output() createWithContent: EventEmitter<Issue> = new EventEmitter<Issue>();
  @Output() createWithPreset: EventEmitter<PresetEnum> = new EventEmitter<PresetEnum>();
  @Output() closeSelection: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly yamlService: YamlService) {}

  loadYamlFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] as File;
    if (file.type === 'application/x-yaml') {
      this.yamlService.parseYamlFile(file).subscribe(value => this.createWithContent.emit(value));
    } else {
      // TODO: error
    }
  }

  async loadYamlContent(): Promise<void> {
    const clipboard = await navigator.clipboard.readText();
    const parsed = this.yamlService.parseYamlContent(clipboard);
    this.createWithContent.emit(parsed);
  }
}

@NgModule({
  declarations: [TemplateSelectionComponent],
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  exports: [TemplateSelectionComponent],
})
export class TemplateSelectionModule {}
