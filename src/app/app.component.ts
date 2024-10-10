import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { UsersDataService } from './services/users-data.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MatTableDataSource } from '@angular/material/table';
import { ServiceModule } from './service.module';
import { User } from './models/user.model';
import { QuoteDataService } from './services/quote-data.service';
import { Quote } from './models/quotes.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    MatTableModule,
    HttpClientModule, // Make sure HttpClientModule is imported here
    ServiceModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-basics';
  isDetailsVisible: boolean = false;
  isQuoteDetailsVisible: boolean = false;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'city'];
  quoteDataSource = new MatTableDataSource<Quote>();
  displayedQuoteColumns: string[] = ['id', 'quote', 'author'];

  // Quote data
  quotes: Quote[] = []; // Store all quotes
  groupedQuotes: { [author: string]: Quote[] } = {};

  constructor(
    private userData: UsersDataService,
    private quoteData: QuoteDataService
  ) {
    this.fetchUsers();
    this.fetchQuotes();
  }

  fetchUsers() {
    this.userData.users().subscribe(
      (data: User[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchQuotes() {
    this.quoteData.getQuotes().subscribe(
      (data: any) => {
        console.log('Fetched Quotes:', data); // Log the entire response from the API
        this.quotes = data.quotes; // Ensure you are accessing the quotes array
        console.log('Quotes Array:', this.quotes); // Log the quotes array
        this.quoteDataSource.data = this.quotes; // Assign fetched quotes to the data source
        this.groupQuotesByAuthor(); // Call to group quotes after fetching
      },
      (error) => {
        console.error('Error fetching quotes:', error);
      }
    );
  }

  groupQuotesByAuthor() {
    console.log('Grouping quotes by author...'); // Log to check if grouping starts
    this.quotes.forEach((quote) => {
      if (!this.groupedQuotes[quote.author]) {
        this.groupedQuotes[quote.author] = []; // Initialize array for new author
      }
      this.groupedQuotes[quote.author].push(quote); // Push quote to author's array
    });

    // Log grouped quotes to the console
    console.log('Grouped Quotes by Author:', this.groupedQuotes);
  }
}
