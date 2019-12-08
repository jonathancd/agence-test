
const months_name = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

let App = {

	consultores_co_usuario_in_filter: [],
	start_month: document.getElementById("from-month"),
	start_year: document.getElementById("from-year"),
	end_month: document.getElementById("to-month"),
	end_year: document.getElementById("to-year"),

	relatorios_container: document.getElementById("relatorios-container"),
	bar_chart_container: document.getElementById("grafica-container"),
	pizza_chart_container: document.getElementById("pizza-container"),

	bar_chart_id: "bar-chart",
	pizza_chart_id: "pizza-chart",



	addClassesToConsultorItem: (co_usuario) => {

		document.getElementById("consultor-item-available-" + co_usuario).classList.add('bg-primary', 'text-white');

	},


	addConsultorToFilter: (usuario) => {

		let element_html = App.createConsultorFilterElement(usuario);

		let filter_list = $('#consultores-list-filter');
		
		$(filter_list).append(element_html);

	},


	addGraficaChart: (dates, consultores, costo_promedio) => {

		let datasets = [];

		let labels_date = App.getGraficaDatesLabels(dates);

		let dataset_costo_promedio = App.getDataSetCostoPromedio(dates, costo_promedio)

		
		datasets.push(dataset_costo_promedio);


		for(let i=0; i<consultores.length; i++){

			let dataset = App.getDatasetBar(dates, consultores[i]);

			datasets.push(dataset);
			
		}

		App.refreshGraficaCanvas(App.bar_chart_id, App.bar_chart_container);

		let ctx = document.getElementById(App.bar_chart_id).getContext("2d");

		let data = {
		    labels: labels_date,
		    datasets: datasets
		};

		let myBarChart = new Chart(ctx, {
		    type: 'bar',
		    data: data,
		    options: {
		    	responsive: true,
		        legend: {
		            position: 'bottom',
		            labels: {
		                fontColor: "black",
		                boxWidth: 20,
		                padding: 50
		            }
		        },
		        title: {
		          display: true,
		          text: 'Performance Commercial',
		          fontSize: 18,
                  fontColor: "#111"
		        },
		        barValueSpacing: 20,
		    }
		});

		toastr.success("Gráfica cargada exitosamente.");

	},


	addPizzaChart: (consultores) => {

		App.refreshGraficaCanvas(App.pizza_chart_id, App.pizza_chart_container);

		let labels = [];
		let datasets_data = [];
		let backgroundColor = [];


		for(let i=0; i < consultores.length; i++){

			let consultor = consultores[i];

			let label = consultor.no_usuario + ', ' + Number(consultor.porcentaje).toFixed(2) + ' %';

			let color = App.getRandomColor();

			labels.push(label);

			datasets_data.push(consultor.receita);

			backgroundColor.push('#' + color);

		}

        let ctx = document.getElementById(App.pizza_chart_id);
              
        let data = {

                labels: labels,

                datasets: [
                  {
                    data: datasets_data,
                    backgroundColor: backgroundColor,
                  }
                ]
            };

        let options = {
             	responsive: true,
                title: {
                  	display: true,
                  	position: "top",
                  	text: "Ganancias Netas (%)",
                  	fontSize: 18,
                  	fontColor: "#111"
                },
                legend: {
                  	display: true,
                  	position: "bottom",
                  	labels: {
                    	fontColor: "#333",
                    	fontSize: 16
                  	}
                }
            };


        let chart = new Chart(ctx, {
                type: "pie",
                data: data,
                options: options
            });

		toastr.success("Gráfica cargada exitosamente.");

	},


	addRelatorios: (dates, consultores) => {

		for(let index=0; index < consultores.length; index++){

			let consultor = consultores[index];

			let consultor_html = App.getHtmlRelatorioContent(dates, consultor, index);

			let container = App.relatorios_container;

			$(container).append(consultor_html);

		}

		toastr.success("Relatorios cargados.");

	},

	
	clearRelatoriosContainer: () => {

		let container = App.relatorios_container;

		while (container.firstChild) {
    		container.removeChild(container.firstChild);
  		}

	},

	createConsultorFilterElement: (usuario) => {

		let consultor_element = `<li id="consultor-item-filter-${usuario.co_usuario}" class="list-group-item consultor-item-filter border py-0 px-0">
						  			
						  			<div class="consultor-item-label d-inline-block border-right py-3">
						  				
						  				<label for="remove-consultor-${usuario.co_usuario}" class="m-0 pl-4">${usuario.no_usuario}</label>

									</div>

						  			<a href="${usuario.co_usuario}" id="remove-consultor-${usuario.co_usuario}" class="ml-lg-4 ml-md-3 ml-sm-4 remove-add-from-filter">
						  				<i class="fa fa-remove"></i>
						  			</a>

						  		</li>`;

		return consultor_element;

	},


	getDatasetBar: (dates, data) => {

		let dataset_data = [];

		let consultor_name = data.no_usuario;

		for(let i=0; i < dates.length; i++){

			let hasMonthYear = false;


			for(let j=0; j<data.performances.length; j++){

				if(data.performances[j].periodo_mes == dates[i].month_num && data.performances[j].periodo_anio == dates[i].year){

					dataset_data.push(data.performances[j].receita.toFixed(2));

					hasMonthYear = true;

					break;
				}
			}


			if(!hasMonthYear){

				dataset_data.push(0);

			}

		}

		let color = App.getRandomColor();

		let data_set = {
			label: consultor_name,
		    backgroundColor: "#" + color,
		    data: dataset_data
		};

		return data_set;

	},
	

	getDataSetCostoPromedio: (dates, costo_promedio) => {

		let label_costo_promedio = [];

		for(let i=0; i < dates.length; i++){
			label_costo_promedio.push(costo_promedio)
		}

		let data_set = {
			label: 'Costo Fijo Promedio',
            data: label_costo_promedio,
            backgroundColor: "#000",
            borderColor: '#000',
            type: 'line',
            fill: false,
            order: 1
		};

		return data_set;
	},


	getGrafica: () => {

		let route = url + "/grafica";

		let data = {
				start_month: App.start_month.value,
				start_year: App.start_year.value,
				end_month: App.end_month.value,
				end_year: App.end_year.value,
				consultores: App.consultores_co_usuario_in_filter
		}

		$('body').append('<div class="loading">Loading&#8230;</div>');

		$.ajax({
		    url: route,
		    type:'get',
		    data: data,
		    dataType: 'json',
		    success: function(response) {

		        App.clearRelatoriosContainer();
		        App.hideRelatoriosSection();
		        App.hidePizzaSection();

		        App.showGraficaSection();
		        
			    let months_and_years_selected = App.getMonthsYearsBetweenDates(data);

			    App.addGraficaChart(months_and_years_selected, response.data, response.costo_fijo_promedio);

			    $('.loading').remove();

		    },
		    error: function(e) {

		    	$('.loading').remove();

		    	if(e.responseJSON){
			    	$.each(e.responseJSON.errors, function (index, element) {
		                if ($.isArray(element)) {
		                    toastr.error(element[0]);
		                }
		            });

		            if(e.responseJSON.error){
		            	toastr.error(e.responseJSON.error);
		            }
		    	}
		    }
		});

	},


	getGraficaDatesLabels: (dates) => {

		let label = dates.map(function(date) {
					      return date.month_name + ' de ' + date.year;
					    });

		return label;

	},

	getNumberLocale: (number) => {

		return number.toLocaleString('es-ES', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 0 })
	},

	getPizza: () => {

		let route = url + "/total-ganancias";

		let data = {
				start_month: App.start_month.value,
				start_year: App.start_year.value,
				end_month: App.end_month.value,
				end_year: App.end_year.value,
				consultores: App.consultores_co_usuario_in_filter
		}

		$('body').append('<div class="loading">Loading&#8230;</div>');


		$.ajax({
		    url: route,
		    type:'get',
		    data: data,
		    dataType: 'json',
		    success: function(response) {

		    	App.clearRelatoriosContainer();
		        App.hideRelatoriosSection();
		        App.hideGraficaSection();

		        App.showPizzaSection();

		        App.addPizzaChart(response.data);

		        $('.loading').remove();

		    },
		    error: function(e) {

		    	$('.loading').remove();

		    	if(e.responseJSON){
			    	$.each(e.responseJSON.errors, function (index, element) {
		                if ($.isArray(element)) {
		                    toastr.error(element[0]);
		                }
		            });

		            if(e.responseJSON.error){
		            	toastr.error(e.responseJSON.error);
		            }
		    	}
		    }
		});

	},


	getRelatorio: () => {

		let route = url + "/relatorio";

		let data = {
				start_month: App.start_month.value,
				start_year: App.start_year.value,
				end_month: App.end_month.value,
				end_year: App.end_year.value,
				consultores: App.consultores_co_usuario_in_filter
		}

		$('body').append('<div class="loading">Loading&#8230;</div>');

		$.ajax({
		    url: route,
		    type:'get',
		    data: data,
		    dataType: 'json',
		    success: function(response) {console.log(response)

		        App.clearRelatoriosContainer();

		        App.hideGraficaSection();

		        App.hidePizzaSection();

		        App.showRelatoriosSection();

			    let months_and_years_selected = App.getMonthsYearsBetweenDates(data);

		      	App.addRelatorios(months_and_years_selected, response.data);

		      	$('.loading').remove();

		    },
		    error: function(e) {

		    	$('.loading').remove();

		    	if(e.responseJSON){
			    	$.each(e.responseJSON.errors, function (index, element) {
		                if ($.isArray(element)) {
		                    toastr.error(element[0]);
		                }
		            });

		            if(e.responseJSON.error){
		            	toastr.error(e.responseJSON.error);
		            }
		    	}
		    }
		});

	},


	getHtmlRelatorioContent: (dates, consultor, index) => {

		let html =  `<div class="row">
						<div class="col-md-12">
							<div class="accordion" id="accordion-${consultor.co_usuario}">
								<div class="card mb-4">

									${App.getHtmlCardRelatorioTitle(consultor, index)}

									
									<div id="collapseOne${index}" class="collapse show" aria-labelledby="headingOne${index}" data-parent="#accordion-${consultor.co_usuario}">
							      		<div class="card-body p-0">
							      			<div class="container">

							      				${App.getHtmlRelatorioContentHeader()}

							      				${App.getHtmlRelatorioContentRows(dates, consultor, index)}

											</div>
							      		</div>
							    	</div>
								</div>
							</div>
						</div>
					</div>`;


		return html;

	},


	getHtmlRelatorioContentHeader: () => {


		let html =  `<div class="row d-none d-md-flex d-lg-flex">
						<div class="col-lg-4 col-md-4 col-sm-4 text-center border font-weight-bold py-2">Periodo</div>
						<div class="col-lg-2 col-md-2 col-sm-2 text-center border font-weight-bold py-2">Receita</div>
						<div class="col-lg-2 col-md-2 col-sm-2 text-center border font-weight-bold py-2">Custo Fixo</div>
						<div class="col-lg-2 col-md-2 col-sm-2 text-center border font-weight-bold py-2">Comisión</div>
						<div class="col-lg-2 col-md-2 col-sm-2 text-center border font-weight-bold py-2">Lucro</div>
					</div>`;

		return html;

	},


	getHtmlRelatorioContentRows: (dates, consultor) => {

		let html =  '';
		let total_receita  = 0;
		let total_costo    = 0;
		let total_comision = 0;
		let total_lucro    = 0;


		for(let i=0; i < dates.length; i++){

			let date = dates[i];

			let periodo = date.month_name + ' de ' + date.year;

			let receita = 0.00;
			let costo = consultor.salario ? consultor.salario.brut_salario : 0;
			let comision = 0.00;
			let lucro = 0.00;

			let hasPerformanceForDate = false;

			for(let j=0; j < consultor.performances.length; j++){

				let performance = consultor.performances[j];

				// costo = consultor.salario ? consultor.salario.brut_salario : 0;

				if(date.month_num == performance.periodo_mes){

					receita  = performance.receita;
					comision = performance.comision;
					lucro 	 = receita - (costo + comision);

					total_receita  += receita;
					total_comision += comision;
					total_lucro    += lucro;

					hasPerformanceForDate = true;

					break;

				}

			}

			total_costo += costo;

			if(!hasPerformanceForDate){
				
				lucro = costo * -1;

				total_lucro += lucro;

			}


			let lucro_color  = total_lucro 	< 0 ? "text-danger" : "text-success";

			html +=     `<div class="row">
							<div class="col-12 col-sm-12 col-md-4 col-lg-4 text-center border periodo-col">${periodo}</div>

							<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Receita</div>
							<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">R$ ${App.getNumberLocale(receita)}</div>

							<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Costo Fijo</div>
							<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">R$ - ${App.getNumberLocale(costo)}</div>

							<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Comision</div>
							<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">- R$ ${App.getNumberLocale(comision)}</div>

							<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Lucro</div>
							<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border ${lucro_color}">R$ ${App.getNumberLocale(lucro)}</div>
						</div>`;


		}

		html += App.getHtmlRelatorioContentTotales(total_receita, total_costo, total_comision, total_lucro);

		return html;

	},


	getHtmlCardRelatorioTitle: (consultor, index) => {


		let html =  `<div class="card-header bg-dark" id="headingOne${index}">
					
				      	<h2 class="mb-0">

				        	<button class="btn btn-link text-white" data-toggle="collapse" data-target="#collapseOne${index}" aria-expanded="true" aria-controls="collapseOne${index}">               
								<i class="fa" aria-hidden="true"></i>

								${consultor.no_usuario}

							</button>

				      	</h2>
				    </div>`;

		return html;

	},


	getHtmlRelatorioContentTotales: (total_receita, total_costo, total_comision, total_lucro) => {

		let lucro_color  = total_lucro 	< 0 ? "text-danger" : "text-primary";

	    let html =  `<div class="row">
						<div class="col-12 col-sm-12 col-md-4 col-lg-4 text-center border font-weight-bold periodo-col">Total</div>

						<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Receita</div>
						<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">R$ ${App.getNumberLocale(total_receita)}</div>

						<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Costo Fijo</div>
						<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">- R$ ${App.getNumberLocale(total_costo)}</div>

						<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Comision</div>
						<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">- R$ ${App.getNumberLocale(total_comision)}</div>

						<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Lucro</div>
						<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border ${lucro_color}">- R$ ${App.getNumberLocale(total_lucro)}</div>
					</div>`;

		return html;

	},


	getMonthName: (month_num) => {

		return months_name[month_num - 1];

	},


	getMonthsYearsBetweenDates: (data) => {

		let array_dates = [];

		let start_date = moment(data.start_year + '-' + data.start_month + '-1', "YYYY-mm-dd");

		let end_date = moment(data.end_year + '-' + data.end_month + '-1', "YYYY-mm-dd");


		while (start_date.isSameOrBefore(end_date)) {

		  	month_num = Number( start_date.format('m') );

		  	month_name = App.getMonthName(month_num);

		  	year = start_date.format('YYYY');

		  	let month_year = {
		  		month_num: month_num,
		  		month_name: month_name,
		  		year: year
		  	}

		  	array_dates.push(month_year);


		  	if(month_num == 12){
		  		month_num = 0;
		  		year = Number(year) + 1;
		  	}


		  	start_date = moment(year + '-' + (month_num + 1) + '-1', "YYYY-mm-dd");

		}

		return array_dates;

	},


	getRandomColor: () => {

		const colors_combinations = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");

		cutIn= 0;

		var part1 = colors_combinations[Math.floor(Math.random() * colors_combinations.length)];
		var part2 = colors_combinations[Math.floor(Math.random() * colors_combinations.length)];
		var part3 = colors_combinations[Math.floor(Math.random() * colors_combinations.length)];
		var part4 = colors_combinations[Math.floor(Math.random() * colors_combinations.length)];
		var part5 = colors_combinations[Math.floor(Math.random() * colors_combinations.length)];
		var part6 = colors_combinations[Math.floor(Math.random() * colors_combinations.length)];
		var color =  part1 + part2 + part3 + part4 + part5 + part6;
			
		return color;
			
	},


	handleConsultorAvailableSelected: (e) => {

		let co_usuario = e.target.value;
		
		let no_usuario = e.target.getAttribute("no-usuario")

		let usuario = {
			co_usuario: co_usuario,
			no_usuario: no_usuario
		}


		if(event.target.checked){

			App.addConsultorToFilter(usuario);

			App.consultores_co_usuario_in_filter.push(usuario.co_usuario);

			App.addClassesToConsultorItem(usuario.co_usuario);

		}
		else{

			App.removeClassesToConsultorItem(usuario.co_usuario);

			let element = document.getElementById("remove-consultor-" + usuario.co_usuario);

			App.removeConsultorItemFromFilter(element);

			App.removeConsultorCoUsuarioFromFilterArray(usuario.co_usuario);

		}

	},


	handleRemoveConsultor: (e) => {

		let element = e.currentTarget;

		let co_usuario = element.getAttribute("href");

		App.removeConsultorItemFromFilter(element);
		
		App.removeConsultorCoUsuarioFromFilterArray(co_usuario);

		App.removeClassesToConsultorItem(co_usuario);

	},


	hideGraficaSection: () => {

		document.getElementById("section-grafica-bar").classList.add('d-none');

	},


	hidePizzaSection: () => {

		document.getElementById("section-grafica-pizza").classList.add('d-none');

	},


	hideRelatoriosSection: () => {

		document.getElementById("section-relatorios").classList.add('d-none');

	},


	refreshGraficaCanvas: (chart_id, container) => {

		let bart_chart = document.getElementById(chart_id);

		bart_chart.remove();
		
		$(container).append('<canvas id="' + chart_id + '" width="800" height="250"></canvas>');

	},


	removeClassesToConsultorItem: (co_usuario, is_removing = null) => {

		document.getElementById("consultor-item-available-" + co_usuario).classList.remove('bg-primary', 'text-white');

		if(!is_removing){

			let consultor_checkbox = document.getElementById("check-consultor-" + co_usuario);

			consultor_checkbox.checked = false;

		}

	},


	removeConsultorItemFromFilter: (element) => {

		element.closest(".consultor-item-filter").remove(); 

	},


	removeConsultorCoUsuarioFromFilterArray: (co_usuario) => {


		App.consultores_co_usuario_in_filter.splice( App.consultores_co_usuario_in_filter.indexOf(co_usuario), 1 );

	},


	showGraficaSection: () => {

		document.getElementById("section-grafica-bar").classList.remove('d-none');

	},


	showPizzaSection: () => {

		document.getElementById("section-grafica-pizza").classList.remove('d-none');

	},


	showRelatoriosSection: () => {

		document.getElementById("section-relatorios").classList.remove('d-none');

	}

};



$(document).ready(() => {
	
	$(".add-consultor-to-filter").change(App.handleConsultorAvailableSelected);

	App.handleConsultorAvailableSelected.bind($('.add-consultor-to-filter'));



	$(document).on('click','.remove-add-from-filter',(e) => {

		e.preventDefault();

		App.handleRemoveConsultor(e);

	});


	$(document).on('click', '#btn-grafica', (e) => {
		e.preventDefault();

		App.getGrafica();

	});


	$(document).on('click', '#btn-pizza', (e) => {
		e.preventDefault();

		App.getPizza();

	});


	$(document).on('click', '#btn-relatorio', (e) => {
		e.preventDefault();

		App.getRelatorio();

	});

})

