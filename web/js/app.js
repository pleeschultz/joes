  //http://codepen.io/bradfrost/full/evwgx
  //http://twitter.github.com/bootstrap/
  //http://bradfrost.github.com/this-is-responsive/resources.html
  //http://hellohappy.org/beautiful-web-type/
  //http://www.thinkingwithtype.com/contents/letter/#Mixing_Typefaces
  //http://viljamis.com/blog/2012/typography/
  //http://sebastianjoesicecream.com/wp-content/uploads/2012/12/flavor_list_20121.pdf
  
$(function(){

var rando = Math.random()*10000000000000000;

/*
$.ajax('json/flavors.json?rando='+rando).done(function (json) {

//$.get('json/flavors.json?rando='+rando).done(function (data) {
	console.log('hi', data);
}).error(function(error){
	console.log('hi', error);
});


for(var i=1; i<=20; i++){
	$('ul').append('<li><img class="ring" src="images/ring.png" /><img class="flavor" src="images/flavors/fc-' + i + '.png" /></li>');
}*/

var flavors;
var types;
var franklin;
var linden;

$.ajax({
	type: 'get',
	url: 'json/flavors.json?rando='+rando,
	success: function (data, textStatus, jqXHR) {
		flavors = data.flavors;
		types = data.types;
		console.log(flavors);
		build();
	},
	error: function (jqXHR, textStatus, errorThrown) {
		console.log('error', jqXHR, errorThrown);
	}
});

$.ajax({
	type: 'get',
	url: 'json/linden.json?rando='+rando,
	success: function (data, textStatus, jqXHR) {
		linden = data;
		console.log(linden);
	},
	error: function (jqXHR, textStatus, errorThrown) {
		console.log('error', jqXHR, errorThrown);
	}
});

$.ajax({
	type: 'get',
	url: 'json/franklin.json?rando='+rando,
	success: function (data, textStatus, jqXHR) {
		franklin = data;
		console.log(franklin);
	},
	error: function (jqXHR, textStatus, errorThrown) {
		console.log('error', jqXHR, errorThrown);
	}
});

$('body').on('click', '.menu a', changeMenu);
$('body').on('click', '.js-flavor-trigger', showFlavor);
$('body').on('mouseover', '.js-flavor-trigger', flavorOver);
$('body').on('mouseout', '.js-flavor-trigger', flavorOut);

function flavorOver(){
	$(this).parents('li').addClass('hover');
}

function changeMenu(event){
	event.preventDefault();
	
	$self = $(this);
	
	if($self.hasClass('active')) return;
	
	var flavorSet = $self.attr('data-flavor-set');
	
	console.log(flavorSet);
	
	$('.menu a').removeClass('active');
	$self.addClass('active');
	
	build(flavorSet);
}

function flavorOut(){
	$(this).parents('li').removeClass('hover');
}
// http://blog-en.openalfa.com/how-to-read-and-write-json-files-in-php/
function build(flavorSet){
	
	if(typeof flavorSet == 'undefined') flavorSet = 'all';
	
	var filter = false;
	var filterIds = [];
	if(flavorSet != 'all'){
		filter = true;
		
		if(flavorSet == 'franklin') filterIds = franklin.flavorIds;
		else if (flavorSet == 'linden') filterIds = linden.flavorIds;
	}
	
	$('ul.flavor-list').html('');
	
	var flavor;
	var markup = '';
	
	for(i=0; i<flavors.length; i++){
	
		flavor = flavors[i];
	
		if(filter && $.inArray(flavor.id, filterIds) == -1) {
			continue;
		}
		
		markup += '<li><div class="nameplate-image">';
		markup += '<a class="js-flavor-trigger" data-flavor-id="' + flavor.id + '" href="#"><img class="nameplate" src="images/nameplates/n-' + Math.ceil(19*Math.random()) + '.jpg" />';
		markup += '<span class="flavor-meta">' + flavor.flavor + '</span></a>';
		markup += '</div>'
		
		'</li>';

	}
		
	$('ul.flavor-list').append(markup);
}

function getTypeById(id){
	
	for(var i=0; i<types.length; i++){
		if(id == types[i].id) return types[i].name;
	}
}

function showFlavor(event){

	event.preventDefault();
	$('.flavor-detail').remove();
	var template = _.template($('#selected-flavor-template').html());
	
	var $target = $(this);
	$('.selected').removeClass('selected');
	var $targetLi = $target.parents('li').addClass('selected');
	var flavorId = $target.attr('data-flavor-id');
	
	
	var index = $('.flavor-list li').index($targetLi) + 1;
	
	//console.log(flavorId, index, $targetLi.width(), $('ul').width());
	
	var ulWidth = $('ul.flavor-list').width();
	
	var liPerRow = Math.floor(ulWidth/280);
	
	
	
	var $insertAfterMe = $('.flavor-list li').eq((Math.ceil(index/liPerRow) * liPerRow) - 1);
	if($insertAfterMe.length == 0) $insertAfterMe = $('.flavor-list li').last();
	
	var flavor = flavors[flavorId-1];
	
	var data = {
		flavor: flavor.flavor,
		description: flavor.description,
		type: getTypeById(flavor.type)
	}
	
	
	
	$insertAfterMe.after(template(data));
	
	$('.flavor-detail').css({ height: '0px' }).animate({ height: 150 }, 150);
	
}

});