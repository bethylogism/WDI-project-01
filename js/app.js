document.addEventListener('DOMContentLoaded', () => {

  //**VARIABLES**
  const optionBalls = document.querySelectorAll('.option')
  //Grab as an array not a nodeList:
  const masterBalls = Array.prototype.slice.call(document.querySelectorAll('.master'))
  //const colours = ['blue', 'red', 'orange', 'purple', 'pink', 'yellow']
  const colours = ['crimson', 'yellow', 'green', 'blue', 'cyan', 'violet']
  let masterCode = []
  let breakerCode = []
  const attempts = 10
  const codeLength = 4
  const resetBtn = document.querySelector('.reset')
  const game = document.querySelector('main')
  const welcomeScreen = document.querySelector('.welcome')
  const startBtn = document.querySelector('.start')

  let rowId = -1
  let contin = true



  //              ** START: REMOVE WELCOME SCREEN **

  startBtn.addEventListener('click', startGame)
  function vanish() {
    welcomeScreen.classList.add('vanish')
    game.classList.remove('vanish')
  }




  //              ** FUNCTIONS **

  //CREATE THE GRID FOR PLAYER'S CODE BREAKING ATTEMPTS && COMPUTER RESPONSES
  function createGrid () {
    const grid = document.querySelector('.grid')

    grid.innerHTML = ''
    for(let i = 0; i<attempts; i++) {
      grid.innerHTML+=`<section class="codeBreaker flex" data-row="${i+1}">
            <div class="spacer flex end">
                <div class="computerSays">
                  <div data-key="${i}" class="clues clue1"></div>
                  <div data-key="${i}" class="clues clue2"></div>
                  <div data-key="${i}" class="clues clue3"></div>
                  <div data-key="${i}" class="clues clue4"></div>
                </div>
              </div>
              <div class="breakerBalls flex">
                <div class="breaker ball"></div>
                <div class="breaker ball"></div>
                <div class="breaker ball"></div>
                <div class="breaker ball"></div>
              </div>
              <div class="spacer flex">
                <button class="attempt semi-visible" id="${i}">Attempt</button>
              </div>
            </section>`
    }
    const attemptBtns = document.querySelectorAll('.attempt')
    attemptBtns.forEach(btn => btn.addEventListener('click', attempt))
  }


  //CREATE COLOURED OPTION BALLS <== Can we refactor this into the below fx?
  function createOptions(balls) {
    balls.forEach((ball, i) => {
      ball.style.backgroundColor = colours[i]
    })
  }


  //CREATE THE SECRET MASTER CODE COLOURS
  function colourCode(masterBalls) {
    masterBalls.forEach((ball, i) => {
      ball.style.backgroundColor = masterCode[i]
    })
  }

  //CREATE NEW RANDOM MASTER CODE <== part of startGame() and reset()
  function createCode() {
    masterCode = masterBalls.map(() => colours[Math.floor(Math.random() * colours.length)])
    colourCode(masterBalls)
    return masterCode
  }


  //PLAYER SELECT COLOURS && ADDS THEM TO BALLS
  function ballSelect(e) {
    if (contin) {
      const breakerBalls = document.querySelectorAll('.breaker')
      breakerCode.push(e.target.style.backgroundColor)
      breakerBalls.forEach((ball, i) => {
        // colour ball with the defined colours
        ball.style.backgroundColor = breakerCode[i]
      })
      allowAttempt()
      return breakerCode
    }
  }


  //USER ATTEMPT: COMPARE THE ARRAYS (WITH NEW ID NUMBER)
  function attempt() {
    const cluesId = this.id
    //compare the master code with the last four given code breaker items
    contin = true
    const currCode = breakerCode.slice(breakerCode.length-codeLength)
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
      //Add white pin if element is identical, index is not identical, and used array does not include either index.
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

  //PIN: ADDS RED/WHITE/BLACK PINS TO CLUES
  function pin(cluesId, colour, redNum = 0, whiteNum = 0) {
    const clues = document.querySelectorAll(`.clues[data-key="${cluesId}"]`)
    clues.forEach((clue,ind) => {
      if (ind<redNum)
        clue.style.backgroundColor = 'red'
      if (ind>=redNum && ind<(redNum + whiteNum))
        clue.style.backgroundColor = `${colour}` //should do this once each time
      if (ind>=(redNum + whiteNum))
        clue.style.backgroundColor = 'black'
    })
  }

  const codeBalls = document.querySelectorAll('.master')
  //CHECK WIN CONDITION && LOSE CONDITION
  function checkWin (redNum) {
    //const codeBalls = document.querySelectorAll('.master')
    let outcome = ''
    //Reveal the code to the Player
    if (redNum === codeBalls.length ||
    breakerCode.length === attempts * codeLength) {
      codeBalls.forEach(ball => ball.classList.remove('invisible'))
    }
    //WIN: Player code balls are identical to master code balls
    if (redNum === codeBalls.length) {
      outcome = 'win'
      outcomeText(outcome)
    }
    //LOSE: Reach the end and the last balls in the array not the master balls
    if (breakerCode.length === attempts*codeLength &&
    redNum !== codeBalls.length) {
      outcome = 'lose'
      outcomeText(outcome)
    }
  }


  function allowAttempt() {

    if (breakerCode.length===(rowId + 2) * codeLength){
      rowId ++
      contin = false
      const attemptButton = document.querySelector(`[id="${rowId}"]`)

      attemptButton.classList.remove('semi-visible')
    }
  }


  //OUTCOME WIN-LOSE MODAL POP UP
  const outcomeModal = document.querySelector('.outcome')
  const outcomeSpanX = document.querySelector('.close-outcome')
  const playAgain = document.querySelector('.play-again')

  //ESCAPE MODAL AND RESET
  outcomeSpanX.addEventListener('click', () => {
    outcomeModal.style.display = 'none'
  })

  window.addEventListener('click', (e) => {
    if (e.target === outcomeModal) {
      outcomeModal.style.display = 'none'
    }
  })


  playAgain.addEventListener('click', () => {
    outcomeModal.style.display = 'none'
    reset()

  })

  //OUTCOME NOTIFICATION
  //Tell player if they've won or lost by adding text under correct code
  function outcomeText(outcome) {
    //call the outcome modal pop up
    outcomeModal.style.display = 'block'
    const codemasterSays = document.querySelector('.says')
    if(outcome === 'win'){
      codemasterSays.textContent = 'You have won. Play again, if you dare.'
    } else {
      codemasterSays.textContent = 'You have lost. Redeem yourself and play again.'
    }
  }



  function startGame() {
    vanish()
    createGrid()
    createCode()
    createOptions(optionBalls)

  }
  //startGame()
  function hideCode(codeBalls) {
    codeBalls.forEach(ball => ball.classList.add('invisible'))
  }


  function reset() {
    console.log('RESET BUTTON CLICKED')
    masterCode = []
    breakerCode = []
    //codemasterSays.textContent = ''
    rowId = -1
    startGame()
    contin = true
    hideCode(codeBalls)
  }




  //INSTRUCTIONS MODAL POP UP
  const instructModal = document.querySelector('.instructions')
  const instructBtn = document.querySelector('.instructions-button')
  const spanX = document.querySelector('.close')
  instructBtn.addEventListener('click', () => {
    instructModal.style.display = 'block'
  })
  //escape the modal
  spanX.addEventListener('click', () => {
    instructModal.style.display = 'none'
  })

  window.addEventListener('click', (e) => {
    if (e.target === instructModal) {
      instructModal.style.display = 'none'
    }
  })


  //**EVENT LISTENERS**
  optionBalls.forEach(ball => ball.addEventListener('click', ballSelect))
  resetBtn.addEventListener('click', reset)


  //add an event listener on breakerBalls -  click allows you to change THIS.color
  //add a button that allows you to POP the last ones. A delete button, or an evenet listener on the ball itself.
  //The pop function needs to work only when:
  //if (breakerCode.length<==(rowId + 2) * codeLength) &&
  //(breakerCode.lenth >== (rowId+1) * codeLength)

})
