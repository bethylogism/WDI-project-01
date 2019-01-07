document.addEventListener('DOMContentLoaded', () => {

  //**VARIABLES**
  const instructions = document.querySelector('p')
  const optionBalls = document.querySelectorAll('.option')
  //Grab masterBalls as an array not a nodeList:
  const masterBalls = Array.prototype.slice.call(document.querySelectorAll('.master'))
  // const breakerBalls = document.querySelectorAll('.breaker')

  // const clues = document.querySelectorAll('.clues')
  const colours = ['blue', 'red', 'orange', 'purple', 'pink', 'yellow']
  let masterCode = []
  let breakerCode = []
  const attempts = 10
  const resetBtn = document.querySelector('.reset')
  const playBtn = document.querySelector('.play')
  const game = document.querySelector('main')
  const welcomeScreen = document.querySelector('.welcome')

  function vanish() {
    welcomeScreen.classList.add('vanish')
    game.classList.remove('vanish')
    console.log(game, welcomeScreen)
  }

  playBtn.addEventListener('click', startGame)


  //**FUNCTIONS**

  //CREATE THE GRID FOR THE USER CODE BREAKING ATTEMPTS && COMPUTER RESPONSES
  function createGrid () {
    const grid = document.querySelector('.grid')

    grid.innerHTML = ''
    for(let i = 0; i<attempts; i++) {
      grid.innerHTML+=`<section class="codeBreaker flex">
              <div class="computerSays">
                <div data-key="${i}" class="clues clue1"></div>
                <div data-key="${i}" class="clues clue2"></div>
                <div data-key="${i}" class="clues clue3"></div>
                <div data-key="${i}" class="clues clue4"></div>
              </div>
              <div class="breaker ball"></div>
              <div class="breaker ball"></div>
              <div class="breaker ball"></div>
              <div class="breaker ball"></div>
              <button class="attempt" id="${i}">Attempt</button>
            </section>`
    }
    const attemptBtns = document.querySelectorAll('.attempt')
    attemptBtns.forEach(btn => btn.addEventListener('click', attempt, {
      once: true
    }))
  }


  //CREATE COLOURED OPTION BALLS
  function createOptions(optionBalls) {
    optionBalls.forEach((ball, i) => {
      ball.style.backgroundColor = colours[i]
    })
  }


  //CREATE THE SECRET MASTER CODE COLOURS
  function colourCode(masterBalls) {
    masterBalls.forEach((ball, i) => {
      ball.style.backgroundColor = masterCode[i]
    })
  }

  //CREATE NEW RANDOM MASTER CODE <== put this in init() && reset()
  function createCode() {
    //masterCode = Array()
    //while (masterCode.length < masterBalls.length)
    //    masterCode.push(colours[Math.floor(Math.random() * colours.length)])
    //masterBalls.forEach( () => masterCode.push(colours[Math.floor(Math.random() * colours.length)]))
    masterCode = masterBalls.map(() => colours[Math.floor(Math.random() * colours.length)])
    colourCode(masterBalls)
    return masterCode
  }


  //ballSelect(e)
  //adds that colour to the style.colour of the balls
  function ballSelect(e) {
    const breakerBalls = document.querySelectorAll('.breaker')
    breakerCode.push(e.target.style.backgroundColor)
    // console.log('There are ' + breakerBalls.length + ' balls.')
    breakerBalls.forEach((ball, i) => {
      // console.log('Coloring ball ' + i + ' with color ' + breakerCode[i])
      ball.style.backgroundColor = breakerCode[i]
    })
    console.log(breakerCode)
    return breakerCode
  }



  const attemptBtns = document.querySelectorAll('.attempt')
  //USER ATTEMPT: COMPARE THE ARRAYS (WITH NEW ID NUMBER)
  function attempt() {
    const cluesId = this.id
    //compare the master code with the last four given code breaker items
    const currCode = breakerCode.slice(breakerCode.length-4)
    console.log('current code is ' + currCode)
    console.log('masterCode is ' + masterCode)
    let redNum = 0
    const usedMaster = []
    const usedBreaker = []
    currCode.forEach((e1,ind1) => {
      masterCode.forEach((e2,ind2) => {
      //if the element is identical add a RED pin
        if (e1 === e2 && ind1 === ind2) {
          redNum ++
          //add element indices to used arrays
          usedBreaker.push(ind1)
          usedMaster.push(ind2)
        }
      })
    })
    pin(cluesId, 'red', redNum)
    console.log(`nr of red pins: ${redNum}`)
    //Repeat checks for adding white pins
    let whiteNum = 0
    currCode.forEach((e1,ind1) => {
      masterCode.forEach((e2,ind2) => {
      //
        if (e1 === e2 && ind1 !== ind2 && !usedBreaker.includes(ind1) && !usedMaster.includes(ind2)) {
          whiteNum ++
          //add element indices to used arrays
          usedBreaker.push(ind1)
          usedMaster.push(ind2)
          console.log(`nr of white pins: ${whiteNum}`)
        }
      })
    })
    pin(cluesId, 'white', redNum, whiteNum)
    checkWin(redNum)
  }

  //PIN: ADDS RED AND/OR WHITE PINS TO CLUES
  function pin(cluesId, colour, redNum = 0, whiteNum = 0) {
    const clues = document.querySelectorAll(`.clues[data-key="${cluesId}"]`)
    clues.forEach((clue,ind) => {
      if (ind<redNum)
        clue.style.backgroundColor = 'red'
      if (ind>=redNum && ind<(redNum + whiteNum))
        clue.style.backgroundColor = `${colour}` //should do this once each time
    })
  }

  // function redPin(cluesId, redNum) {
  //   let clues = document.querySelectorAll(`.clues[data-key="${cluesId}"]`)
  //   clues.forEach((clue,ind) => {
  //     if (ind<redNum)
  //       clue.style.backgroundColor = 'red' //should do this once each time
  //   })
  // }
  //
  // //Add a white pin for each whiteNum
  // function whitePin(cluesId, whiteNum, redNum) {
  //   let clues = document.querySelectorAll(`.clues[data-key="${cluesId}"]`)
  //   clues.forEach((clue,ind) => {
  //     if (ind>=redNum && ind<(redNum + whiteNum))
  //       clue.style.backgroundColor = 'white' //should do this once each time
  //   })
  // }

  //CHECK WIN CONDITION
  function checkWin (redNum) {
    const codeBalls = document.querySelectorAll('.master')
    if (redNum === codeBalls.length) {
      console.log(codeBalls)
      codeBalls.forEach(ball => ball.classList.remove('invisible'))
      window.alert('Huzzah, you win!') //<== replace this with winScreen()
    }
  }



  function startGame() {
    createGrid()
    createCode()
    createOptions(optionBalls)
    vanish()
  }


  function reset() {
    console.log('RESET BUTTON CLICKED')
    masterCode = []
    breakerCode = []
    startGame()
  }




  //**EVENT LISTENERS**
  optionBalls.forEach(ball => ball.addEventListener('click', ballSelect))
  resetBtn.addEventListener('click', reset)


  //add an event listener on breakerBalls -  click allows you to change THIS.color

})
