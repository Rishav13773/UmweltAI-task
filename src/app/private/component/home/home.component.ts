import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NgFor, NavbarComponent],
})
export class HomeComponent {
  projects = [
    { id: 1, name: 'Project 1', description: 'This is project 1' },
    { id: 2, name: 'Project 2', description: 'This is project 2' },
    { id: 3, name: 'Project 3', description: 'This is project 3' },
  ];

  constructor(private router: Router) {}

  viewProjectDetails(id: number) {
    console.log('Navigating to project', id);
    this.router.navigate([`project/${id}`]);
  }
}
