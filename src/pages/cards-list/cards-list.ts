import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { CardsDetailPage } from '../cards-detail/cards-detail';

@Component({
    selector: 'page-cards-list',
    templateUrl: 'cards-list.html'
})

export class CardsListPage {
    
    cards: Array<{title: string, description: string}>;
    
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        
        this.cards = [
            {
                title: 'item one',
                description: 'this is the description field for the very first item of cards.'
            },
            {
                title: 'item two',
                description: 'this is the description field for the very second item of cards.'
            }
        ];
        
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