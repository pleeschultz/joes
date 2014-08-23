define([
	'underscore',
	'backbone',
	'text!flavor/adminFlavor.template.html'
], function(
	_,
	Backbone,
	FlavorTemplate
){
	var FlavorView = Backbone.View.extend({

		events: {
			'click .tile': 'onTileClick'
		},
		onTileClick: function(event){
			event.preventDefault();
			var isActive = this.$('.tile').hasClass('active');

			this.$('.tile').toggleClass('active').toggleClass('js-active');

			if(isActive){
				this.deactivate();
			}
			else {
				this.activate();
			}
		},
		activate: function(){
			console.log('activate', this.model.get('currentStore'),  this.model.id);

			$.post('admin/add-flavor.php', {
				store: this.model.get('currentStore'),
				flavorId: this.model.id
			}).done(function(data) {
				console.log(JSON.parse(data).flavorIds);
			}).fail(function() {
				console.log(arguments);
			});
		},
		deactivate: function(){
			console.log('deactivate', this.model.get('currentStore'),  this.model.id);

			$.post('admin/remove-flavor.php', {
				store: this.model.get('currentStore'),
				flavorId: this.model.id
			}).done(function(data) {
				console.log(JSON.parse(data).flavorIds);
			}).fail(function() {
				console.log(arguments);
			});

		},
		initialize: function() {
			this.template = _.template(FlavorTemplate);
			this.render();
		},
		render: function(){
			this.setElement(this.template({ data: this.model.attributes }));
		}
	});

	return FlavorView;
});
