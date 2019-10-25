import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/classes/category.model';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public categories: Array<ICategory>;

  public name: string;
  public aboutName: string;
  public description: string;
  public editId: number;
  public editStatus: boolean;

  public ref: AngularFireStorageReference;
  public task: AngularFireUploadTask;
  public uploadState: Observable<string>;
  public uploadProgress: Observable<number>;
  public downloadURL: Observable<string>;
  public urlImage: string;
  public categoryImage: string;

  constructor(private categoryService: CategoryService,
    private prStorage: AngularFireStorage) {
    this.getData();
  }

  ngOnInit() { }

  private getData(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => { console.log(err); }
    );
  }

  public addCategory(): void {
    const newCat = new Category(1, this.name, this.aboutName, this.description, this.categoryImage);
    if (this.categories.length > 0) {
      newCat.id = this.categories.slice(-1)[0].id + 1;
    }
    this.categoryService.addCategory(newCat).subscribe(
      () => {
        this.getData();
      }
    );
    this.reset();
  }

  public reset(): void {
    this.name = '';
    this.aboutName = '';
    this.description = '';
  }

  public deleteCategory(obj: ICategory): void {
    this.categoryService.deleteCategory(obj.id).subscribe(
      () => {
        this.getData();
      }
    );
  }

  public editCategory(obj: ICategory): void {
    this.name = obj.name;
    this.aboutName = obj.aboutName;
    this.description = obj.description;
    this.editId = obj.id;
    this.editStatus = true;
  }

  public saveEditCategory(): void {
    const editCategory = new Category(this.editId, this.name, this.aboutName, this.description, this.categoryImage);
    this.categoryService.editCategory(editCategory).subscribe(
      () => {
        this.getData();
      }
    );
    this.reset()
    this.editStatus = false;
  }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.prStorage.ref(`postImages/${id}`)
    this.task = this.ref.put(event.target.files[0])
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => this.categoryImage = url)
      })
    ).subscribe();
  }
}
