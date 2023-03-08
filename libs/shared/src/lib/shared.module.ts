import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CESIUM_API_KEY } from './tokens/cesium-access.token';

@NgModule({
  imports: [CommonModule],
})
export class SharedModule {}

export {
  CESIUM_API_KEY
}
