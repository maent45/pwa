import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { CardsDetailPage } from '../cards-detail/cards-detail';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-cards-list',
    templateUrl: 'cards-list.html'
})

export class CardsListPage {
    
    cards: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
        
        let endpoint = {
          query: `
            {
              readRiskCards {
                edges {
                  node {
                    ID
                    Title
                    Desc
                    Image {
                      url
                    }
                  }
                }
              }
            }`
        };
        
        this.http.post('http://riskcards-maen.accdev.co.nz/graphql', endpoint).map(res => res.json()).subscribe(
            data => {
                console.log("got it",data);
                
                // insert query response into cards array
                this.cards = data.data.readRiskCards.edges;
                console.log('new val', this.cards);
            },
            err => {
                console.log("Oops!");
            }
        );
        
        for (let i = 0; i < 2; i++) {
            this.cards;
        }
        
    }
    
    itemClicked(event, card) {
        this.navCtrl.push(CardsDetailPage, {
            card: card
        });
    }
    
}