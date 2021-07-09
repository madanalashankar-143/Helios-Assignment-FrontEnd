import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userDetails: any;
  constructor(private userServices: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userServices.getUserProfile().subscribe(
      res => {
        this.userDetails = res.constructor(['user']);
      },
      err => {

      }
    )
  }

  onLogout() {
    this.userServices.deleteToken();
    this.router.navigateByUrl('/login');
  }

}
