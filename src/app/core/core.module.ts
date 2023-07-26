import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '404', component: PageNotFoundComponent }
    ])
  ],
  exports: [NavigationBarModule]
})
export class CoreModule { }
