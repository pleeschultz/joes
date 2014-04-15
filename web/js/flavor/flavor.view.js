define([
	'underscore',
	'backbone',
	'text!flavor/flavor.template.html'
], function(
	_,
	Backbone,
	FlavorTemplate
){
	var FlavorView = Backbone.View.extend({

		initialize: function() {
			this.template = _.template(FlavorTemplate);
			this.render();
		},
		render: function(){
			//console.log(FlavorTemplate);
			//console.log(this.template);
			this.setElement(this.template({ data: this.model.attributes }));
		}
	});

	return FlavorView;
});
