import { Component } from '@angular/core';
import { ServiceModule } from './service.module'; // Adjust the path as necessary
import { UsersDataService } from './services/users-data.service';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ServiceModule, CommonModule, MatSlideToggleModule, FormsModule], // Import ServiceModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-basics';
  users: any[] = [];
  isDetailsVisible: boolean = false;

  constructor(private userData: UsersDataService) {
    this.fetchUsers(); // Fetch users on initialization
  }

  fetchUsers() {
    this.userData.users().subscribe(
      (data: any) => {
        // console.warn('data', data);
        this.users = data; // Assign the fetched data to the users property
      },
      (error) => {
        console.error('Error fetching users:', error); // Handle error
      }
    );
  }
}
