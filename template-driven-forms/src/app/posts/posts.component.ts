import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {AppError} from '../Common/app-error';
import {NotFoundError} from '../Common/not-found-error';
import {BadInput} from '../Common/bad-input';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private service: PostService) {
    /*http.get(this.url)
      .subscribe(response => {
        this.posts = response.json();
      });*/
  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(
        response => {
          this.posts = response.json();
        });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';
    this.service.createPost(post)
      .subscribe(
        response => {
          post['id'] = response.json().id;
          this.posts.splice(0,0, post);
      },(error: AppError) => {
          if (error instanceof BadInput) {
           // this.form.setErrors(error.originalError);
          }
          else throw error;
        });
  }

  updatePost(post) {
    this.service.updatePOst(this.posts)
      .subscribe(
        response => {
          console.log(response.json());
      });
  }

  deletePost(post) {
    this.service.deletePost(345)
      .subscribe(
        response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
          console.log('Item deleted at id', post.id);
      },(error: AppError) => {
          if (error instanceof NotFoundError)
            alert('This post has already been deleted.');
          else throw error;
        });
  }
}
