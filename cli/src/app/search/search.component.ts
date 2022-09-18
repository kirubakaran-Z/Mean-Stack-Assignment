import { Component, OnInit } from '@angular/core';
import { MovieapiService } from '../services/movieapi.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  posts: any;
  userMessage = 'Search To See Results';
  gotresponse = false;
  SearchKey = '';
  constructor(private service: MovieapiService) {}
  searchMovie() {
    if (this.SearchKey == '') {
      this.userMessage = 'Search To See Results';
      return;
    }
    this.service.getPosts(this.SearchKey).subscribe((response) => {
      type Response = {
        Response?: string;
        totalResults?: string;
        Search?: any[];
        Error: string;
      };
      let data = response as Response;
      if (data.Response == 'True') {
        this.userMessage = data.totalResults + ' results found';
        this.gotresponse = true;
        this.posts = data.Search;
      } else {
        this.userMessage = data.Error;
      }
    });
  }
  ngOnInit(): void {}
}
