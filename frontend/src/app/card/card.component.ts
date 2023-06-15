import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  title!: string;

  message: string;
  currentTime: Date;

  constructor() {
    this.message = '';
    this.currentTime = new Date();
   }

  ngOnInit(): void {
  }

}
