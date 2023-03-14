import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-test-common-ui-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-ui-sidebar.component.html',
  styleUrls: ['./common-ui-sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonUiSidebarComponent {
  @Output() backdropClick = new EventEmitter<void>()
}
