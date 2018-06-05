import React, { Component } from 'react';
import Card from './Card';


var colors=  [{value:"#3B1F2B",flipped: false,matched: false},
              {value:"#0081AF",flipped: false,matched: false},
              {value:"#DBDFAC",flipped: false,matched: false},
              {value:"#5F758E",flipped: false,matched: false},
              {value:"#FAD955",flipped: false,matched: false},
              {value:"#6320EE",flipped: false,matched: false},
              {value:"#FB3640",flipped: false,matched: false},
              {value:"#3B1F2B",flipped: false,matched: false},
              {value:"#0081AF",flipped: false,matched: false},
              {value:"#DBDFAC",flipped: false,matched: false},
              {value:"#5F758E",flipped: false,matched: false},
              {value:"#FAD955",flipped: false,matched: false},
              {value:"#6320EE",flipped: false,matched: false},
              {value:"#FB3640",flipped: false,matched: false}]



class Game extends Component {


   constructor(props){
      super(props);

      this.arrayShuffle = this.arrayShuffle.bind(this);
      this.getCards = this.getCards.bind(this);
      this.checkMatch = this.checkMatch.bind(this);
      this.state = {
        cards: this.getCards(),
        lastCard:null
      };
   };





  arrayShuffle =  (items) =>{
       var currentIndex = items.length,
           temporaryValue, randomIndex;
       while (0 !== currentIndex) {
           randomIndex = Math.floor(Math.random() * currentIndex);
           currentIndex -= 1;

           temporaryValue = items[currentIndex];
           items[currentIndex] = items[randomIndex];
           items[randomIndex] = temporaryValue;
       }
       return items
   };

  getCards = () => {
       var playingCards = this.arrayShuffle(colors);
       return  playingCards
   };


  renderCards = (cards) => {
      return cards.map((card, index) => {
        return(
           <Card
             key={index}
             value={card.value}
             id={index}
             matched={card.matched}
             flipped={card.flipped}
             checkMatch={this.checkMatch}/>
        );
     });
  };

  checkMatch = (value,id) => {
    var cards = this.state.cards;
    cards[id].flipped = true;

    if (this.state.lastCard) {
      if (value === this.state.lastCard.value && !this.state.lastCard.flipped) {
        cards[id].matched = true;
        cards[this.state.lastCard.id].matched = true;
        this.setState({lastCard: null});
        console.log('win');
      } else {
        setTimeout(() => {
          cards[id].flipped = false;
          cards[this.state.lastCard.id].flipped = false;
          this.setState({cards: this.state.cards,
            lastCard: null});
            console.log('lose');

        }, 1000);
      }
    } else {
      this.setState({
        lastCard: {id, value},

      });

    }
  }

  createBoard = (card) =>{
      let row = [];

      for (let i = 0; i < 2; i++) {
         let column = [];

         for (let j = 0; j < 7; j++) {
            column.push(card[0]);
            card.splice(card, 1);


         }
         row.push(<div key={i} className="columns is-tablet">{column}</div>);
      }
      return row

   }





  render () {


    var title = 'jeu des paires';

   return(
   <div className="container">
    <h1 className="title">{title}</h1>

    {this.createBoard(this.renderCards(this.state.cards))}

   </div>
   );


 }
}

export default Game;
