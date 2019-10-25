import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  opened = false;
  constructor(private UserService: UserService) {
  }

  ngOnInit() {

  }

  open() {
    this.opened = true;
  }
  close() {
    this.opened = false;
  }

}
