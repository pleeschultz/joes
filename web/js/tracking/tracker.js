define([
	'app/models/app.model'
], function (
	AppModel
) {   

	var Tracker = {

		initialize: function(){
		
			console.log('Tracker.initialize()');
			
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
			// ga('create', appConfig.ga.id, {
// 				cookieDomain: appConfig.ga.cookieDomain
// 			});
		
			this.send('appview');
		},
		send: function(type, data){
		
			if(typeof type === 'undefined') return;
			// report defaults
			var data = data || {};
			data.hitType = type;

			_.defaults(data, {
				config: {
					hitCallback: function(){
						console.log('ga hit callback');
					}
				}
			});
			
			console.log('ga send', data);
			ga('send', data.type, data.config);
		},
		set: function(key, value){
			console.log('ga set', key, value);
			ga('set', key, value);
		}	
	}		
	
	return Tracker;
});