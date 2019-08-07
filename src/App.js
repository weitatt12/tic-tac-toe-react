import React from 'react';
import logo from './logo.svg';
import './App.css';

const winningCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

const initialState = {
  box1: '',
  box2: '',
  box3: '',
  box4: '',
  box5: '',
  box6: '',
  box7: '',
  box8: '',
  box9: '',
  turn: 0,
  displayMessage: ''
}

class App extends React.Component {
  state = initialState


  handleClickBox = event => {
    const { turn } = this.state
    const { id } = event.target
    let displayMessage = ''

    if (this.state[id] !== '') {
      this.setState({ displayMessage: 'Box is filled' })
      return
    }

    this.setState({
      [id]: turn % 2 ? 'X' : 'O',
      turn: turn + 1,
      displayMessage: displayMessage
    })
  }

  checkWin = () => {
    let winner = false
    winningCombos.forEach(combo => {
      let checkRow = combo.map(pos => {
        return this.state[`box${pos}`]
      })
      if (checkRow.join('') === 'XXX' || checkRow.join('') === 'OOO') {
        winner = true
      }
    })
    return winner
  }

  resetGame = () => {
    this.setState(initialState)
  }

  render() {
    const {
      displayMessage,
      turn,
      box1,
      box2,
      box3,
      box4,
      box5,
      box6,
      box7,
      box8,
      box9
    } = this.state
    return (
      <div className="bigbox">
        {
          this.checkWin()
            ? <h1>Congratulations,{turn % 2 ? 'O' : 'X'} has won!</h1>
            : (turn === 9
              ? <h1>It's a draw!</h1>
              : <h1>Let's play!</h1>)
        }

        <div id='board' className='container'>

          <div id='box1' onClick={this.handleClickBox}> {box1} </div>
          <div id='box2' onClick={this.handleClickBox}> {box2} </div>
          <div id='box3' onClick={this.handleClickBox}> {box3} </div>

          <div id='box4' onClick={this.handleClickBox}> {box4} </div>
          <div id='box5' onClick={this.handleClickBox}> {box5} </div>
          <div id='box6' onClick={this.handleClickBox}> {box6} </div>

          <div id='box7' onClick={this.handleClickBox}> {box7} </div>
          <div id='box8' onClick={this.handleClickBox}> {box8} </div>
          <div id='box9' onClick={this.handleClickBox}> {box9} </div>
        </div>

        {displayMessage ? <p>{displayMessage}</p> : ''}

      </div>
    )
  }
}
export default App