import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [],
})
export class NavbarComponent {
  menuOpen = false; // Tracks if the menu is open or closed

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Toggle the menu visibility
  }

  logout() {
    localStorage.removeItem('authToken'); // Clear token on logout
    this.router.navigate(['']); // Redirect to login page
  }
}
