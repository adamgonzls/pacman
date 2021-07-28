const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const squares = []
let score = 0

// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
  1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

// create board
function createBoard () {
  layout.forEach(i => {
    const square = document.createElement('div')
    grid.appendChild(square)
    squares.push(square)
    if (i === 0) {
      square.classList.add('pac-dot')
    } else if (i === 1) {
      square.classList.add('wall')
    } else if (i === 2) {
      square.classList.add('ghost-lair')
    } else if (i === 3) {
      square.classList.add('power-pellet')
    }
  })
}

createBoard()

// starting position of pacman
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')

function control (e) {
  squares[pacmanCurrentIndex].classList.remove('pacman')
  switch (e.key) {
    case 'Down':
      console.log('pressed down')
      if (
        !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex + width < width * width) {
        pacmanCurrentIndex += width
      }
      break
    case 'ArrowDown':
      console.log('pressed down')
      if (
        !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex + width < width * width
      ) {
        pacmanCurrentIndex += width
      }
      break
    case 'Up':
      console.log('pressed up')
      if (
        !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex - width >= 0
      ) {
        pacmanCurrentIndex -= width
      }
      break
    case 'ArrowUp':
      console.log('pressed up')
      if (
        !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
        pacmanCurrentIndex - width >= 0
      ) {
        pacmanCurrentIndex -= width
      }
      break
    case 'Left':
      console.log('pressed left')
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width !== 0
      ) {
        pacmanCurrentIndex -= 1
        if (pacmanCurrentIndex === 364) {
          pacmanCurrentIndex = 391
        }
      }
      break
    case 'ArrowLeft':
      if (
        !squares[pacmanCurrentIndex - 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width !== 0
      ) {
        pacmanCurrentIndex -= 1
        if (pacmanCurrentIndex === 364) {
          pacmanCurrentIndex = 391
        }
      }
      break
    case 'Right':
      console.log('pressed right')
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width < width - 1
      ) {
        pacmanCurrentIndex += 1
        if (pacmanCurrentIndex === 391) {
          pacmanCurrentIndex = 364
        }
      }
      break
    case 'ArrowRight':
      console.log('pressed right')
      if (
        !squares[pacmanCurrentIndex + 1].classList.contains('wall') &&
        !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
        pacmanCurrentIndex % width < width - 1
      ) {
        pacmanCurrentIndex += 1
        if (pacmanCurrentIndex === 391) {
          pacmanCurrentIndex = 364
        }
      }
      break
    default:
  }
  squares[pacmanCurrentIndex].classList.add('pacman')
  pacDotEaten()
  powerPelletEaten()
  console.log(pacmanCurrentIndex)
}

document.addEventListener('keyup', control)

function pacDotEaten () {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
    score++
    scoreDisplay.textContent = score
  }
}

function powerPelletEaten () {
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
    score += 10
    scoreDisplay.textContent = score
    ghosts.forEach(ghost => {
      ghost.isScared = true
      console.log(ghost)
    })
    setTimeout(unScareGhosts, 10000)
  }
}

function unScareGhosts () {
  ghosts.forEach(ghost => {
    ghost.isScared = false
  })
}

class Ghost {
  constructor (className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]

ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
})

ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost (ghost) {
  console.log('moved ghost')
  const directions = [-1, +1, -width, +width]
  let direction = directions[Math.floor(Math.random() * directions.length)]

  ghost.timerId = setInterval(function () {
    if (
      !squares[ghost.currentIndex + direction].classList.contains('wall') &&
      !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
      squares[ghost.currentIndex].classList.remove(ghost.className)
      squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
      ghost.currentIndex += direction
      squares[ghost.currentIndex].classList.add(ghost.className)
      squares[ghost.currentIndex].classList.add('ghost')
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)]
    }

    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    // if ghost is currently scared and pacman is on it
    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      score += 100
      ghost.currentIndex = ghost.startIndex
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
  }, ghost.speed)
}

function checkGameOver () {
  // if square pacman is in contains a ghost and the square does not contain a scared ghost

  // for each ghost - we need to stop it moving

  // remove event listener from our control function

  // tell user the game is over
}
