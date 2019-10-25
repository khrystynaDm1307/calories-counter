import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public categories: Array<ICategory> = [];
  constructor(private categoryService: CategoryService) {
    this.getData();
  }

  ngOnInit() {
  }

  private getData(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => { console.log(err); }
    );
  }

}
