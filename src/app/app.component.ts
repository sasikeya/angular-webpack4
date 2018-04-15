import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'esen-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit(): void {
    console.log(process.env.NODE_ENV)
  }
}
