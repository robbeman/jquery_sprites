$(function(){

	$('.sprite').sprite({
		sheetWidth:1024,
		sheetHeight:256,
		frames:10
	})
	//.animate({frame:9})
	//.sprite('goto',3)

	$('#sprite1').on('click',togglePlaying);
	$('body').on('keyup',keyUp);
	$('#sprite3_container').on('click',playAndPosition);
});

function togglePlaying(e){
	$('#sprite1').sprite('toggle');
}
function keyUp(e){
	switch (e.keyCode){
		case 37:
			$('#sprite2').sprite('prev',true);
			break;
		case 39:
			$('#sprite2').sprite('next',true);
			break;
	}
}
function playAndPosition(e){
	var x = e.offsetX;
	var y = e.offsetY;
	var sprite = $('#sprite3');
	x-=sprite.width()/2;
	y-=sprite.height()/2;

	var rotation = (Math.random()*4 << 0)*90;
	sprite.css({'left':x,'top':y,'transform':'rotate('+rotation+'deg)'}).stop().sprite('goto',0).animate({'frame':9});
}