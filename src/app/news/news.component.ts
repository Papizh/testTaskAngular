import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { User } from '../models/user';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  users: User[];
  constructor(private serviceNews: NewsService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.serviceNews.getUsers()
      .subscribe(users => {
        this.users = users;
        console.log(users)
      })
  }
}
