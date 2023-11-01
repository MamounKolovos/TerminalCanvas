# TerminalCanvas
This is my programming experiment to turn a command line terminal into a canvas and animate 3D Objects using text characters!  **Watch the videos below** to see it in action.
Take a look at how I animated a 3d cube using only text and download my code to experiment with it yourself.

## Can you describe the JavaScript libraries that help create the text drawing in the terminal?
I used two, a matrix helper library and a 3d vector helper library. They’re not too complicated and I definitely could’ve made my own, but I felt that it would be redundant to do so.

## What was your general algorithm including any mathematics used to create the 3d cube?
I use “perspective projection” to take in an array of 3d coordinates and “project” them onto a 2d screen.

## What in your code makes the cube rotate?
I use multiple 3d rotation matrices to rotate the points of the cube around the center of the canvas (0,0). When you multiply a vector by a rotation matrix with a specific angle as input, it will rotate the vector by that input angle.

## Does your program create all the text dots on the canvas manually or does the library you are using handle that?
The canvas is just a 2d array of simulated “Pixel” objects, each of which contain a color and a “value” that gets displayed on the terminal.

## Video #1 below is the result of perspective projection and a separation of how i handle the fps (frames per second) and cps (calculations per second).
https://github.com/Textperimentor/TerminalCanvas/assets/121258835/d4686cf6-8282-415f-993d-a73211d20783

## Video #2 below is the cube rotating with no perspective projection, that's why when the cube is front facing, notice that you cannot see any of the points that are in the negative z-direction. 
https://github.com/Textperimentor/TerminalCanvas/assets/121258835/0c21874c-3168-4d54-b035-1733959fe707

