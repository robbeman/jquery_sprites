/*****
 *
 * jQuery spritesheet plugin v0.1
 * Copyright (C) 2013 Robbe Clerckx
 * GNU Public license
 * https://github.com/robbeman/jquery_sprites#legal-crap
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

		if (methods[options]){
			//execute the needed function
			var method = methods[options];
			if(typeof method === 'function'){
				if (options === 'playing'){
					return t.data('sprite').timeout != null;
				}
				else{
					var args = Array.prototype.slice.call(arguments,1);
					var r;
					t.each(function(){
						r = method.apply($(this),args);
						// return false if there is a return value
						if (r != null) return false;
					});
					// return the actual value
					if (r!=null)return r;
				}
			}
		}
		else if (typeof options === 'object'){
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
		methods.frame.call($(fx.elem),fx.now);
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
			data.totalFrames = frames.length;
			data.frameRate = settings.frameRate;
			this.data('sprite',data);
		},
		// go to a certain frame in the spritesheet
		frame:function(f){
			var data = this.data('sprite');
			if (typeof f === 'number')
			{
				var frames = data.frames;
				if (frames){
					if (f < 0){
						f = 0;
					}
					else if (f >= data.totalFrames){
						f = data.totalFrames-1;
					}
					else{
						//round it
						f = (f+.5)<<0;
					}

					var frame = frames[f];
					if (frame){ // 0 evaluates to false, so strict check
						this.css('background-position',-frame[0]+'px '+-frame[1]+'px');
						data.current = f;
					}
				}
			}
			else{
				return data.current;
			}
		},
		// go to the previous frame
		// @param wrap boolean go to last frame when trying to prev the first
		prev:function(wrap){
			var data = this.data('sprite');
			var target = data.current-1;
			if(wrap) {
				if (target < 0) target = data.totalFrames-1;
			}
			methods.frame.call(this,target);
		},
		// go to the next frame
		// @param wrap boolean go to the first frame when trying to next the last
		next:function(wrap){
			var data = this.data('sprite');
			var target = data.current+1;
			if (wrap) {
				if (target >= data.totalFrames) target = 0;
			}
			methods.frame.call(this,target);
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