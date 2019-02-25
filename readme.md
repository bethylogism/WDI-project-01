# General Assembly Project 1 : Simple front-end game

### Timeframe
7 days

## Technologies used

* JavaScript (ES6)
* HTML5
* CSS + CSS Animation
* GitHub

## Installation

1. Clone or download the repo
1. Open the `index.html` in your browser of choice

## My Game - Mastermind

![Mastermind](https://user-images.githubusercontent.com/40343797/45214662-fc243200-b292-11e8-9c52-5a1053aa8c0a.png)

You can find a hosted version here ----> [laceswingybethler.github.io/WDI-project-01/](https://laceswingybethler.github.io/WDI-project-01/)

### Game overview
Mastermind is a single player codebreaking game. The aim is for the player (or "code breaker") to figure out an ordered sequence of coloured balls within a limited number of attempts.

The achieve this, the player is given clues as to how correct their guesses are along the way. However, the search space is multi-dimensional, so the clues do not allow the player to straightforwardly compute the subspace that has been ruled out at each stage.

The game is fairly mobile and tablet-friendly and can be played (to a reasonable extent) on any device, but this is what I am working to optimise next.

### Gameplay
- The player selects coloured balls from the options at the bottom
- When the player submits these, they will receive feedback according to the following rules:
* A red pin: each red pin indicates that a coloured ball is correct; the position is right and so is the colour.
* A white pin: one of the selected colours is within the code, but not in the correct position in the sequence.
* A black pin: one of the selected colours is not in the code at all.

The player has won if all four of the clues turn red.

### Game Instructions
1. The game begins with a welcome modal introducing the aim of the game. The game is started by clicking on the "Start" button.

![screenshot - Start Modal](https://user-images.githubusercontent.com/44749113/53340022-d7cf1700-38ff-11e9-9981-b54e5760509f.png)

2. The user chooses colours from the animated balls quivering at the bottom of the board.

![screenshot - Beginning position](https://user-images.githubusercontent.com/44749113/53340153-28467480-3900-11e9-854b-bb4dbe75b01d.png)

3. Once the player charset selected four (no more, no less) then they can click attempt and get their feedback.

![screenshot - attempt feedback](https://user-images.githubusercontent.com/44749113/53340214-5cba3080-3900-11e9-82e2-d2711102ba17.png)

4. The computer generates the clues depending on the position and colour of the chosen code. If the secret code is 'red, red, red, green' and the user selects 'red' in the first and second slot, the computer will generate a red pin to indicate that this is correct in both colour and position. If the user selects 'yellow' as their third slot, the computer will generate a black pin to indicate that it's not in the secret code at all, and if the user selects 'red' as their fourth colour, the computer will generate a white pin to indicate that 'yellow' is in the secret code, but in a different position.


5. If you win, you'll get not only all red pins but also a 'win screen' pop up, baiting the player to try again.

![screenshot - End Modal Successful](https://user-images.githubusercontent.com/44749113/53340601-52e4fd00-3901-11e9-9c3d-882809ae04cb.png)

6. Equivalently, if the player reaches the end of the board without guessing the correct code then they lose, and see a lose screen that allows them to reset and try again. You can also restart the game at any point, resetting all variables.

## Process

First, I created the player and master boards in some rudimentary HTML. This was two sections with four div slots for the hidden 'master' code and four slots for the player's guesses, as well as a button and a space for clues.

I then created the colours that could be chosen in javascript using a global variable that's just a simple array of colour strings (e.g. ['red', 'yellow', 'pink'..]). The computer uses this array to randomly select four colours for the secret code, and the user can select from the same array.

Because this 'colours' array is used to create the game logic, this makes it harder to break the game - if someone updates the 'colours' array, then the colours loaded into the 'options' changes, and the colours that the computer randomly selects to create the secret code are also updated simultaneously.

Once the computer as generated a random sequence of colours, the user needs to create their own array. To do this I added event listeners onto the colour options. When the player clicks on a colour, the background colour of the users empty slots is updated, and the selected colour is pushed onto a new player array.

The core game logic requires the comparison of these two arrays: the master secret code and the player's breaker code. I knew at some point that the player's code would extend to fit the board, so I took a slice of the last n elements in this array. 'n' would be determined by the difficulty level of the game. This is typically four - and I have started with four accordingly - but a longer sequence is much more difficult and an option that I wanted to build in later. To future-proof the game against extending the code length beyond four, I took a slice of the last n elements in the array where 'n' is the length of the secret master code.

To compare the two arrays, I created a forEach() method inside a forEach() method. I wanted it to execute a callback function on each and every element in each array. The callback compares each element and its index. If the elements are identical _and_ their indexes are identical then it increases the count of red pins to be displayed, which is passed to another function as an argument. Crucially, the indexes of identical pins need to then be recognised as 'used up' to prevent them from being counted a second time when the forEach() method runs over the other array. To do this I pushed the indexes that were 'spent' in this sense to a 'used' array.

Much more difficult is counting the number of white pins. White pins are given when the colour is _in_ the secret code, but it's in a different _index_ in the player's array as it is in the secret code array. This meant increasing the number of white pins to display if and only if the elements being compared are the same only in colour type. Alone, the simple comparison of two arrays counts the pins which are perfect matches because the indexes being compared constantly change. If the first and third elements in the secret code are red then if the player guesses red as the first element in their array, we want the mechanic to take into account the fact that both first elements are red and not to compare the third red element with the player's first red element. To counteract this, the 'used' arrays were crucial as we can simply require that not only are the elements the same and the indexes not, but also that the used arrays do not include either of the indexes.

By then adding both of the element indices to the 'used' arrays after this second round of comparisons, this prevents elements that have already been 'counted' from being compared again. In a simple comparison of two arrays, the number of times the computer compares elements is the square of the length of the arrays. Without continuously updating and excluding elements in the 'used' arrays, the computer compares each and every element not once for each element but - in this case - four more times as it goes through the second array.

Excluding the 'used' colours creates one white clue for each matching colour.

```js
//Add white pin if element is identical, index is not identical, and used array does not include either index.
if (
  colour1 === colour2 &&
  ind1 !== ind2 &&
  !usedBreaker.includes(ind1) &&
  !usedMaster.includes(ind2)
) {
  whiteNum ++
  //add element indices to used arrays
  usedBreaker.push(ind1)
  usedMaster.push(ind2)
  console.log(`nr of white pins: ${whiteNum}`)
}
```

Once I had this counting mechanic working, it was a case of creating a function to generate the red, white and remaining black pins accordingly.

I expanded the simple player board HTML in JavaScript. This allowed me to repeat the HTML a specific number of times using a variable that I could again update depending on how difficult I, or anyone else using this code, might want the game to be. I included custom data id numbers in the repeating HTML (${i}) which increased upon each iteration of the grid generation.

I then moved onto the task of allowing the position of the submarine to control the scrolling of the grid. This also required stopping the default behaviour of controls to prevent the user from scrolling through the grid to a position where the submarine was not visible.

During the game, a function decide whether to allow the player's next attempt based on the length of the player's 'breaker code'. Only once it is the correct multiple of the secret code length (determined by the id of the row) will the attempt button become visible, and the ability to continue adding balls into the next row is suspended until the attempt button is pressed. This guides the player through the correct gameplay.


The final significant element was creating a way of communicating winning or losing to the player. For this I created a modal with content which varied depending on whether the player had won or lost the game.

### Challenges

The most difficult part was ensuring that the white pins are not given more than once. Hence the need for a 'spent' array.


### Wins

The game is playable on touchscreen devices. This could be improved by making buttons larger, as it's a bit fiddly on mobile. If I do the styling again I'll use a narrower screen width as my initial guide.


## Future features

The first thing I'm working on next is a handy and intuitive way for the player to remove a colour from their selection. For this I'll start with a 'delete' button and a simple function that 'pops' the last element off the array on clicking the button. The challenge with this is styling for mobile, as the buttons are already a little small for smaller screens, but it could easily become crowded with large buttons, so it's redrawing the layout that'll take a little time.

Following that, I will add two ways for players to alter difficulty:
- No repeats option (toggle). This disallows any repeated colours, which reduces the range of possible patterns (a widely-used way to simplify the game).
- Ultra-difficult level: That will have an increased number of colours, and up the length of the code. If the secret code length increases even by 1 and the number of colour options increases by 2, then the search space increases from 1,296 to 3,2768 (reference: http://geneura.ugr.es/~jmerelo/newGenMM/node2.html). This is another great way to add a significant difficulty level, which as an avid player of the game I think would be fun.
