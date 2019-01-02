document.addEventListener('DOMContentLoaded', () => {

  //**VARIABLES**
  const instructions = document.querySelector('p')
  const optionBalls = document.querySelectorAll('.option')
  const masterBalls = Array.prototype.slice.call(document.querySelectorAll('.master'))
  const breakerBalls = document.querySelectorAll('.breaker')
  const attemptBtn = document.querySelector('.attempt')
  const clues = document.querySelectorAll('.clues')
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
    breakerBalls.forEach((ball, i) => {
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
    console.log('breaker code is ' + breakerCode)
    let clueArray = []
    breakerCode.forEach((e1,ind1) => {
      let comparison = []
      masterCode.forEach((e2,ind2) => {
      //if the element is identical add a green pin
        if (e1 === e2 && ind1 === ind2) {
          console.log(e1 + '===' + e2)
          comparison.push(e1 + ' vs ' + e2 + ': ' + 'green')
          return 
        //if the element is not identical but is in the array add orange pin
        } else if (masterCode.includes(e1) && ind1 !== ind2) {
          console.log('Alrighty, call codeOrange')
          comparison.push(e1 + ' vs ' + e2 + ': ' + 'orange')
        //otherwise do nothing / break / return?
        } else {
          comparison.push(e1 + ' vs ' + e2 + ': ' + 'red')
          console.log('Oh doeeee, codeRed!')
        }
      })
      console.log('Adding comparion: ' + comparison)
      clueArray.push(comparison)
    })
    console.log(clueArray)
    computerSays(clues)
  }



  function computerSays(clues) {
    clues.forEach((clue, i) => {
      //clues.style.backgroundColor = clueArray[i]
    })
  }


  // function codeOrange() {
  //   computerSays.style.backgroundColor = 'orange'
  //   instructions.textContent = 'Incorrect position, but correct colour'
  //   //push an orrange dot somewhere
  // }


  function startGame() {
    createCode()
  }
  startGame()




  //**EVENT LISTENERS**
  optionBalls.forEach(ball => ball.addEventListener('click', ballSelect))
  attemptBtn.addEventListener('click', attempt)

  //add an event listener on breakerBalls -  click allows you to change THIS.color

})
