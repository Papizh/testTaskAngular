import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem("username", "Admin");
    localStorage.setItem("password", "12345");
    console.log("set local s")
  }

}
