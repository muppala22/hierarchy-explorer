import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <div class="search-box">
        <input type="text"
               [(ngModel)]="searchText"
               (keyup.enter)="search()"
               placeholder="Search hierarchy..."
               class="search-input"
               autofocus>
        <button (click)="search()" class="search-button">Search</button>
        <button (click)="viewFullHierarchy()" class="view-all-button">View Full Hierarchy</button>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background-color: #f7fafc;
    }

    .search-box {
      width: 100%;
      max-width: 600px;
      display: flex;
      gap: 10px;
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .search-input {
      flex: 1;
      padding: 12px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 6px;

      &:focus {
        outline: none;
        border-color: #2b6cb0;
      }
    }

    .search-button, .view-all-button {
      padding: 12px 24px;
      font-size: 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .search-button {
      background-color: #2b6cb0;
      color: white;

      &:hover {
        background-color: #2c5282;
      }
    }

    .view-all-button {
      background-color: #e2e8f0;
      color: #4a5568;

      &:hover {
        background-color: #cbd5e0;
      }
    }
  `]
})
export class SearchComponent {
  searchText = '';

  constructor(private router: Router) {}

  search() {
    if (this.searchText.trim()) {
      this.router.navigate(['/hierarchy'], {
        queryParams: { search: this.searchText }
      });
    }
  }

  viewFullHierarchy() {
    this.router.navigate(['/hierarchy']);
  }
}
