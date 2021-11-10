import React from 'react';
import ReactDOM from 'react-dom';

const Square = ({value, onClick, i, j})=> {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

const Board = ({squares, nsquares, onClick}) =>{
  const [array, setArray] = React.useState([])
  React.useEffect(() => {
    if(nsquares >0){
      setArray([...Array(parseInt(nsquares)).keys()])
    }
  }, [nsquares]);
  

    return (
      <div>
        {array &&array.map(x=>(
        <div className="board-row" key={`x${x}`}>
          { array && array.map(n=>(
            <Square key={`n${n}`} value={squares[`${x}${n}`]} onClick={()=> onClick(x,n)} /> 
          ))}
        </div>))}
      </div>
    );
  }

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        squares: {},
      stepNumber: 0,
      xIsNext: true,
      nsquares: 3
    };
  }

  handleClick(i, n) {
    const {squares, nsquares} = this.state;
    if (calculateWinner(squares, nsquares) || squares[`${i}${n}`]) {
      return;
    }
    squares[`${i}${n}`] = this.state.xIsNext ? "X" : "O";
    console.log(squares)
    this.setState({
          squares,
      stepNumber: squares.length,
      xIsNext: !this.state.xIsNext
    });
  }

  resetGame(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      squares: {}
    });
  }

  handleNsquares(e) {
    const number = e.target.value;
    this.setState({
      nsquares: number,
        squares: new Array(number).fill(0).map(_ => new Array(number).fill(""))
    });
  }

  render() {
    const {squares, nsquares} = this.state;
    const winner = calculateWinner(squares, nsquares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={(i, n) => this.handleClick(i, n)}
            nsquares={nsquares}
          />
        </div>
        <div className="game-info">
          <label>squares in row: </label>
          <input
            type="text"
            name="nsquares"
            value={nsquares}
            onChange={(e) => this.handleNsquares(e)}
          />
          <div>{status}</div>
        </div>
        <button className="square" onClick={()=> this.resetGame(0)}>
      reset game
    </button>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

const hlines = (n) =>{
  let arr = []
for ( let i = 0; i < n ; i++) {
    if(!arr[i])
        arr[i] = []
    for ( let j = 0; j < n ; j++)
        arr[i][j] = i + "" + j
}
 return arr
}

const vlines = (n) =>{
  let arr = []
for ( let i = 0; i < n ; i++) {
    if(!arr[i])
        arr[i] = []
    for ( let j = 0; j < n ; j++)
        arr[i][j] = j + "" + i
}
 return arr
}

const llines = (n) => {
  let arr = []
for ( let i = 0; i < n ; i++) {
        arr[i] = i + "" + i
}
 return arr

}

const rlines = (n) => {
  let arr = []
  let j = 0
for ( let i = n-1; i >= 0 ; i--) {
        arr[i] = j + "" + i
        j++
}
 return arr
}

function calculateWinner(squares, nsquares) {
  const number = parseInt(nsquares)
  if(Object.keys(squares).length >= number){
    const hline = hlines(number)
    const vline = vlines(number)
    const lline = llines(number)
    const rline = rlines(number)
  const lines = [
    ...hline,
    ...vline,
    lline,
    rline
    ];
  for (let i = 0; i < lines.length; i++) {
    const checkEveryFilled = lines[i].map(key=> squares.hasOwnProperty(key))
    if(checkEveryFilled.every(x=> x===true)){
      const response= lines[i].map(key=> squares[key])
      const checkWiner= response.every( (val, i, arr) => val === arr[0])
        if(checkWiner){
          return response[0]
        }
    }
      }
  return null;
  }
}
