import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { UsersDataService } from './services/users-data.service'; // Adjust the path as necessary
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MatTableDataSource } from '@angular/material/table'; // Data source for Material Table
import { ServiceModule } from './service.module';
import { User } from './models/user.model';  //importing user model 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    MatTableModule,
    HttpClientModule, // Import HttpClientModule here
    ServiceModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-basics';
  dataSource = new MatTableDataSource<User>(); // Create a MatTableDataSource
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'city']; // Define the columns to display
  isDetailsVisible: boolean = false; // Control visibility of user details

  constructor(private userData: UsersDataService) {
    this.fetchUsers(); // Fetch users on initialization
  }

  fetchUsers() {
    this.userData.users().subscribe(
      (data: User[]) => {
        this.dataSource.data = data; // Assign the fetched data to the dataSource
      },
      (error) => {
        console.error('Error fetching users:', error); // Handle error
      }
    );
  }
}
