import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares!: any[];
  xIsNext!: boolean;
  winner!: string;
  countMove:  number = 0;
  result!: string;
  xCount: number = 0;
  yCount: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }
  newGame() {
    this.countMove = 0;
    this.squares = Array(9).fill(null);
    this.winner = "";
    this.result = "";
    this.xIsNext = true;
  }
  get player(){
    return this.xIsNext ? 'X' : 'O';
  }
  makeMove(idx: number){
    if(this.winner=="Tie" || this.winner=='X' || this.winner=='O')
      return;
    if(!this.squares[idx]){
      //this.squares.splice(idx, 1, this.player);
      this.squares[idx]=this.player;
    }
    this.winner = this.calculateWinner();
    this.xIsNext = !this.xIsNext;
    this.countMove++;
    if(this.countMove===9 && !this.winner){
      this.result = "Game Ties";
      this.winner = "Tie";
      console.log(this.winner, this.result);
    }
    else if(this.winner){
      this.result = "Player " + this.winner + " won the game";
      if(this.winner=='X')
        this.xCount++;
      else
        this.yCount++;
    }
    console.log(this.xCount, this.yCount);
  }
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
