import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [],
  template: `
    <div>
      @for(breadcrumb of breadcrumbs; track $index; let last = $last) { 
        @if (!last) {
          <a (click)="navigate(breadcrumb)">{{ breadcrumb.label }}</a>
          <span class="separator">/</span>
        } @else {
          <span>{{ breadcrumb.label }}</span>
        }
      }
    </div>
  `,
  styles: `
    div {
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: 1rem;
    }
    a {
      text-decoration: none;
      color: blue;
       cursor: pointer;
    }
    a:hover {
      text-decoration: underline;
     
      color: darkblue;
    }
    span {
      color: gray;
    }
    .separator {
      color: #ccc;
      font-weight: bold;
    }
  `,
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private actRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        ),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.actRoute.root);
      });
  }

  buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      // Use route data for breadcrumb label
      const breadcrumbData = child.snapshot.data['breadcrumb'];
      if (breadcrumbData) {
        breadcrumbs.push({ 
          label: breadcrumbData, 
          url: url 
        });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  navigate(breadcrumb: Breadcrumb) {
    this.router.navigateByUrl(breadcrumb.url);
  }
}

export interface Breadcrumb {
  label: string;
  url: string;
}
