document.addEventListener('DOMContentLoaded', () => {

  //**VARIABLES**
  const instructions = document.querySelector('p')
  const optionBalls = document.querySelectorAll('.option')
  //Grab masterBalls as an array not a nodeList:
  const masterBalls = Array.prototype.slice.call(document.querySelectorAll('.master'))
  // const breakerBalls = document.querySelectorAll('.breaker')

  // const clues = document.querySelectorAll('.clues')
  const colours = ['blue', 'red', 'green', 'purple', 'pink', 'white']
  let masterCode = []
  let breakerCode = []
  const attempts = 10


  //**FUNCTIONS**

  //CREATE THE GRID FOR THE USER CODE BREAKING ATTEMPTS && COMPUTER RESPONSES
  const grid = document.querySelector('.grid')
  console.log(grid)

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


  //CREATE COLOURED OPTION BALLS
  function createOptions(optionBalls) {
    optionBalls.forEach((ball, i) => {
      ball.style.backgroundColor = colours[i]
    })
  }
  createOptions(optionBalls) //<== put this in init() && reset()


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

  //attempt()
  //Attempt button passes in id nr; compares arrays
  const attemptBtns = document.querySelectorAll('.attempt')

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

  //Add red and/or white pins
  function pin(cluesId, colour, redNum = 0, whiteNum = 0) {
    let clues = document.querySelectorAll(`.clues[data-key="${cluesId}"]`)
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
      window.alert('Huzzah, you win!')
    }
  }



  function startGame() {
    createCode()
  }
  startGame()



  //**EVENT LISTENERS**
  optionBalls.forEach(ball => ball.addEventListener('click', ballSelect))
  attemptBtns.forEach(btn => btn.addEventListener('click', attempt, {
    once: true
  }))

  //add an event listener on breakerBalls -  click allows you to change THIS.color

})
