import { UserSessionService } from './../../services/user-session/user-session.service';
import { GlobalService } from './../../services/global/global.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private userSessionService: UserSessionService
  ) {}

  viewName: string;
  title: string;
  detail: string;
  showLogout = false;

  ngOnInit() {
    // Initialize config.
    this.globalService.setConfig();

    // Get the data sent along with the route
    this.viewName = this.route.snapshot.data.message;

    // Switch to view name for getting title and detail.
    // @TODO - Add localization and pick up text from i18 assets.
    switch (this.viewName) {
      case 'home':
        this.title = 'Home';
        this.detail = 'Welcome, you have successfully logged in. ';
        this.showLogout = true;
        break;

      case 'error':
        this.title = 'An error occurred';
        this.detail = 'Something went wrong. Please close this browser window and try again. ';
        break;

      case 'logout':
        this.title = 'You have logged out.';
        break;

      default:
        this.title = 'Not found';
        // tslint:disable-next-line:quotemark
        this.detail = "The page that you're looking for cannot be found.";
        break;
    }
  }

  logout = () => {
    this.userSessionService.logout().subscribe(
      (response) => {
        if (response.result.includes('logged out')) {
          this.router.navigate(['logout']);
        }
      },
      (errors) => {
        if (errors.status === 401) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['error']);
        }
      }
    );
  };
}
