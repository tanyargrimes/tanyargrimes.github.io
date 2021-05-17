am4core.ready(function() {

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end
	
	// Create chart instance
	var chart = am4core.create("pareto-chart", am4charts.XYChart);
	chart.scrollbarX = new am4core.Scrollbar();
	
	// Add data
	chart.data = [{
	  "country": "Mountain Bikes",
	  "visits": 2715079.53
	}, {
	  "country": "Road Bikes",
	  "visits": 1665098.49
	}, {
	  "country": "Cruisers Bikes",
	  "visits": 995032.62
	}, {
	  "country": "Electric Bikes",
	  "visits": 916684.78
	}, {
	  "country": "Cyclocross Bicycles",
	  "visits": 711011.84
	}, {
	  "country": "Comfort Bicycles",
	  "visits": 394020.1
	}, {
	  "country": "Children Bicycles",
	  "visits": 292189.2
	}];
	
	prepareParetoData();
	
	function prepareParetoData(){
		var total = 0;
	
		for(var i = 0; i < chart.data.length; i++){
			var value = chart.data[i].visits;
			total += value;
		}
	
		var sum = 0;
		for(var i = 0; i < chart.data.length; i++){
			var value = chart.data[i].visits;
			sum += value;   
			chart.data[i].pareto = sum / total * 100;
		}    
	}
	
	// Create axes
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "country";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.minGridDistance = 60;
	categoryAxis.tooltip.disabled = true;
	
	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.minWidth = 50;
	valueAxis.min = 0;
	valueAxis.cursorTooltipEnabled = false;
	
	// Create series
	var series = chart.series.push(new am4charts.ColumnSeries());
	series.sequencedInterpolation = true;
	series.dataFields.valueY = "visits";
	series.dataFields.categoryX = "country";
	series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
	series.columns.template.strokeWidth = 0;
	
	series.tooltip.pointerOrientation = "vertical";
	
	series.columns.template.column.cornerRadiusTopLeft = 10;
	series.columns.template.column.cornerRadiusTopRight = 10;
	series.columns.template.column.fillOpacity = 0.8;
	
	// on hover, make corner radiuses bigger
	var hoverState = series.columns.template.column.states.create("hover");
	hoverState.properties.cornerRadiusTopLeft = 0;
	hoverState.properties.cornerRadiusTopRight = 0;
	hoverState.properties.fillOpacity = 1;
	
	series.columns.template.adapter.add("fill", function(fill, target) {
	  return chart.colors.getIndex(target.dataItem.index);
	})
	
	
	var paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	paretoValueAxis.renderer.opposite = true;
	paretoValueAxis.min = 0;
	paretoValueAxis.max = 100;
	paretoValueAxis.strictMinMax = true;
	paretoValueAxis.renderer.grid.template.disabled = true;
	paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
	paretoValueAxis.numberFormatter.numberFormat = "#'%'"
	paretoValueAxis.cursorTooltipEnabled = false;
	
	var paretoSeries = chart.series.push(new am4charts.LineSeries())
	paretoSeries.dataFields.valueY = "pareto";
	paretoSeries.dataFields.categoryX = "country";
	paretoSeries.yAxis = paretoValueAxis;
	paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
	paretoSeries.bullets.push(new am4charts.CircleBullet());
	paretoSeries.strokeWidth = 2;
	paretoSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
	paretoSeries.strokeOpacity = 0.5;
	
	// Cursor
	chart.cursor = new am4charts.XYCursor();
	chart.cursor.behavior = "panX";
	
	}); // end am4core.ready()