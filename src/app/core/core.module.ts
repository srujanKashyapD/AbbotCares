import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [NavigationBarModule, PageNotFoundModule]
})
export class CoreModule { }
