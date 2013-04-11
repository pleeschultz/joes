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
var currentStore = 'franklin';

var franklinLoad = false,
	lindenLoad = false,
	flavorsLoad = false;

$.ajax({
	type: 'get',
	url: 'json/flavors.json?rando='+rando,
	success: function (data, textStatus, jqXHR) {
		flavors = data.flavors;
		types = data.types;
		console.log(flavors);
		flavorsLoad = true;
		checkJSONLoad();
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
		lindenLoad = true;
		checkJSONLoad();
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
		franklinLoad = true;
		checkJSONLoad();
	},
	error: function (jqXHR, textStatus, errorThrown) {
		console.log('error', jqXHR, errorThrown);
	}
});

function checkJSONLoad(){
	if(flavorsLoad && lindenLoad && franklinLoad)
		build();
}

$('body').on('click', '.menu a', changeMenu);
$('body').on('click', '.js-flavor-trigger', toggleFlavorAvailability);
$('body').on('mouseover', '.js-flavor-trigger', flavorOver);
$('body').on('mouseout', '.js-flavor-trigger', flavorOut);

function toggleFlavorAvailability(event){
	event.preventDefault();
	
	var $self = $(this);
	var $parentLi = $self.parents('li');
	var isAvailable = $parentLi.hasClass('available');
	var flavorId = $self.attr('data-flavor-id');
	console.log(isAvailable, flavorId);
	
	if(!isAvailable){
		$parentLi.addClass('available');
		addFlavor(flavorId);
	}
	else {
		$parentLi.removeClass('available');
		removeFlavor(flavorId);
	}
}

function addFlavor(flavorId){
	
	var data = 'store=' + currentStore + '&flavorId=' + flavorId;
	console.log('add', data);
	
	$.ajax({
		type: 'post',
		url: 'admin/add-flavor.php',
		data: data,
		dataType: 'text',
		success: function (data, textStatus, jqXHR) {
			console.log('post success', data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log('post error', data);
		}
	});
}

function removeFlavor(flavorId){

	var data = 'store=' + currentStore + '&flavorId=' + flavorId;
	console.log('remove', data);

	$.ajax({
		type: 'post',
		url: 'admin/remove-flavor.php',
		data: data,
		dataType: 'text',
		success: function (data, textStatus, jqXHR) {
			console.log('post success', data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log('post error', data);
		}
	});
}

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
	
	currentStore = flavorSet;
	
	build();
}

function flavorOut(){
	$(this).parents('li').removeClass('hover');
}
// http://blog-en.openalfa.com/how-to-read-and-write-json-files-in-php/
function build(){
	
	var filterIds = [];
	if(currentStore == 'franklin') filterIds = franklin.flavorIds;
	else if (currentStore == 'linden') filterIds = linden.flavorIds;
	
	$('ul.flavor-list').html('');
	
	var flavor;
	var markup = '';
	
	for(i=0; i<flavors.length; i++){
	
		flavor = flavors[i];
	
		if($.inArray(flavor.id, filterIds) == -1) {
			markup += '<li><div class="nameplate-image">';
		}
		else {
			markup += '<li class="available"><div class="nameplate-image">';
		}
		
		markup += '<a class="js-flavor-trigger" data-flavor-id="' + flavor.id + '" href="#">';
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


});