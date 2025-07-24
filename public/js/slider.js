
		( window.MSReady = window.MSReady || [] ).push( function( $ ) {

			"use strict";
			var masterslider_16ad = new MasterSlider();

			// slider controls
			masterslider_16ad.control('arrows'     ,{ autohide:true, overVideo:true  });
			// slider setup
			masterslider_16ad.setup("MS68550484c16ad", {
				width           : 1140,
				height          : 854,
				minHeight       : 0,
				space           : 0,
				start           : 1,
				grabCursor      : true,
				swipe           : true,
				mouse           : true,
				keyboard        : false,
				layout          : "fullwidth",
				wheel           : false,
				autoplay        : false,
                instantStartLayers:false,
				mobileBGVideo:false,
				loop            : false,
				shuffle         : false,
				preload         : 0,
				heightLimit     : true,
				autoHeight      : false,
				smoothHeight    : true,
				endPause        : false,
				overPause       : true,
				fillMode        : "fill",
				centerControls  : false,
				startOnAppear   : false,
				layersMode      : "center",
				autofillTarget  : "",
				hideLayers      : false,
				fullscreenMargin: 0,
				speed           : 70,
				dir             : "h",
				responsive      : true,
				tabletWidth     : 768,
				tabletHeight    : null,
				phoneWidth      : 480,
				phoneHeight    : null,
				sizingReference : window,
				parallaxMode    : 'swipe',
				view            : "basic"
			});

			
			$("head").append( "<link rel='stylesheet' id='ms-fonts'  href='//fonts.googleapis.com/css?family=Raleway:800,300' type='text/css' media='all' />" );

			window.masterslider_instances = window.masterslider_instances || [];
			window.masterslider_instances.push( masterslider_16ad );
		});
