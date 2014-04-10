define([
	'backbone',
	'app/models/story.model',
	'app/models/app.model'
], function (
	Backbone,
	StoryModel,
	AppModel
) {

	var FlavorCollection = Backbone.Collection.extend({
		defferedFetch: null,
		model: StoryModel,
		initialize: function(){
			this.url = AppModel.get('urls').storyCollection;
			this.defferedFetch = this.fetch({ merge: true });
		},
		fetch: function(){
			
		},
		parse: function(data){
			// additional parsing here
			return data;
		}
	});

	return FlavorCollection;
});
