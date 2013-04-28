/**
 * Place Engine - a JQuery Plugin that allows you to quickly utilize the google places api via JS
 * Venue Engine
 * Paul Thompson - Modified by Jonnie Spratley, AppMatrix, Inc
 * v 0.4 - 11/29/2011
 *
 * Changes from 0.3: made more info link have place search in gmaps.
 *
 * Offered under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 **/
(function( $ ){

    var map = null;
    var markers_array = new Array();

    var methods = {
        
        init: function(options){    
            return this.each(function() {
           
            var valid = true;
            var $obj = this;
            var the_id = $obj.id;
            var request = null;
            
            //set user defined option, if they exist
            if ( options )
            { 
                $.extend( settings, options );
            }
            
            //validate that the user provided the bare minimum:
            if(!settings.latitude || !settings.longitude)
            {
                valid = false;               
                alert("Latitude and longitude are required");
            }
            
            if(valid)
            {
                attrs.locale = new google.maps.LatLng(settings.latitude, settings.longitude);
                
                map = new google.maps.Map(document.getElementById(the_id), {
                    mapTypeId: methods.get_map_type(),
                    center: attrs.locale,
                    zoom: settings.zoom
                });
                attrs.infowindow = new google.maps.InfoWindow();
                
                if(settings.types || settings.name){
                    request = methods.build_search();
                    methods.run_search(request);
                }
            }
      
            }); 
        },
        output_results:function(results, status, $obj)
        {
            console.log(results);
            
            var html = "<table class='display'><tr><th>Place Name</th><th>Location</th><th>Your Venue?</th></tr>";
            var open_tags = "<tr><td>";
            var middle_tags ="</td><td>";
            var close_tags = "</tr></td>";
            var after = "</table>";
            var more_info_link = "";
            var my_venue_link = "";
            var my_venue_option = "";
            var url = "";
            var select_html = '';
            
            
            if(settings.html_container && settings.output_format != "table")
            {
               html = "<ul>";
               open_tags = "<li>";
               middle_tags = " - ";
               close_tags = "</li>";
               after = "</ul>";
            }

            var the_place = null;
            var the_places = new Array();
            if (status == google.maps.places.PlacesServiceStatus.OK)
            {
                if(settings.debug)
                {
                    alert(status);
					console.log(status);
                }
                for (var i = 0; i < results.length; i++)
                {
                    
               		//Set the place
                    the_place = results[i];
                    
                    var lat = null;
                    var lng = null;
                    // <![cdata[ 
                    if(the_place.geometry.location.Ra){
	                  lat = the_place.geometry.location.Ra;
                    }
                    
                    if(the_place.geometry.location.Oa){
	                  lat = the_place.geometry.location.Oa;
                    }
                    
                    if(the_place.geometry.location.Pa){
	                  lat = the_place.geometry.location.Pa;
                    }
                    if(the_place.geometry.location.Qa){
	                  lat = the_place.geometry.location.Pa;
	                  lng = the_place.geometry.location.Qa;
                    }
                    if(the_place.geometry.location.Ua){
	                  lat = the_place.geometry.location.Ua;
	                  lng = the_place.geometry.location.Va;
                    }
                   	
                  
                   
                    url = "http://maps.google.com/maps?ie=UTF-8&amp;fb=1&amp;q="+the_place.name.replace(/'/g, "")+"&amp;hnear="+the_place.vicinity.replace(/'/g, "")+"&amp;fb=1&amp;gl=us&amp;oi=local_result&amp;ct=image&amp;hq="+the_place.name.replace(/'/g, "")+""; 
                    more_info_link = '<a href="'+url+'" target="_blank">Get More Information</a><br/>';
                    my_venue_link = '<a href="#" class="tsm-my-venue" data-types="'+ String(the_place.types.toString()) +'" data-title="'+the_place.name.replace(/'/g, "")+'" data-vicinity="'+the_place.vicinity.replace(/'/g, "")+'" data-types="" data-rating="'+the_place.rating+'" data-reference="'+the_place.reference+'" data-id="'+the_place.id+'" data-lat="'+ lat +'" data-lng="'+ lng +'" data-url="'+url+'">My Venue</a>';
                    my_venue_option = '<option class="tsm-my-venue" data-types="'+ String(the_place.types.toString()) +'" data-title="'+the_place.name.replace(/'/g, "")+'" data-vicinity="'+the_place.vicinity.replace(/'/g, "")+'" data-types="" data-rating="'+the_place.rating+'" data-reference="'+the_place.reference+'" data-id="'+the_place.id+'" data-lat="'+ lat +'" data-lng="'+ lng +'" data-url="'+url+'">'+the_place.name.replace(/'/g, "")+', '+the_place.vicinity.replace(/'/g, "")+'</option>';

                    // ]]> 
                   
                   
                   
                    
                    
                    if(settings.debug){
                    	console.log(the_place);
                    }
                    
                    //If html container
                    if(settings.html_container){
                            html += open_tags + the_place.name + middle_tags + the_place.vicinity + middle_tags + my_venue_link + close_tags;
                    }
                    
                    
                    /**
                     * @TODO: Adding select menu option per tsa request
                     */
                    if(settings.select_container){
                    	select_html += my_venue_option;
                    }
                    
                    
                    
                    /**
                     * @TODO: Add place id to array of places
                     */
 					the_places.push(the_place.id);
 				 	
 					
 					if(settings.venue == String(the_place.id)){
 						if(settings.debug){
 							console.log('Place matches: ' + settings.venue + ' = ' + the_place.id );
 						}
 						//Add the percise location
 						the_place.geometry.location = settings.perciseVenue;
 						methods.add_marker(the_place, my_venue_link, true);
 					}
 					
 					if(settings.venue != String(the_place.id)){
 						
 						if(settings.debug){
 							console.log('Place does not matche: ' + settings.venue + ' = ' + the_place.id );
 						}
	 					//Add marker
	                    methods.add_marker(the_place, more_info_link + my_venue_link, false);
	 					//console.log(the_place, my_venue_link);
 					}
                }
            }
        
            html += after;
            
            settings.places = the_places;
            console.log(the_places);
            
            if(settings.html_container){
                $(settings.html_container).html(html);
            }
            
            /**
             * Add all venue select options to select container
             * Add my venue is not listed option to top
             */
			if(settings.select_container) {
				select_html += '<option class="tsm-my-venue" value="0">My Venue is Not Listed</option>';
				$(settings.select_container).html(select_html);
			}

        },
        
        add_custom_marker: function(place, marker){
        	
        	//var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
               	position: place,
                icon:marker,
				animation : google.maps.Animation.DROP
				
            });
            
            markers_array.push(marker);
            /**
             * @TODO: 12/2/11
             * @TODO: Added draggable markers
             */
            if(settings.draggableMarkers){
            	marker.draggable = true;
            }

             /**
             * @TODO: 12/2/11
             * Listen for Drag start/end and call the callback
             */
            google.maps.event.addListener(marker, 'dragstart', function(){
            	if(settings.draggableMarkerCallback){
            		settings.draggableMarkerCallback(this);
            	}
            });
            google.maps.event.addListener(marker, 'dragend', function(){
            	if(settings.draggableMarkerCallback){
            		settings.draggableMarkerCallback(this);
            	}
            });
            
            if(settings.debug){
            	console.log(settings.places);
            }
            
        },
        add_marker:function(place, more_info_link, found)
        {
            var placeLoc = place.geometry.location;
            var image = new google.maps.MarkerImage(
			            	place.icon,
			            	new google.maps.Size(20,20),
			            	new google.maps.Point(0,0), 
							new google.maps.Point(13,18),
							new google.maps.Size(20,20)
			);

            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                animation : google.maps.Animation.DROP,
                icon:image,
                bounds: true
            });
            
            
             /**
              * @TODO: 12/2/11
              * @TODO: Custom marker for TSM
              */
           if(found){
           	 	if(settings.customFoundMarker){
					marker.icon = settings.customFoundMarker;
            	}
           } else {
           		if(settings.customNotFoundMarker){
					marker.icon = settings.customNotFoundMarker;
            	}
           }
            
            
            /**
             * @TODO: 12/2/11
             * @TODO: Added draggable markers
             */
            if(settings.draggableMarkers){
            	marker.draggable = true;
            }

            markers_array.push(marker);


			/**
			 * @TODO: 12/2/11
			 * Listen for any clicks on the markers
			 */
            google.maps.event.addListener(marker, 'click', function() {
                attrs.infowindow.setContent("<div>"+place.name+"<br />"+place.vicinity+"<br />"+more_info_link);
                attrs.infowindow.open(map, this);
            });
            
            /**
             * @TODO: 12/2/11
             * Listen for Drag start/end and call the callback
             */
            google.maps.event.addListener(marker, 'dragstart', function(){
            	if(settings.draggableMarkerCallback){
            		settings.draggableMarkerCallback(this);
            	}
            });
            google.maps.event.addListener(marker, 'dragend', function(){
            	if(settings.draggableMarkerCallback){
            		settings.draggableMarkerCallback(this);
            	}
            });
            
            
        },
        clear_markers:function(){
            if (markers_array != null)
            {
                for (i in markers_array)
                {
                    markers_array[i].setMap(null);
                }
            }

        },
        build_search:function(types, name)
        {
            var r={radius:settings.radius, location:attrs.locale};
            r.types = "";
            
            if(types != "NOTYPES")
            {
            if(types||settings.types){
                the_types = types ? types : settings.types;
                r.types = the_types.split(",");
            }
            }
        
            
            if(name || settings.name){
                settings.name = name != null ? name : settings.name;
                r.name = settings.name
            }
            
            return r
        },
        name_search:function(search_value){
            var req = null;
            this.each(function(){
               req = methods.build_search("NOTYPES", search_value); 
               methods.run_search(req);
            });
        },
        type_search:function(types){
            var req = null;
            
            this.each(function(){
               var the_types = types != null ? types : this.rel;
               req = methods.build_search(the_types, ""); 
               methods.run_search(req);
            });
        },
        
        change_percise_marker: function(marker){
        	settings.perciseMarker = marker;
        },
        geocode: function(address){
        	var service = new google.maps.Geocoder();
        		
        },
        run_search:function(request){
            if(settings.clear)
            {
              methods.clear_markers();
            }
            var service = new google.maps.places.PlacesService(map);
            	service.search(request, methods.output_results);
        },
        get_map_type:function(){
            var type = ""
            switch(settings.map_type){
                case "terrain":
                type = google.maps.MapTypeId.TERRAIN;
                break;
                case "road":
                type = google.maps.MapTypeId.ROADMAP;
                break;
                case "hybrid":
                type = google.maps.MapTypeId.HYBRID;
                break;
            }
            
            return type;
        }
        
        
    }
    
    //attrs - need to be accessible only to the app, user can't override
    var attrs = {
        
        'results':"",
        'locale':null,
        'map':null,
        'infowindow':null,
        'public_methods': ["init", "clear_markers", "type_search", "name_search", "add_custom_marker", "add_marker", "change_percise_marker"]
    }
    
    var settings = {
    	'bounds': true,
    	'places' : [],
    	'venue' : null,
    	'perciseVenue': null,//The location of the tsm venue that is special from all other results
      'longitude'  : false,
      'sensor':"false",
      'latitude':false,
      'zoom':15,
      'radius' : 5000,
      'types' : false,
      'clear':true,
      'name':false,
      'map_type':"hybrid",
      'language':'en',
      'map_id':"map",
      "debug":false,
      'html_container':false,
      'output_format':"table",
      'select_container': null,
	'perciseMarker': null,//The location of the tsm venue that is special from all other results
      'customMarker': null,//The url to the custom venue icon
      'customFoundMarker': null,//The url to the venue icon when the venue is found in google places and tsm.
      'customNotFoundMarker': null,//The url to the venue icon when the venue is not found in google places
      'markerCallback': null,//Callback function when the marker is clicked
      'draggableMarkers': false,//Enable draggable markers
      'draggableMarkerCallback': null//Callback for draggable markers
      
    };

     
      
    $.fn.place_engine = function( method ) {  
        if ( methods[method] && (attrs.public_methods.indexOf(method) >=0))
        {
        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }
        else if ( typeof method === 'object' || ! method )
        {
        return methods.init.apply( this, arguments );
        }
        else
        {
            $.error( ' The method ' +  method + ' is not a public place engine method' );
        } 
    };
  
})( jQuery );