import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { IDay, IProduct, IMeal } from 'src/app/shared/interfaces/day.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { AngularFirestore, } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Day, Product } from 'src/app/shared/classes/day.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public kk: number;
  public productsArray: Array<IProduct>;
  public whichMealx: string;
  public product: string;
  public weightProduct: number;
  public index: number;
  public arrayToAdd: Array<IMeal> = [];
  public editDel = true;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;

  public enter = true;
  public profile = true;
  public calendar = false;
  public results = false;
  public user: any = {
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

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          max: 2000,
          min: 0,
          stepSize: 100
        }
      }]
    }
  };

  public days: Array<string> = [];
  public caloriesDay: Array<number> = [];
  public barChartLabels = this.days;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: this.caloriesDay, label: 'Calories/day' },
  ];

  constructor(private UserService: UserService,
              private productService: ProductService,
              private firestore: AngularFirestore,
              private prStorage: AngularFireStorage) {
    const id = JSON.parse(localStorage.getItem('user')).uid;
    this.UserService.getOneUser(id).subscribe(
      data => {
        this.user = data.payload.data();
        this.gender();
      }
    );
  }

  ngOnInit() {
    this.productsArray = this.productService.getProducts();
    const id = JSON.parse(localStorage.getItem('user')).uid;
    this.UserService.getOneUser(id).subscribe(
      data => {
        this.user = data.payload.data();
      }
    );
    this.gender();
  }

  public gender(): void {
    if (this.user.sex === 'male') {
      this.kk = 65.51 + (9.6 * this.user.weightStart) + (1.85 * this.user.height);
      this.kk = Math.round((this.kk - 100) * 0.8);
    } else {
      this.kk = 66.47 + (13.75 * this.user.weightStart) + (5 * this.user.height);
      this.kk = Math.round((this.kk - 140) * 0.8);
    }
    console.log(this.kk);

  }
  public addDay(): void {
    const day: IDay = new Day(1, [], [], [], 0);
    if (this.user.days.length > 0) {
      day.id = this.user.days[0].id + 1;
    }
    this.user.days.unshift(day);
    this.firestore.doc('users/' + this.user.uid).update(this.user);
  }

  // до якого прийому їжі модалка додаватиме продукти
  public whichMeal(name: string, i: number): void {
    this.whichMealx = name;
    this.index = i;
    switch (this.whichMealx) {
      case 'b': this.arrayToAdd = this.user.days[this.index].breakfast;
                break;
      case 'l': this.arrayToAdd = this.user.days[this.index].lunch;
                break;
      case 'd': this.arrayToAdd = this.user.days[this.index].dinner;
                break;
    }
  }


  public addProduct(): void {
    let productToAdd = new Product('', 0);
    this.productsArray.map(el => {
      if (this.product === el.name) {
        productToAdd = el;
      }
    })
    const meal: IMeal = {
      product: productToAdd,
      weight: this.weightProduct
    };
    this.arrayToAdd.unshift(meal);
  }

  public save(): void {
    switch (this.whichMealx) {
      case 'b': this.user.days[this.index].breakfast = this.arrayToAdd;
                break;
      case 'l': this.user.days[this.index].lunch = this.arrayToAdd;
                break;
      case 'd': this.user.days[this.index].dinner = this.arrayToAdd;
                break;
    }
    this.arrayToAdd = [];

    // count calories
    this.user.days[this.index].counter = 0;
    this.user.days[this.index].breakfast.forEach(el => {
      this.user.days[this.index].counter += el.product.calories * el.weight / 100;
    })
    this.user.days[this.index].lunch.forEach(el => {
      this.user.days[this.index].counter += el.product.calories * el.weight / 100;
    })
    this.user.days[this.index].dinner.forEach(el => {
      this.user.days[this.index].counter += el.product.calories * el.weight / 100;
    })
    this.firestore.doc('users/' + this.user.uid).update(this.user);
    this.weightProduct = 0;
    this.product = '';
  }

  public deleteDay(i: number): void {
    this.user.days.splice(i, 1);
    this.firestore.doc('users/' + this.user.uid).update(this.user);
  }

  public edit(i: number): void {
    this.weightProduct = this.arrayToAdd[i].weight;
    this.product = this.arrayToAdd[i].product.name;
    this.editDel = false;
  }
  public saveEdit(i: number): void {
    let productToAdd: IProduct = { name: '', calories: 0 };
    this.productsArray.map(el => {
      if (this.product === el.name) {
        productToAdd = el;
      }
    })
    this.arrayToAdd[i].weight = this.weightProduct;
    this.arrayToAdd[i].product = productToAdd;
    this.editDel = true;
  }

  public deleteProduct(i: number): void {
    this.arrayToAdd.splice(i, 1);
  }

  public pages(page: string):void {
    switch (page) {
      case 'profile': this.profile = true;
                      this.calendar = false;
                      this.results = false;
                      console.log(this.user);

                      break;
      case 'calendar': this.calendar = true;
                       this.profile = false;
                       this.results = false;
                       break;
      case 'results': this.results = true;
                      this.profile = false;
                      this.calendar = false;
                      this.user.days.map((el, index) => {
          this.days[index] = el.id;
        })
                      this.user.days.map((el, index) => {
          this.caloriesDay[index] = el.counter;
        })
                      break;
    }
  }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.prStorage.ref(`users/${id}`)
    this.task = this.ref.put(event.target.files[0])
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => this.user.photoURL = url)
        console.log(this.user);

      })
    ).subscribe();
    this.firestore.doc('users/' + this.user.uid).update(this.user);
  }
}

