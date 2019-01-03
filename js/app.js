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
    const clueArray = []
    const usedIndexes = []
    let black = 0
    let orange = 0
    let red = 0
    breakerCode.forEach((e1,ind1) => {
      const comparison = []
      masterCode.forEach((e2,ind2) => {
      //if the element is identical add a red pin
        if (e1 === e2 && ind1 === ind2) {
          // console.log(e1 + '===' + e2 )
          comparison.push(`[${ind1}] is same as [${ind2}]: red`)
          // usedIndexes.push(ind1)
          red ++
          console.log(`red is now ${red}`)
        //if the element is  already RED but is the same as the above index then add an orange pin
        } else if (masterCode.includes(e1) && ind1 === ind2) {
          console.log(`Orange because breakercode[${ind1}] === masterCode[${ind2}]`)
          comparison.push(e1 + ' vs ' + e2 + ': ' + 'orange')
          orange++
        //if not in there at all (four times) then add one to black/empty
        } else if (!masterCode.includes(e1)){
          black+=0.25
          comparison.push(e1 + ' vs ' + e2 + ': ' + 'proper black - none match')
          console.log(`black is now ${black}`)
        // }else{
        //   comparison.push(e1 + ' vs ' + e2 + ': ' + 'neutral')
        //   console.log('Neutral')
        }
      })
      console.log(`black plus red is ${black} + ${red} = ${black + red} plus orange is ${black + red} + ${orange} = ${black + red + orange}`)
      console.log('Adding comparison '+ comparison)
      clueArray.push(comparison)
      console.log(comparison)
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
