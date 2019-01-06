document.addEventListener('DOMContentLoaded', () => {

  //**VARIABLES**
  const instructions = document.querySelector('p')
  const optionBalls = document.querySelectorAll('.option')
  const masterBalls = Array.prototype.slice.call(document.querySelectorAll('.master'))
  const breakerBalls = document.querySelectorAll('.breaker')
  const attemptBtns = document.querySelectorAll('.attempt')
  // const clues = document.querySelectorAll('.clues')
  const colours = ['blue', 'red', 'green', 'purple', 'pink', 'white']
  let masterCode = []
  let breakerCode = []

  //**FUNCTIONS**

  //CREATE COLOURED OPTION BALLS
  function createOptions(optionBalls) {
    optionBalls.forEach((ball, i) => {
      ball.style.backgroundColor = colours[i]
    })
  }
  createOptions(optionBalls)

  //CREATE THE SECRET MASTER CODE COLOURS
  function colourCode(masterBalls) {
    masterBalls.forEach((ball, i) => {
      ball.style.backgroundColor = masterCode[i]
    })
  }
  //CREATE NEW RANDOM MASTER CODE
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
    breakerCode.push(e.target.style.backgroundColor)
    // console.log("There are " + breakerBalls.length + " balls.")
    breakerBalls.forEach((ball, i) => {
      // console.log("Coloring ball " + i + " with color " + breakerCode[i])
      ball.style.backgroundColor = breakerCode[i]
    })
    console.log(breakerCode)
    return breakerCode
  }

  //attempt()
  //when user presses attempt button
  //for each codeBreak ball, adds the colour to a new Array (REDUCE), breakerCode
  //for each breakerCode element
  //if (breakerCode[i].index === masterCode[i].index) return codeGreen()
  //if masterCode contains breakerCode.value then return codeOrange()

  function attempt() {
    const cluesNr = this.id
    //compare the master code with the last four given code breaker items
    let currCode = breakerCode.slice(breakerCode.length-4)
    console.log('current code is ' + currCode)
    console.log('masterCode is ' + masterCode)
    let redNum = 0
    let usedMaster = []
    let usedBreaker = []
    currCode.forEach((e1,ind1) => {
      masterCode.forEach((e2,ind2) => {
      //if the element is identical add a red pin
        if (e1 === e2 && ind1 === ind2) {
          redNum ++
          //add element indices to used arrays
          usedBreaker.push(ind1)
          usedMaster.push(ind2)
        }
      })
    })
    redPin(cluesNr, redNum)
    if (redNum === 4)
      window.alert('Huzzah, you win!')
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
    whitePin(cluesNr, whiteNum, redNum)
  }

  //Add a red pin for each redNum
  function redPin(cluesNr, redNum) {
    let clues = document.querySelectorAll(`.clues[data-key="${cluesNr}"]`)
    clues.forEach((clue,ind) => {
      if (ind<redNum)
        clue.style.backgroundColor = 'red' //should do this once each time
    })
  }

  //Add a white pin for each whiteNum
  function whitePin(cluesNr, whiteNum, redNum) {
    let clues = document.querySelectorAll(`.clues[data-key="${cluesNr}"]`)
    clues.forEach((clue,ind) => {
      if (ind>=redNum && ind<(redNum + whiteNum))
        clue.style.backgroundColor = 'white' //should do this once each time
    })
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
