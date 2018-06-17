import { Component, OnInit} from '@angular/core';
import { MoviesService } from '../movies.service';
import { RouterModule, Routes } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie: object;
  review: {};
  constructor(private router: ActivatedRoute, private moviesService: MoviesService) {
    this.movie = [];
    this.review = [];
  }
  ngOnInit() {
        this.router.params.subscribe((params) => {
          // tslint:disable-next-line:prefer-const
          let id = params['id'];
          this.moviesService.getMovie(id)
           .then(movie => {
            this.movie = movie;
          });
        });

        this.router.params.subscribe((params) => {
          // tslint:disable-next-line:prefer-const
          let id = params['id'];
          this.moviesService.getReview(id)
           .then(review => {
             console.log(review);
            this.review = review;
          });
        });
      }
 }
