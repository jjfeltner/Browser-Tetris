document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10

  //The Tetrominoes
  const jTetromino = [
    [1, width+1, width*2, width*2+1],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, 2],
    [0, width, width+1, width+2]
  ]

  const lTetromino = [
    [1, width+1, width*2+1, width*2+2],
    [width, width+1, 2, width+2],
    [0, 1, width+1, width*2+1],
    [width, width*2, width+1, width+2]
  ]

  const oTetromino = [
    [0, width, 1, width+1],
    [0, width, 1, width+1],
    [0, width, 1, width+1],
    [0, width, 1, width+1]
  ]

  const sTetromino = [
    [width, 1, width+1, 2],
    [0, width, width+1, width*2+1],
    [width, 1, width+1, 2],
    [0, width, width+1, width*2+1]
  ]

  const zTetromino = [
    [0, 1, width+1, width+2],
    [width+1, width*2+1, 2, width+2],
    [0, 1, width+1, width+2],
    [width+1, width*2+1, 2, width+2]
  ]

  const tTetromino = [
    [0, 1, width+1, 2],
    [0, width, width*2, width+1],
    [width*2, width+1, width*2+1, width*2+2],
    [width+1, 2, width+2, width*2+2]
  ]

  const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]

  const theTetrominoes = [
    jTetromino,
    lTetromino,
    oTetromino,
    sTetromino,
    zTetromino,
    tTetromino,
    iTetromino
  ]

  let currentPosition = 4
  let currentRotation = 0

  console.log(theTetrominoes[0][0])

  //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  //draw the tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  //undraw the Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  //make the tetromino move down every second
  timerID = setInterval(moveDown, 500)

  //move down function
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  //freeze function
  function freeze() {
      if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      //start a new tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
    }
  }

  //move the tetromino left, unless it is at the edge or there is a blockage
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(indes => (currentPosition + index) % width === 0)

    
  }













})
