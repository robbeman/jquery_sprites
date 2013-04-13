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

### $('.sprite').sprite('methodname',arguments...);
Execute a method, the arguments are optional (for most methods)
* goto: step to a certain frame in the animation
    * @param1 integer required, representing the frames index, starting by zero
* prev: step to the previous frame in the animation
    * @param1 boolean optional, wrap the animation when the first frame is reached
* next: step to the next frame in the animation
    * @param1 boolean optional, wrap the animation when the end is reached
* toggle: toggle the animation play/pause method
* play: play the animation, using the framerate provided in the init options
  **NOTE: this function runs independently of the jquery animate extension, so combining these is not recommended**
* pause: pause the running animation, stops at the current frame

## Additional info
This plugin requires jQuery and is only tested on jQuery 1.9.1, for now, but will probably work on earlier versions

This is the first public release of the code, it might contain bugs, flaws or some other unintended things. Feedback is welcome.

Testing this plugin with other versions of jQuery might be usefull, once tested, I will note it here (maybe even with a special thank you note).

## Legal crap
* This software is provided as is without any warranties and so on...
* Feel free to use for both personal and commercial work.
* Please do not redistribute or sell in it's current state, you may provide a link to this git repository.
* Any modifications are allowed, credits are always welcome.
* (if you would modify just naming and redistribute under your own name, I would be very dissapointed in you, but I probably could not do much about it... so silly)

This code makes use of jQuery, for more info: http://jquery.com/