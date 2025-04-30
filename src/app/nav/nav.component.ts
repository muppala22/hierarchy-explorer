import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="nav-bar">
      <div class="nav-content">
        <div class="nav-brand">
          <a routerLink="/search">Hierarchy Explorer</a>
        </div>
        <div class="nav-links">
          <a routerLink="/search"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{exact: true}">Search</a>
          <a routerLink="/hierarchy"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{exact: true}">Hierarchy</a>
          <button class="logout-btn" (click)="logout()">
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-bar {
      background-color: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      border-bottom: 1px solid rgba(229, 231, 235, 0.8);
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0.75rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3.5rem;
    }

    .nav-brand a {
      color: #1e40af;
      font-size: 1.25rem;
      font-weight: 600;
      text-decoration: none;
      letter-spacing: -0.025em;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .nav-links a {
      color: #4b5563;
      text-decoration: none;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      transition: all 0.2s ease;
      font-weight: 500;
      font-size: 0.95rem;
    }

    .nav-links a:hover {
      color: #1e40af;
      background-color: #f8fafc;
    }

    .nav-links a.active {
      color: #1e40af;
      background-color: #eff6ff;
    }

    .logout-btn {
      background-color: #ef4444;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 500;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .logout-btn:hover {
      background-color: #dc2626;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logout-btn:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }
  `]
})


export class NavComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.router.navigate(['/logout']);
  }
}
