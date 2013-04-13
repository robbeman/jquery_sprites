/*****
 *
 * jQuery spritesheet plugin v0.1
 * ©2013 Robbe Clerckx
 *
 * This software is provided as is without any warranties and so on...
 * Feel free to use for both personal and commercial work.
 * Please do not redistribute or sell in it's current state, you may provide a link to this git repository.
 * Any modifications are allowed, credits are always welcome.
 * (if you would modify just naming and redistribute under your own name, I would be very dissapointed in you, but I probably could not do much about it... so silly)
 *
 * That's about it for the legal crap.
 *
 *****/

(function($){
	'use strict';

/**
 * Extend jQuery with an init function
 * @param options the options for initializing or the name of the method to run
 * @param [arguments...] additional parameters to pass to the chosen method (if any)
 */
	$.fn.sprite = function(options){

		var t = $(this);

		if(t.length <= 0) return t;

		if (typeof options === 'string'){
			//execute the needed function
			var method = methods[options];
			if(typeof method === 'function'){
				if (options === 'playing'){
					return t.data('sprite').timeout != null;
				}
				else{
					var args = Array.prototype.slice.call(arguments,1);
					t.each(function(){
						method.apply($(this),args);
					});
				}
			}
		}
		else{
			t.each(function(){
				methods.init.call($(this),options);
			});
		}

		return t;

	};

/**
 * Extend the frame step
 */
	$.fx.step.frame = function(fx){
		methods.goto.call($(fx.elem),fx.now);
	}
	
/**
 * Public methods, only accesible through the $.fn.sprite function
 */
	var methods = {
		// init function, obviously
		init:function(options){
			//initialise the sprite
			var width = this.width(),
				height = this.height(),
				frames = [],
				settings = $.extend({
					frames: 1,
					sheetWidth:width,
					sheetHeight:height,
					frameRate:33
				},options
			);

			if (typeof settings.frames === "number"){
				//calculate the frames by the width and height of the spritesheet
				var cols = settings.sheetWidth/width;
				for(var i=0;i<settings.frames;i++){
					frames.push([
						(i%cols)*width,
						(i/cols << 0)*height
					]);
				}
			}
			else{
				frames = settings.frames;
			}

			var data = {};
			data.frames = frames;
			data.current = 0;
			data.frameRate = settings.frameRate;
			this.data('sprite',data);
		},
		// go to a certain frame in the spritesheet
		goto:function(f){
			var data = this.data('sprite');
			var frames = data.frames;
			if (frames){
				if (f < 0){
					f = 0;
				}
				else if (f >= frames.length){
					f = frames.length-1;
				}
				else{
					//round it
					f = f+.5<<0;
				}

				var frame = frames[f];
				if (frame){ // 0 evaluates to false, so strict check
					this.css('background-position',-frame[0]+'px '+-frame[1]+'px');
					data.current = f;
				}
			}
		},
		// go to the previous frame
		// @param wrap boolean go to last frame when trying to prev the first
		prev:function(wrap){
			var data = this.data('sprite');
			var target = data.current-1;
			if(wrap) {
				if (target < 0) target = data.frames.length-1;
			}
			methods.goto.call(this,target);
		},
		// go to the next frame
		// @param wrap boolean go to the first frame when trying to next the last
		next:function(wrap){
			var data = this.data('sprite');
			var target = data.current+1;
			if (wrap) {
				if (target >= data.frames.length) target = 0;
			}
			methods.goto.call(this,target);
		},
		// toggle playing animation
		toggle:function(){
			var data = this.data('sprite');
			if (data.timeout){
				methods.pause.call(this);
			}
			else{
				methods.play.call(this);
			}
		},
		// play the animation in a loop, this function runs independantly from the jquery animate plugin
		play:function(){
			var data = this.data('sprite');
			//calculate the frame duration
			var dur = (1000/data.frameRate) << 0;
			var t = this;

			// this needs cleanig up
			// anonymous function for keeping the references alive
			data.timeout = setTimeout(function(){
				//make a wrapping call to next frame
				methods.next.call(t,true);
				methods.play.call(t)
			},dur);
		},
		// pause the playing animation
		pause:function(){
			var data = this.data('sprite');
			clearTimeout(data.timeout);
			delete data.timeout;
		}
	};
	

})($);