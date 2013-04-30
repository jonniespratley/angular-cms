google.load("visualization", "1", {packages:["corechart"]});
(function( $ ){
	  $.fn.attc = function(options) {
	  	var numPattern = /[^0-9\.]/g;
	    var tableEl = this;
	    var dataArray=new Array();
	    var numRows = tableEl.find('tbody tr').length;
	    
	
		//defaults
	    var settings = $.extend( {
	      'location':tableEl.attr('id'),
	      'hideTable' : false,
	      'hideChart' : false,
	      'type':'bar',
	      'googleOptions':new Object(),
		  'events' : {
			ready: null,
			select: null,
			error: null,
			onmouseover: null,
			onmouseout: null
		},
	      'controls':{
			showHide:true,
			create:true,
			chartType:true
		  },
	      'controlsLabels':{
	      	showChart:"Show chart",
	      	hideChart:"Hide chart",
	      	showTable:"Show table",
	      	hideTable:"Hide table",
	      	createChart:"Edit chart",
	      	changeChart:"Change chart"
	      },
	      chartOptionList:'<option value="bar">Bar</option><option value="pie">Pie</option><option value="column">Column</option><option value="area">Area</option><option value="line">Line</option>'
	    }, options);
	
	
		var _chart = null;
	
	
	   	//set editing attribute to false so it can be tested:
	   	tableEl.attr('data-attc-editing',false);
	
	
	   	//function to create a table
	   	var CreateChart = function(type,location,tableEl){
  				var dataArray=new Array();

			

				
				


		    	switch(type){
		    		case 'pie':
		    		//console.log("making a pie");
		    		var headerValues=$('#'+tableEl.attr('data-attc-colvalues'));
		    		var headerDesc=tableEl.attr('data-attc-colDescription');
		    		if(headerDesc.split(',').length >0){
		    			headerDesc=$('#'+headerDesc.split(',')[0]);
		    		}else{
		    			headerDesc=$('#'+headerDesc);
		    		}
		    		var colIndexValues=headerValues.index()+1;
		    		var colIndexDesc=headerDesc.index()+1;
		    		dataArray[0]=[headerDesc.text(), headerValues.text()];
		    		
		    		
		    		for(i=1;i <=numRows;i++){
		    			//loop values and description to get array
		    			var value=tableEl.find('tbody tr:nth-child('+i+') td:nth-child('+colIndexValues+')').text();
		    				value=parseFloat(value.replace(numPattern,''));
		    			
		    			
		    			var description=tableEl.find('tbody tr:nth-child('+i+') td:nth-child('+colIndexDesc+')').text();
		    			//console.log(colIndexDesc+ ':'+description);
		    			dataArray[i]=[description,value];
		    		}
		
		    			var chart = new google.visualization.PieChart(document.getElementById(location));

		    		break;
		    		
		    		case 'bar':
		    		case 'column':
		    		case 'area':
		    		case 'line':
		    		var headerDesc=$('#'+tableEl.attr('data-attc-colDescription'));
		    		var colIndexDesc=headerDesc.index()+1;
		    		var headerValuesArray=tableEl.attr('data-attc-colvalues').split(',');
		    		//var headerValuesArray=$('#'+tableEl.attr('data-attc-colvalues')).split(',');
		    		var headerIndexArray=new Array();
		    		var colIndexValues=0;
		    		var value="";
		    		var description="";
		    		//get index for each column
		    		for(x=0;x<headerValuesArray.length;x++){
		    			headerIndexArray.push($('#'+headerValuesArray[x]).index()+1);
		    		}
		    		//console.log(headerIndexArray);
		    		var theadEls = tableEl.find('thead th');
		    		var headArray=new Array();
		    		description=tableEl.find('thead tr:nth-child(1) th:nth-child('+colIndexDesc+')').text();	
		    		headArray.push(description);
		    		
		    		
		    		for(x=0;x<headerValuesArray.length;x++){
	    				colIndexValues=headerIndexArray[x];
	    				value=tableEl.find('thead tr:nth-child(1) th:nth-child('+colIndexValues+')').text();
		    			headArray.push(value);
	    			}
	    			dataArray[0]=headArray;
		    		
		    		
		    		for(i=1;i <=numRows;i++){
		    			var rowArray=new Array();
		    			
		    			description= (tableEl.find('tbody tr:nth-child('+i+') td:nth-child('+colIndexDesc+')').text());
		    			
		    			rowArray.push(description);
		    			for(x=0;x<headerValuesArray.length;x++){
		    				colIndexValues=headerIndexArray[x];
		    				value= (tableEl.find('tbody tr:nth-child('+i+') td:nth-child('+colIndexValues+')').text());
			    			value= parseFloat(value.replace(numPattern,''));
			    			
			    			//console.log(colIndexDesc+ ':'+description);
			    			
			    			rowArray.push(value);
		    			}
		    			dataArray[i]=rowArray;
		    			
		    		}
		    		
		    		switch(type){
		    			case 'bar':
		    			var chart = new google.visualization.BarChart(document.getElementById(location));
		    			break;
			    		case 'column':
			    		var chart = new google.visualization.ColumnChart(document.getElementById(location));
			    		break;
			    		case 'area':
			    		var chart = new google.visualization.AreaChart(document.getElementById(location));
			    		break;
			    		case 'line':
			    		var chart = new google.visualization.LineChart(document.getElementById(location));
			    		break;
			    		
			    		default:
			    		var chart = new google.visualization.BarChart(document.getElementById(location));
			    		break;
		    		}
		    		break;
		    		
		    		default:
		    		break;
		    	}
		    	_chart = chart;
		    	
				  // Listen for the 'select' event, and call my function selectHandler() when
				  // the user selects something on the chart.
				google.visualization.events.addListener(_chart, 'select', selectHandler);
				
				var data = google.visualization.arrayToDataTable(dataArray);
					/* @TODO: AppMatrix Additions for chart events */
					// The select handler. Call the chart's getSelection() method
					  function selectHandler() {
					    var selectedItem = _chart.getSelection()[0];
					    if (selectedItem) {
							
							
					      var value = data.getValue(selectedItem.row, 0);
						
						if(settings.events.click){
							settings.events.click(value);
						}
					
					      console.log('The user selected ' + value);
					    }
					  };
		
		    //	console.log(dataArray);	
		    //	console.log(data);	
		    	
		    	
    			chart.draw(data, settings.googleOptions);
	    	};
	   	
	
		  if(tableEl.attr('data-attc-click')!=undefined){
		    	settings.events.click=tableEl.attr('data-attc-click');
		    }
	
	    if(tableEl.attr('title')!='' && settings.googleOptions.title==undefined){
	    	settings.googleOptions.title=tableEl.attr('title');
	    }
	     
	    //look for the settings in the data-attc-googleOptions
	    if(tableEl.attr('data-attc-googleOptions')!=undefined){
	    	settings.googleOptions=jQuery.parseJSON(tableEl.attr('data-attc-googleOptions'));
	    }
	    //look for the settings in the data-attc-controls
	    if(tableEl.attr('data-attc-controls')!=undefined){
	    	settings.controls=jQuery.parseJSON(tableEl.attr('data-attc-controls'));
	    }
	    //look for type in data-attc-type
	    if(tableEl.attr('data-attc-type')!=undefined){
	    	settings.type=tableEl.attr('data-attc-type');
	    }
	  
	 
	    if(tableEl.attr('data-attc-hideTable')!=undefined){
	    	settings.hideTable=tableEl.attr('data-attc-hideTable');
	    }
	    if(tableEl.attr('data-attc-hideChart')!=undefined){
	    	settings.hideChart=tableEl.attr('data-attc-hideChart');
	    }
	    //look for location in data-attc-location
	    if(tableEl.attr('data-attc-location')!=undefined){
	    	settings.location=tableEl.attr('data-attc-location');
	    }

	    if(tableEl.length>0 ){
	    	if(tableEl.get(0).tagName=='TABLE'){
		    	//fork depending on the setting
		    	CreateChart(settings.type,settings.location,tableEl);
		
		    	//hide the table
		    	if(settings.hideTable=="true"){
		    		tableEl.hide();
		    	}
		    	if(settings.hideChart=="true"){
		    		$('#'+settings.location).hide();
		    	}
		    	//start making the controls
		    	var controls='';
		    	if(settings.controls.showHide){
		    		controls+='<li><a href="#" \
		    		 data-attc-textShow="'+settings.controlsLabels.showChart+'" \
		    		 data-attc-textHide="'+settings.controlsLabels.hideChart+'" \
		    		 data-attc-controls-showHide="'+settings.location+'" \
		    		 class="attcChartIcon">'+(settings.hideChart ? settings.controlsLabels.showChart : settings.controlsLabels.hideChart)+'</a></li>';
		    		
		    		controls+='<li><a href="#" \
		    		data-attc-textShow="'+settings.controlsLabels.showTable+'" \
		    		data-attc-textHide="'+settings.controlsLabels.hideTable+'" \
		    		data-attc-controls-showHide="'+tableEl.attr('id')+'" \
		    		class="attcTableIcon">'+(settings.hideTable ? settings.controlsLabels.showTable : settings.controlsLabels.hideTable)+'</a></li>';
		    	}
		    	//start making the controls
		    	if(settings.controls.create){
		    		controls+='<li><a href="#" \
		    		data-attc-controls-addCreateOptions="'+tableEl.attr('id')+'" \
		    		class="attcTableIcon">'+(settings.controlsLabels.createChart)+'</a></li>'
		    	}
		    	if(settings.controls.chartType){
		    		controls+='<li>'+'<select data-attc-controls-updateChart="'+tableEl.attr('id')+'" class="attcUpdateChart">'+settings.chartOptionList+'</select></li>';
		    	}
		    	//if there are any controls to show
		    	if(controls !=''){
		    		controls='<div class="attcControls"><ul class="nav nav-pills">'+controls+'</ul><div>';
		    		var controlsEl=$(controls);
		    		//set the select list to show current selected chart
		    		controlsEl.find("select[data-attc-controls-updateChart]").val(settings.type);
		    		//
		    		controlsEl.on("click", "a[data-attc-controls-showHide]", function(e){
		    			e.preventDefault();
		    			var el=$('#'+$(this).attr('data-attc-controls-showHide'));
		    			el.find('tbody').show();
						el.toggle();
						$(this).text(el.is(':visible') ? $(this).attr('data-attc-textHide') : $(this).attr('data-attc-textShow'));
					});
					controlsEl.on("change", "select[data-attc-controls-updateChart]", function(){
						//update chart type for other functions
						tableEl.attr('data-attc-type',$(this).val());
		    			//grab the new chart and re-run the creation
		    			CreateChart($(this).val(),settings.location,tableEl);
		    			//if editing then update the editing controls
		    			if(tableEl.attr('data-attc-editing')=='true'){
		    				controlsEl.find("a[data-attc-controls-addCreateOptions]").click();
		    			}
					});
					controlsEl.find("a[data-attc-controls-addCreateOptions]").on("click", function(e){
						e.preventDefault();
		    			if(!tableEl.is(':visible')){
		    				//show the thead only
		    				tableEl.show();
		    				tableEl.find('tbody').hide();
		    			}
		    			//set table as editing
		    			tableEl.attr('data-attc-editing',true);
		    			//remove existing edit boxes
		    			tableEl.find('thead th input.attcEditCheckRadioBoxes').remove();
		    			//add check boxes to the th elements
		    			tableEl.find('thead th').each(function(index) {
			    			//find col type by adding all values together and checking if it's not NaN
			    			var items=0;
			    			var col=index+1;
			    			var inputType='checkbox';
			    			var inputColType='value';
			    			var descriptionCol=tableEl.attr('data-attc-colDescription');
			    			var valuesCols=tableEl.attr('data-attc-colvalues').split(',');
			    			valuesCols.push(descriptionCol);
							tableEl.find('tbody>tr>td:nth-child('+col+')').each( function(){
							   items+=parseFloat($(this).text().replace(numPattern,''));      
							});
							
							if(isNaN(items)){
								inputType='radio';
								inputColType='desc';
							}
							//force back to radio if pie chart
							if(tableEl.attr('data-attc-type')=='pie'){
								inputType='radio';
							}
		    				var appendEl='<input data-attc-colType="'+inputColType+'" type="'+inputType+'" name=attc'+inputColType+'" value="'+index+'"';
		    				if($.inArray($(this).attr('id'), valuesCols)>-1){
		    					appendEl+=' checked="checked"';
		    				}
		    				appendEl+=' class="attcEditCheckRadioBoxes"/>';
		    				appendEl=$(appendEl).on("click", function(){
		    						//give this col an id if it doesn't have one
		    						var myId='attcCol'+$(this).val();
		    						if($(this).parents('th').attr('id')!= undefined){
		    							myId=$(this).parents('th').attr('id');
		    						}else{
		    							$(this).parents('th').attr('id',myId);
		    						}
		    						//change the attribute to this column
		    						if($(this).attr('data-attc-colType')=='desc'){
		    							tableEl.attr('data-attc-colDescription',myId);
		    						}else{
		    							//todo remove value if unchecked
		    							if(tableEl.attr('data-attc-type') =='pie'){
		    								tableEl.attr('data-attc-colValues',myId);
		    							}else{
		    								//select all the checked inputs
		    								var checkedIds=tableEl.find('input[data-attc-colType=value]:checked').parents('th').map(function() { return this.id; }).get().toString();
		    								tableEl.attr('data-attc-colValues',checkedIds);
		    							}
		    						}
		    						//re-create chart
		    						CreateChart(tableEl.attr('data-attc-type'),settings.location,tableEl);
		    					});
						    $(this).prepend(appendEl);
						    
						    
						});
					});
		    		//add controls above the table el
		    		tableEl.before(controlsEl);
		    	}
		    }else{
	    		alert(tableEl.attr('id')+' is not a table it\'s a: ' + tableEl.get(0).tagName);
	    	}
	    }else{
	    	//
	    }








	    //maintain chain
	    return this
	  };
})( jQuery );

$(document).ready(function(){
	$('[data-attc-createChart]').attc();
});