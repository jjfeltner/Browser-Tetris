document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  let click = false;
  let goodGame = false;
  const colors = [
    'orange',
    'red',
    'purple',
    'green',
    'blue',
    'pink',
    'brown'
  ]

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

  //Initialize the game


  //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  //draw the tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
      squares[currentPosition + index].style.backgroundColor = colors[random]
    })
  }

  //undraw the Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
      squares[currentPosition + index].style.backgroundColor = ''
    })
  }

  //assign function to keyCodes
  function control(e) {
    if (goodGame === false && timerId != null) {
      if(e.keyCode === 37) {
        moveLeft();
      } else if (e.keyCode === 38){
        rotate();
      } else if (e.keyCode === 39) {
        moveRight();
      } else if (e.keyCode === 40) {
        moveDown();
      }
    }
  }
  document.addEventListener('keyup', control)

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
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }

  //move the tetromino left, unless it is at the edge or there is a blockage
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
      currentPosition +=1
    }
    draw()
  }

  //move the tetromino right, unless it is at the edge or there is a blockage
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
    if(!isAtRightEdge) currentPosition +=1
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    draw()
  }

  //rotate the tetromino
  function rotate() {
    undraw()
    currentRotation++
    if (currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }

  //show up-next tetromino in mini-grid
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  const displayIndex = 0

  //the Tetrominos without rotations
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2, displayWidth*2+1], //jTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*2+2], //lTetromino
    [0, displayWidth, 1, displayWidth+1], //oTetromino
    [displayWidth, 1, displayWidth+1, 2], //sTetromino
    [0, 1, displayWidth+1, displayWidth+2], //zTetromino
    [0, 1, displayWidth+1, 2], //tTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], //iTetromino
  ]

  //display the shape in the mini-grid display
  function displayShape() {
    //remove any trace of a tetromino from the entire grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }

  //add functionality to the button
  startBtn.addEventListener('click', () => {
    if (click === false) {
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      displayShape()
    }
    click = true;
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
    }
  })

  //add score
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if (row.every(index => squares[index].classList.contains('taken'))) {
        score +=10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  //game over
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innnerHTML = 'end'
      clearInterval(timerId)
      goodGame = true;
      click = false;
    }
  }







})
