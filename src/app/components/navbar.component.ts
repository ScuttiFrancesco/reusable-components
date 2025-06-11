import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  template: `
    <nav>
      <div></div>
      <div class="nav-items">
        <div
          [class]="
            currentRoot() === 'home' ? 'nav-item center-item' : 'nav-item'
          "
          (click)="navigateTo('home')"
        >
          <div [class]="
            currentRoot() === 'home' ? 'icon-center' : 'icon'
          ">🏠</div>
          <span class="label">Home</span>
        </div>

        <div
          [class]="
            currentRoot() === 'login' ? 'nav-item center-item' : 'nav-item'
          "
          (click)="navigateTo('login')"
        >
          <div [class]="
            currentRoot() === 'login' ? 'icon-center' : 'icon'
          ">👤</div>
          <span class="label">Login</span>
        </div>

        <div
          [class]="
            currentRoot() === 'register' ? 'nav-item center-item' : 'nav-item'
          "
          (click)="navigateTo('register')"
        >
          <div [class]="
            currentRoot() === 'register' ? 'icon-center' : 'icon'
          ">💬</div>
          <span class="label">Register</span>
        </div>
      </div>
    </nav>
  `,
  styles: `
    nav {
      background-color: white;
      border-radius: 25px;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);      
           
    }

    .nav-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0 12px;
      border-radius: 15px;
      transition: all 0.3s ease;
      
    }

    .nav-items {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 20px;
      width: 100%;
    }

    .center-item {
      transform: translateY(20px);
    }

    .icon {
      font-size: 1.5rem;
      margin-bottom: 4px;
      color: #666;
      transition: color 0.3s ease;
    }

    .icon-center {
      font-size: 1.8rem;
      margin-bottom: 4px;
      color: white;
      background: linear-gradient(45deg, #00ff88, #00cc66);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
    }

    .label {
      font-size: 0.7rem;
      color: #666;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-item.active .icon {
      color: #333;
    }

    .nav-item.active .label {
      color: #333;
      font-weight: 600;
    }

    .nav-item:not(.center-item):hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .center-item:hover .icon-center {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(0, 255, 136, 0.4);
    }
  `,
})
export class NavbarComponent implements OnInit {
  currentRoot = signal<string>('');

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set initial value
    this.updateCurrentRoot();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentRoot();
      }
    });
  }

  private updateCurrentRoot(): void {
    const url = this.router.url;
    const rootSegment = url.split('/')[1] || 'home';
    this.currentRoot.set(rootSegment);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.currentRoot.set(route);
  }
}
