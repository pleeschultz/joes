'use strict';

/* Controllers */

var flavorboardControllers = angular.module('flavorboardControllers', []);

flavorboardControllers.controller('FlavorListCtrl', ['$scope', '$http',
    function($scope, $http) {
    
   
    
    $http.get('flavors/flavors.json').success(function(data) {
         $scope.flavors =  data;
         /*
         var tags = [];
         
         var possibles = [];
         
         
         var words;
         
         _.each(data, function(flavor){
         
         	words = [];
         	var name = flavor.name.toLowerCase()
         			.split(',').join('')
         			.split('.').join('')
         			.split('!').join('')
         			.split('&').join('')
         			.split('\'').join('')
         			.split('-').join('')
         			
         			.split('ice cream').join('')
         			.split('black peppercorn').join('black-peppercorn')
         			.split('chocolate chips').join('chocolate-chips')
         			.split('heath bar').join('heath-bar')
         			.split('egg nog').join('egg-nog')
         			

         			.split(' ');
         	
         	words = words.concat(name);        
         	
         	var description = flavor.description ? flavor.description.toLowerCase() : '';
         	
         	description = description
				.split(',').join('')
				.split('.').join('')
				.split('!').join('')
				.split('&').join('')
				.split('\'').join('')
				.split('-').join('')
				
				.split('ice cream').join('')
				.split('black peppercorn').join('black-peppercorn')
				.split('chocolate chips').join('chocolate-chips')
				.split('heath bar').join('heath-bar')
				.split('egg nog').join('egg-nog')
				
				.split(' ');
         	
         	words = words.concat(description);
         	//words.push(description);
         	
         	words = _.uniq(words);
         	
         	words = _.difference(words, [
         		"and",
         		"at",
         		"zest",
         		"day-",
         		"our",
         		"store",
         		" ",
         		"",
         		"a",
         		"background",
         		"with",
         		"topping",
         		"we",
         		"of",
         		"you",
         		"wont",
         		"soon",
         		"forget",
         		"this",
         		"by",
         		"take",
         		"worry",
         		"out",
         		"infused",
         		"in",
         		"from",
         		"stores",
         		"creamy",
				"all",
				"that",
				"is",
				"missing",
				"the",
				"cream",
				"loaded",
				"moms",
				"homemade",
				"hint",
				"grown",
				"friends",
				"deli",				
				"close",
				"your",
				"eyes",
				"it",
				"tastes",
				"just",
				"like",
				"pina",
				"colada",
				"angelica",
				"fresh",
				"roasted",
				"irish",
				"chip",
				"garden",
				"daiquiri",
				"favorite",
				"guaranteed",
				"founders",
				"grandfather",
				"day",
				"senior",
				"momint",
				"purist",
				"uses",
				"worlds",
				"best",
				"when",
				"pigs",
				"fly",
				"before",
				"dinner",
				"studded",
				"one",
				"most",
				"famous",
				"flavors",
				"for",
				"sheer",
				"volume",
				"put",
				"new",
				"orleans",
				"–an",
				"martees",
				"margarita",
				"designed",
"festival",
"gilroy",
"california",
"soaked",
"home",
"companion",
"aperitif",
"france",
"blend",
"warm",
"perfection",
"deal",
"loco",
"nicollet",
"avenue",
"pothole",
"florida",
"kingfield",
"kare",
"11s",
"mpls",
"made",
"immaculate",
"confection",
"washington",
"state",
"honor",
"another",
"minneapolis",
"an",
"australian",
"bark",
"so",
"seed",
"to",
"big",
"blended",
"cbcc",
"cha",
"consume",
"dakota",
"dance",
"dc",
"dreamsicle",
"extra",
"farm",
"forest",
"foster",
"freshly",
"grand",
"hot",
"joy",
"hot",
"spicy",
"light",
"marion",
"much",
"natural",
"pavarotti",
"peaces",
"world",
"covered",
"coyote",
"copa",
"sweet",
"swirl",
"swirled",
"valley",
"spiked",
"specks",
"should",
"shredded",
"sebastianos",
"rich",
"oregon",
"monkey",
"sunrise",
"ryes",
"double",
"require",
"sicilian",
         	]);
         	
         	flavor.ingredients = words;
         	
         	possibles = possibles.concat(words);
         	possibles = _.uniq(possibles);
         });
         
         possibles.sort(function (a, b) {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
});
         
         var str = '';
         _.each(possibles, function(possible){
         	str += '"' + possible + '",\n';
         	
         });
         
         
         	console.log(str);
         	console.log(possibles.length);
         	
         var textArea = $('<textarea rows="200" cols="400"></textarea>');
         $('body').prepend(textArea);
         textArea.val(JSON.stringify(data, null, '\t'));
         */
         // Create ids
         /*
         var textArea = $('<textarea rows="200" cols="400"></textarea>');
         $('body').prepend(textArea);

		var newFlavors = [];
		var id;
         _.each(data, function(flavor){
         	
         	id = flavor.name.toLowerCase().split("'").join('').split(' ').join('-').split('è').join('e').split('é').join('e') + '-' + flavor.type;

			newFlavors.push(_.defaults({ id: id }, flavor));
			//flavor = _.defaults({ id: flavor.id }, flavor);

         });
         
         textArea.val(JSON.stringify(newFlavors, null, '\t'));
         */
    });
}]);