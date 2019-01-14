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

![Deep Sea Dive](https://user-images.githubusercontent.com/40343797/45214662-fc243200-b292-11e8-9c52-5a1053aa8c0a.png)

You can find a hosted version here ----> [laceswingybethler.github.io/WDI-project-01/](https://laceswingybethler.github.io/WDI-project-01/)

### Game overview
Mastermind is a single player codebreaking game. The aim is to figure out a sequence of colours in a certain combination within a number of attempts.

The achieve this, the player is given clues as to how correct their guesses are along the way.

The game is mobile and tablet-friendly and can be played on any device.

### Gameplay
- The player selects coloured balls from the options at the bottom
- When the player submits these, they will receive feedback according to the following rules:
* A red pin: each red pin indicates that a coloured ball is correct; the position is right and so is the colour.
* A white pin: one of the selected colours is within the code, but not in the correct position in the sequence.
* A black pin: one of the selected colours is not in the code at all.

The player has won if all four of the clues turn red.

### Game Instructions
1. The game begins with a welcome modal introducing the aim of the game. The game is started by clicking on the "Start" button.

![screenshot - Start Modal](https://user-images.githubusercontent.com/40343797/45220826-6777ff00-b2a7-11e8-8511-8a5f00bc0b74.png)

2. The user chooses colours from the animated balls quivering to be selected at the bottom of the board.

![screenshot - Beginning position](https://user-images.githubusercontent.com/40343797/45220870-8ececc00-b2a7-11e8-804a-c271278a428f.png)

3. Once the player charset selected four (no more, no less) then they can click attempt and get their feedback.

![screenshot - Fish types](https://user-images.githubusercontent.com/40343797/45220971-e53c0a80-b2a7-11e8-9942-714db52793d9.png)

4. The computer generates the clues depending on the position and colour of the chosen code. If the secret code is 'orange, green, pink, yellow' and the user selects 'orange' in the first slot, the computer will generate a red pin to indicate that this is correct in both colour and position. If the user selects 'yellow' as their second slot, the computer will generate a white pin to indicate that 'yellow' is in the secret code, but in a different position, and if the user selects 'black' as their third colour, the computer will generate a black pin to indicate that it's not in the secret code at all.

![screenshot - Mines](https://user-images.githubusercontent.com/40343797/45220908-b4f46c00-b2a7-11e8-9460-2a4dee40d0ae.png)

5. If you win, you'll get not only all red pins but also a 'win screen' pop up, baiting the player to try again.

![screenshot - End Modal Successful](https://user-images.githubusercontent.com/40343797/45221008-04d33300-b2a8-11e8-999e-62b50286c8ec.png)

6. Equivalently, if the player reaches the end of the board without guessing the correct code then they lose, and see a lose screen that allows them to reset and try again.

## Process

First, I created the player and master boards in some rudimentary HTML. This was two sections with four div slots for the hidden 'master' code and four slots for the player's guesses, as well as a button and a space for clues.

! [screenshot - Simple HTMl ](https://user-images.githubusercontent.com/44749113/51035208-1fdce900-15a1-11e9-812a-643c6726647f.png)

I then created the options that could be selected. These colours were generated in javascript using a simple array of colours in a string (e.g. ['red', 'yellow', 'pink'..]). The computer uses this array to randomly select four colours for the secret code.

Because this 'colours' array is used to create the game logic, this makes it harder to break the game - if someone updates the 'colours' array, then the colours loaded into the 'options' changes, and the colours that the computer randomly selects to create the secret code are also updated simultaneously.

Once the computer as generated a random sequence of colours, the user needs to create their own array. To do this I added event listeners onto the colour options. When the player clicks on a colour, the background colour of the users empty slots is updated, and the selected colour is pushed onto a new player array.

The core game logic requires the comparison of these two arrays: the master secret code and the player's breaker code. I knew at some point that the player's code would extend to fit the board, so I took a slice of the last n elements in this array. 'n' would be determined by the difficulty level of the game. This is typically four - and I have started with four accordingly - but a longer sequence is much more difficult and an option that I wanted to build in later. To future-proof the game against extending the code length beyond four, I took a slice of the last n elements in the array where 'n' is the length of the secret master code.

To compare the two array, I created a forEach() method inside a forEach() method. I wanted it to execute a callback function on each and every element in each array. The callback compares each element and its index. If the elements are identical _and_ their indexes are identical then it increases the count of red pins to be displayed in a different function. Crucially, the indexes of identical pins needed to then be recognised as 'used up' to prevent them from being counted a second time when the forEach() method ran over the other array. To do this I pushed the indexes that were 'spent' in this sense to a 'used' array.

Much more difficult is counting the number of white pins. White pins are given when the colour is in the secret code, but it's _not_ in the same index in the player's array as it is in the secret code array. This meant increasing the number of white pins to display if and only if the element was the same element and the index was not the same index. Alone this still counts the pins which are perfect matches, though, as they're still in the array and the indexes being compared constantly changes. If the first and third elements in the secret code are red then if the player guesses red as the first element in their array, we want the mechanic to take into account the fact that both first elements are red and not to compare the third red element with the player's first red element. To counteract this, the 'used' arrays were crucial as we can simply require that not only are the elements the same and the indexes not, but also that the used arrays do not include either of the indexes.

By then adding both of the element indices to the 'used' arrays after this second round of comparisons, this prevents elements that have already been 'counted' from being compared again. In a simple comparison of two arrays, the number of times the computer compares elements is the square of the length of the arrays. Without continuously updating and excluding elements in the 'used' arrays, the computer compares each and every element not once for each element but - in this case - four more times as it goes through the second array.

Excluding the 'used' colours created one white clue for each matching colour, instead of four white clue for each match.

```js
//Add white pin if element is identical, index is not identical, and used array does not include either index.
if (
  e1 === e2 &&
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

I then moved onto the task of allowing the position of the submarine to control the scrolling of the grid. This also required stoping the default behaviour of controls to prevent the user from scrolling through the grid to a position where the submarine was not visible.

As the game continued to develop I created a fish constructor function which created the fish objects and also contained the method which allowed the fish to move. I had initially also created a method which allowed the fish, when they were caught or swam off screen, to be removed from the fish in played array and remove their classes from the grid. However, I later changed this to a key within the fish object which specified whether the fish was active or not. During the game, a function now runs through the array of fish in play and removes any fish which have been set to no longer active.

The final significant element was creating a variable which specified whether the submarine was at the top of the surface when the air supply had reached zero. I created a modal with content which varied depending on whether the player had returned to the surface by the end of the game.

### Challenges

This game involves quite a lot of different things going on at the same time. It was a challenge to make sure the gaming mechanics were being being timed correctly. It was also important that I created code logic that could cope with expanding numbers of different fish characters in play at the same time.

There were several tricky tasks including the scrolling of the grid being controlled by the submarine and the animation of the fish.

### Wins

Creating cascading animations and sounds really helped the game come alive and gave me more creative control over the feel of the play. I invested a lot of time in the stying of the game, particularly the animations and air supply tank to give them a consistent and professional feel. I was particularly pleased with my 'Fish' constructor function which I then used to randomly generate different fish.

![Fish constructor function from app.js](https://user-images.githubusercontent.com/40343797/50378462-b7968980-062a-11e9-95b7-54e358bfb320.png)


When fish were created, they were added to an array of 'fishInPlay'. I was then able to call this function every 200 milliseconds to move every fish on the board.

```
function moveFish(){

  fishInPlay.forEach(fish => fish.move());

} // moves every fish 1 position in their respective movementPatternArrays
```

## Future features

If I had more time, I would like to try and make the game playable on a touchscreen device. I would need to make a control panel that would appear on a touch device to replace the keyboard inputs.

Different levels could be added to the game with different patterns of mine positioning and different fish spawning at different depths.

I would also like to improve the animations of the submarine (such as adding animated bubbles when it is moving) and improving the animations of the fish, particularly in allowing them to move diagonally.
