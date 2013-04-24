# jQuery spritesheet plugin
By Robbe Clerckx

## Documentation
### $('.sprite').sprite({options});
Init function, this will initialize the spritesheet by calculating the frame positions and adding them to the object data.

Available options:
* frames: number or array
    * if it is a number, the plugin will calculate the frame positions according to the objects size and the spritesheet size provided in the options
    * an array of frame coordinates starting from the top left of the image in the form of a 2D array, example: [[0,0],[0,10],[0,20]]
* sheetWidth: the width of the spritesheet image, only used for frame calculation (no need for adding it when you provide a frames array)
* sheetHeight: not really used for now, but added for the sake of completeness
* framerate: used when playing the animation in a loop. Used in the form of FPS, so if you provide 25 the frame will be updated every 40ms

### $('.sprite').animate({'frame':5});
After calling the init function you can animate your spritesheet using the jQuery animate function. This will evenly spread the frames over the duration of the animation.

### $('.sprite').sprite('methodname',arguments...);
Execute a method, the arguments are optional (for most methods)
* frame: step to a certain frame in the animation, if no frame number is given, it will return the current frame of the first element in the matched set
    * @param1 int, representing the frames index, starting by zero
* prev: step to the previous frame in the animation
    * @param1 boolean optional, wrap the animation when the first frame is reached
* next: step to the next frame in the animation
    * @param1 boolean optional, wrap the animation when the end is reached
* toggle: toggle the animation play/pause method
* play: play the animation, using the framerate provided in the init options
  **NOTE: this function runs independently of the jquery animate extension, so combining these is not recommended**
* pause: pause the running animation, stops at the current frame

## Additional info
This plugin requires jQuery and is only tested on jQuery 1.9 - for now - but will probably work on earlier versions

This is the first public release of the code, it might contain bugs, flaws or some other unintended things. Feedback is welcome.

Testing this plugin with other versions of jQuery might be usefull, once tested, I will note it here (maybe even with a special thank you note).

## Legal crap
Copyright (C) 2013 Robbe Clerckx

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

This code makes use of jQuery, for more info: http://jquery.com/