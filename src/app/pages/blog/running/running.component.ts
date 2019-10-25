import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { PostService } from 'src/app/shared/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ICategory } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-running',
  templateUrl: './running.component.html',
  styleUrls: ['./running.component.scss']
})
export class RunningComponent implements OnInit {
  public postId: number;
  public cat:ICategory;
  public view: Array<IPost>;
  public pageTitle:string;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.getPosts();
  }

  ngOnInit() {
  }

  public getPosts(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPosts().subscribe(
      data => {  
        this.view = data.filter(el => el.category.id === this.postId);
        this.pageTitle=this.view[0].category.name;
      }
    )
  }

  public goBack(): void {
    this.location.back();
  }
}
