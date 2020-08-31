import { Location }          from '@angular/common';
import { ActivatedRoute }    from '@angular/router';
import { Component, OnInit}  from '@angular/core';

import { Hero }              from '../hero';
import { HeroService }       from '../hero.service';
import { MessageService }    from '../message.service';

@Component({
  selector       :  'app-hero-detail',
  templateUrl    :  './hero-detail.component.html',
  styleUrls      : ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero : Hero;

  constructor(
    private route            :  ActivatedRoute,
    private heroService      :  HeroService,
    private messageService   :  MessageService,
    private location         :  Location
    ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    //+ sign converts string to number
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService
        .getHero(id)
        .subscribe(hero => this.hero = hero);
  }

  goBack():void {
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.hero)
      .subscribe( () => this.goBack());
  }
}
