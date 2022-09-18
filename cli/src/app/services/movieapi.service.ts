import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieapiService {
  private url = 'https://www.omdbapi.com/?apikey=a578918b&s=';
  constructor(private httpClient: HttpClient) {}
  getPosts(key: string) {
    return this.httpClient.get(this.url + key);
  }
}
