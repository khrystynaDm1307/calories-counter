import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { IDay } from 'src/app/shared/interfaces/day.interface';
import { User, UserFb } from 'src/app/shared/classes/user.model';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  // public isUserAlreadySignUp = false;
  // usersArray: Array<any>;
  user: UserFb = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    emailVerified: false,
    sex: '',
    height: 0,
    weightStart: 0,
    weightGoal: 0,
    activity: 0,
    days: [],
    url: ''
  };
  confirm: string;
  // days: Array<IDay>;

  constructor() { }

  ngOnInit() {
  }

  public gender(sex: string): void {
    if (sex === 'male') {
      this.user.sex = 'male';
    }
    else {
      this.user.sex = 'female';
    }
  }

  public active(index: number): void {
    switch (index) {
      case 1.2: this.user.activity = 1.2;
        break;
      case 1.5: this.user.activity = 1.5;
        break;
      case 1.9: this.user.activity = 1.9;
        break;
    }
  }
}
