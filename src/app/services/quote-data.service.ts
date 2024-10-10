import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/quotes.model'; // Import the Quote model

@Injectable({
  providedIn: 'root',
})
export class QuoteDataService {
  private apiUrl = 'https://dummyjson.com/quotes'; // Your API endpoint

  constructor(private http: HttpClient) {}

  // Method to fetch quotes from the API
  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl); // Directly return the array of quotes
  }
}
