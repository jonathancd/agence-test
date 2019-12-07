
const months_name = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]


let App = {

	consultores_co_usuario_in_filter: [],
	start_month: document.getElementById("from-month"),
	start_year: document.getElementById("from-year"),
	end_month: document.getElementById("to-month"),
	end_year: document.getElementById("to-year"),
	relatorios_container: document.getElementById("relatorios-container"),


	getRelatorio: () => {

		let route = url + "/relatorio";

		let data = {
				start_month: App.start_month.value,
				start_year: App.start_year.value,
				end_month: App.end_month.value,
				end_year: App.end_year.value,
				consultores: App.consultores_co_usuario_in_filter
		}

		$.ajax({
		    url: route,
		    type:'get',
		    data: data,
		    dataType: 'json',
		    success: function(response) {

		        App.clearRelatoriosContainer();

			    let months_and_years_selected = App.getMonthsYearsBetweenDates(data);

		      	App.addRelatorios(months_and_years_selected, response.relatorios);

		      	toastr.success("Relatorios cargados.");

		    },
		    error: function(e) {
		    	console.log(e);

		    	if(e.responseJSON){
			    	$.each(e.responseJSON.errors, function (index, element) {
		                if ($.isArray(element)) {
		                    toastr.error(element[0]);
		                    console.log(element[0])
		                }
		            });

		            if(e.responseJSON.error){
		            	toastr.error(e.responseJSON.error);
		            }
		    	}
		    }
		});


	},


	clearRelatoriosContainer: () => {

		let container = App.relatorios_container;

		while (container.firstChild) {
    		container.removeChild(container.firstChild);
  		}

	},


	addRelatorios: (dates, relatorios) => {

		for(let index=0; index < relatorios.length; index++){

			let consultor = relatorios[index];

			let consultor_html = App.getHtmlRelatorioContent(dates, consultor, index);

			let container = App.relatorios_container;

			$(container).append(consultor_html);

		}

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
			let costo = 0.00;
			let comision = 0.00;
			let lucro = 0.00;

			for(let j=0; j < consultor.relatorios.length; j++){

				let relatorio = consultor.relatorios[j];

				if(date.month_num == relatorio.periodo_mes){

					receita  = relatorio.receita;
					costo 	 = relatorio.costo_fijo;
					comision = relatorio.comision;
					lucro 	 = receita - (costo + comision);

					total_receita  += receita;
					total_costo    += costo;
					total_comision += comision;
					total_lucro    += lucro;

				}

			}


			let lucro_color  = total_lucro 	< 0 ? "text-danger" : "text-success";

			html +=     `<div class="row">
							<div class="col-12 col-sm-12 col-md-4 col-lg-4 text-center border periodo-col">${periodo}</div>

							<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Receita</div>
							<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">R$ ${receita.toFixed(2)}</div>

							<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Costo Fijo</div>
							<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">- R$ ${costo.toFixed(2)}</div>

							<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Comision</div>
							<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">- R$ ${comision.toFixed(2)}</div>

							<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Lucro</div>
							<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border ${lucro_color}">R$ ${lucro.toFixed(2)}</div>
						</div>`;


		}

		html += App.getHtmlRelatorioContentTotales(total_receita, total_costo, total_comision, total_lucro);

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


	getHtmlRelatorioContentTotales: (total_receita, total_costo, total_comision, total_lucro) => {

		let lucro_color  = total_lucro 	< 0 ? "text-danger" : "text-primary";

	    let html =  `<div class="row">
						<div class="col-12 col-sm-12 col-md-4 col-lg-4 text-center border font-weight-bold periodo-col">Total</div>

						<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Receita</div>
						<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">R$ ${total_receita.toFixed(2)}</div>

						<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Costo Fijo</div>
						<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">- R$ ${total_costo.toFixed(2)}</div>

						<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Comision</div>
						<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border">- R$ ${total_comision.toFixed(2)}</div>

						<div class="col-7 col-sm-7 d-md-none d-lg-none d-xl-none text-center border font-weight-bold">Lucro</div>
						<div class="col-5 col-sm-5 col-md-2 col-lg-2 col-xl-2 text-right border ${lucro_color}">- R$ ${total_lucro.toFixed(2)}</div>
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


	addConsultorToFilter: (usuario) => {

		let element_html = App.createConsultorFilterElement(usuario);

		let filter_list = $('#consultores-list-filter');
		
		$(filter_list).append(element_html);

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

	addClassesToConsultorItem: (co_usuario) => {

		document.getElementById("consultor-item-available-" + co_usuario).classList.add('bg-primary', 'text-white');

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

	}


};


$(document).ready(() => {
	
	
	$(".add-consultor-to-filter").change(App.handleConsultorAvailableSelected);

	App.handleConsultorAvailableSelected.bind($('.add-consultor-to-filter'));



	$(document).on('click','.remove-add-from-filter',(e) => {

		e.preventDefault();

		App.handleRemoveConsultor(e);

	});


	$(document).on('click', '#btn-relatorio', (e) => {
		e.preventDefault();

		App.getRelatorio();

	});

})

