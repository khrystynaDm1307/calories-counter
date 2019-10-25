import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/post';
  }

  public getPosts(): Observable<Array<IPost>> {
    return this.http.get<Array<IPost>>(this.url);
  }

  public postPost(post: IPost): Observable<Array<IPost>> {
    return this.http.post<Array<IPost>>(this.url, post);
  }

  public deletePost(id: number): Observable<Array<IPost>> {
    return this.http.delete<Array<IPost>>(`${this.url}/${id}`);
  }

  public editPost(obj: IPost): Observable<Array<IPost>> {
    return this.http.put<Array<IPost>>(`${this.url}/${obj.id}`, obj);
  }
  public getPostCategory(id: number): Observable<Array<IPost>> {
    return this.http.get<Array<IPost>>(`${this.url}/${id}`);
  }
  public getOnePost(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.url}/${id}`);
  }
}
