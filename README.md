# Starfield's Digipick Minigame in React

## Table of Contents
 - [About](#About)
 - [How to Play](#How-to-Play)
 - [Installation](#Installation)
 - [Future Enhancements](#Future-Enhancements)

 ## About
This project was developed to replicate the lockpicking minigame in Starfield.
It can be accessed at https://digipick-react.vercel.app/ or read the [Installation](#Installation) on how to run it locally.

The main screen includes:
- A difficulty selector to choose between the 4 available difficulties.
  - The default is novice.
  - Each difficulty provides additional rings to unlock and more lockpicks to choose from.
- A list of lockpicks on the right side of the screen that you can select from.
- A move left, move right, and slot button to take actions on the selected lockpick.

## How to Play
If you haven't played Starfield's digipick minigame, read below:

  - You have a circular lock with rings based on the chosen difficulty, along with a list of lockpicks on the right side.
  - You can change the currently selected lockpick by clicking on one from the list.
  - The selected lockpick is highlighted with a white inner circle in the list.
  - The goal is to align the lockpick with the lock's openings by rotating it and then slotting it using the "Slot" button.
  - Once the lock has all openings filled, it is removed and you can begin the next ring.
  - Note: Careful! Successfully slotting a lockpick doesn't guarantee it's the correct choice, as each lockpick has only one use. You might run out of correct lockpicks for inner rings and need to restart by selecting a new difficulty.

## Installation
To use this project, follow these steps:

  1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```
  2. Install the required dependencies:
    ```npm install```
  3. Start the application:
    ```npm start```

## Future Enhancements
Currently, the core development is complete but there are features I would like to add in the future:
  - Implement auto-slotting and undo-placement functionality.
  - Enhance lockpick generation to reduce the chance of 1-pick lockpicks.
  - Improve the user interface for a better user experience.
  - Add audio cues for correct and incorrect placements.
  - Incorporate animations for unlocking.

