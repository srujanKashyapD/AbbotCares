import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigationBarComponent } from './top-navigation-bar/top-navigation-bar.component';



@NgModule({
  declarations: [TopNavigationBarComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TopNavigationBarComponent,
  ]
})
export class NavigationBarModule { }
