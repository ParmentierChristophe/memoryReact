import React, { Component } from 'react';
import '../Card.css';

class Card extends Component {

   constructor(props){
      super(props);

      this.handleClick = this.handleClick.bind(this);

   }

   handleClick(e){
      if (!this.props.flipped) {
         this.props.checkMatch(this.props.value,this.props.id);
      }

      }


    render () {
      return(
        <div onClick={this.handleClick} className="column">
           <p className="bd-notification is-primary"  style={{backgroundColor: this.props.flipped ? this.props.value : '#00d1b2'}}>
           </p>

        </div>
      );


    }
}

export default Card;
