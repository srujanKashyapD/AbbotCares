import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation-bar',
  templateUrl: './top-navigation-bar.component.html',
  styleUrls: ['./top-navigation-bar.component.css']
})
export class TopNavigationBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickLogo(): void {
    this.router.navigate(['login']);

  }

  onClickTitle(): void {
    this.onClickLogo();

  }

}
