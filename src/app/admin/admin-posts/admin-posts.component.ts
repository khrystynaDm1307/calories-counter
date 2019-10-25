import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/shared/services/post.service';
import { Post } from 'src/app/shared/classes/post.model';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent implements OnInit {
  public categories: Array<ICategory> = [];
  public posts: Array<IPost> = [];
  public postCategory: string;
  public postTitle: string;
  public postText: string;
  public postImage: string;

  public editId: number;
  public editStatus: boolean = false;

  public ref: AngularFireStorageReference;
  public task: AngularFireUploadTask;
  public uploadState: Observable<string>;
  public uploadProgress: Observable<number>;
  public downloadURL: Observable<string>;
  public urlImage: string;

  constructor(private categoriesService: CategoryService,
    private postService: PostService,
    private prStorage: AngularFireStorage) {
    this.getCategoriesData();
    this.getPostData();
  }

  ngOnInit() {
  }

  private getCategoriesData(): void {
    this.categoriesService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => { console.log(err); }
    );
  }

  private getPostData(): void {
    this.postService.getPosts().subscribe(
      data => {
        this.posts = data;
      },
      err => { console.log(err); }
    );
  }

  public addPost(): void {
    let category: ICategory;
    this.categories.map(el => {
      if (el.name === this.postCategory) {
        category = el;
      }
    })

    const newPost = new Post(1,
      category,
      this.postTitle,
      this.postText,
      this.postImage,
      []);

    if (this.posts.length > 0) {
      newPost.id = this.posts.slice(-1)[0].id + 1;
    }
    this.postService.postPost(newPost).subscribe(
      () => {
        this.getPostData();
      }
    );
    this.reset();
  }

  public reset(): void {
    this.postCategory = null;
    this.postTitle = '';
    this.postText = '';
    this.postImage = null;
  }


  public upload(event): void {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.prStorage.ref(`postImages/${id}`)
    this.task = this.ref.put(event.target.files[0])
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => this.postImage = url)
      })
    ).subscribe();
  }

  public deletePost(obj: IPost): void {
    this.postService.deletePost(obj.id).subscribe(
      () => {
        this.getPostData();
      }
    );
  }

  public editPost(obj: IPost): void {
    this.postCategory = obj.category.name,
      this.postTitle = obj.title,
      this.postText = obj.text,
      this.postImage = obj.image,
      this.editStatus = true;
  }

  public saveEditPost(): void {
    let category: ICategory;
    this.categories.map(el => {
      if (el.name === this.postCategory) {
        category = el;
      }
    })
    const editPost = new Post(this.editId, category, this.postTitle, this.postText, this.postImage, []);
    this.postService.editPost(editPost).subscribe(
      () => {
        this.getPostData();
      }
    );
    this.reset();
    this.editStatus = false;
  }

}
