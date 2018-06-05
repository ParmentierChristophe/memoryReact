import React, { Component } from 'react';
import Card from './Card';


function colors(){

      return [{value:"#3B1F2B",flipped: false,matched: false},
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
            }



class Game extends Component {


   constructor(props){
      super(props);

      this.arrayShuffle = this.arrayShuffle.bind(this);
      this.getCards = this.getCards.bind(this);
      this.checkMatch = this.checkMatch.bind(this);
      this.reset = this.reset.bind(this);
      this.state = {
        cards: this.getCards(),
        lastCard:null,
        locked: false,
        score: 0

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
       var playingCards = this.arrayShuffle(colors());
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
             checkMatch={this.checkMatch}
            />
        );
     });
  };

  checkMatch = (value,id) => {
    if (this.state.locked) {
   return;
    }

    var cards = this.state.cards;
    cards[id].flipped = true;
    this.setState({locked: true});

    if (this.state.lastCard) {
      if (value === this.state.lastCard.value && !this.state.lastCard.flipped) {
        cards[id].matched = true;
        var score = this.state.score;
        cards[this.state.lastCard.id].matched = true;
        this.setState({ cards,lastCard: null, locked: false, score: score+1});
        console.log('win');
      } else {
        setTimeout(() => {
          cards[id].flipped = false;
          cards[this.state.lastCard.id].flipped = false;
          this.setState({
            lastCard: null,locked: false});
            console.log('lose');

        }, 1000);
      }
    } else {
      this.setState({
        lastCard: {id, value},
        locked: false

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

   reset() {
     this.setState({
       cards: this.getCards(),
       lastCard:null,
       locked: false,
       score: 0
     });
   }




  render () {
    var btnText = 'Recommencer';
    if (this.state.score === this.state.cards.length / 2) {
      btnText = 'Gagner ! Recommencer ?';
    }

    var title = 'jeu des paires';

   return(
   <div className="container">
    <h1 className="title">{title}</h1>


    {this.createBoard(this.renderCards(this.state.cards))}
    <h2 className="subtitle">votre score: {this.state.score}</h2>
    <a onClick={this.reset} className="button is-info">{btnText}</a>

   </div>
   );


 }
}

export default Game;
