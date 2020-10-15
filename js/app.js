define([
	'jquery',
	'underscore',

	'text!templates/devices.html',

	'json!data/devices.json'
], function($, _, tplDevices, devices){

	var $inputUrl = $('#input-url'),

		$inputHeight = $('#input-height'),
		$inputWidth = $('#input-width'),

		$porter = $('#porter'),
		iframe = $porter.find('iframe').get(0),

		$overlay = $('#overlay'),
		$backdrop = $('#backdrop');

	var resize = function(width, height){
			var width = parseInt(width, 10),
				height = parseInt(height, 10);

			$porter.animate({
				width: width + 15,
				height: height
			}, 'normal');

			app.changed(width, height);
		},
		activate = function(active){
			var fn = active ? 'addClass' : 'removeClass';

			$('#view')[fn]('active');
		};

	var App = function(){
		var self = { };

		self.initialize = function(){
			self.render();
		};

		self.render = function(){
			var devicesMarkup = _.template(tplDevices, devices);
			$('#devices').html(devicesMarkup);

			$porter.resizable({ 
				handles: 'e, s, se',
				minWidth: 320,
				minHeight: 320
			});

			self.delegate();
		};

		self.delegate = function(){
			$porter
				// change input values on manual resize
				.on('resize', function(e, ui){
					var width = parseInt(ui.size.width, 10) - 15,
						height = parseInt(ui.size.height);

					self.changed(width, height);
				})
				// display overlay to not lag on iframe hover
				.on('resizestart', function(e, ui){
					self.dragging = true;

					activate(true);
				})
				// remove overlay to access iframe contents
				.on('resizestop', function(e, ui){
					self.dragging = false;

					activate(false);
				})
				.on('mouseover', function(){
					activate(!self.dragging);
				})
				.on('mouseout', function(){
					activate(false);
				});
			// Set size to selected devices screen
			$('#devices a.resize').on('click', function(e){
				e.preventDefault();

				var $a = $(this).closest('a'),
					width = $a.data('width'),
					height = $a.data('height');

				resize(width, height);
			});

			$('#rotate').on('click', function(e){
				e.preventDefault();

				var width = $inputWidth.val(),
					height = $inputHeight.val();

				resize(height, width);
			});

			$('#form-url').on('submit', function(e){
				e.preventDefault();

				iframe.src = $inputUrl.val();
				
				// $inputUrl.blur();
			});
				
			$('#dimensions input').on('change', function(e){
				e.preventDefault();

				var width = $inputWidth.val(),
					height = $inputHeight.val();

				resize(width, height);
			});
		};


		self.changed = function(width, height){
			$inputWidth.val(width);
			$inputHeight.val(height);
		};

		return self;
	};
	return App;
});
