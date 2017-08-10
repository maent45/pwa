import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-cards-detail',
    templateUrl: 'cards-detail.html'
})

export class CardsDetailPage {
    selectedCard: any;
    
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // If this card is selected then pass it as a nav param
        this.selectedCard = navParams.get('card');
    }
    
}