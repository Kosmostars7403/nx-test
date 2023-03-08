import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcMapComponent } from './components/cc-map/cc-map.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CcMapComponent],
  exports: [CcMapComponent]
})
export class CcCesiumModule {}
