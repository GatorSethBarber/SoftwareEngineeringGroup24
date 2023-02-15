import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { CARDS } from '../mock-cards';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  public state = "";
  cards = CARDS;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {  }

  ngOnInit() {
    this.state = window.history.state.brandName;
  }

}
