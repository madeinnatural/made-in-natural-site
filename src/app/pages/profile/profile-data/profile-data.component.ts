import { UserService } from './../../../core/global/user.service';
import User from 'src/app/core/model/User';
import { AccountService } from './../../../core/account/account.service';

import { Router } from '@angular/router';
import { ServerService } from './../../../core/server/server.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {

  @Input('user') user?: User

  constructor(
    private serverService:ServerService,
    private userService: UserService,
    public router: Router
  ) {
    if (this.user) {

    } else {
      this.user = userService.user;
    }
  }

  ngOnInit() {}


}
