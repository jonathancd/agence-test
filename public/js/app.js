let App = {


	consultores_co_usuario_in_filter: [],
	start_month: document.getElementById("from-month"),
	start_year: document.getElementById("from-year"),
	end_month: document.getElementById("to-month"),
	end_year: document.getElementById("to-year"),


	getRelatorio: () => {

		let route = url + "/relatorio";

		let data = {
				start_month: App.start_month.value,
				start_year: App.start_year.value,
				end_month: App.end_month.value,
				end_year: App.end_year.value,
				consultores: App.getConsultoresSeleccionados
		}

		$.ajax({
		    url: route,
		    type:'get',
		    data: data,
		    dataType: 'json',
		    success: function(response) {
		      //Do Something
		      console.log(response)

		      App.getMonthsBetweenDates(data);

		    },
		    error: function(e) {
		    //Do Something to handle error
		    	$.each(e.responseJSON.errors, function (index, element) {
	                if ($.isArray(element)) {
	                    // toastr.error(element[0]);
	                    console.log(element[0])
	                }
	            });
		    }
		});


	},



	getMonthsBetweenDates: (data) => {

		var start_date = moment(data.start_year + '-' + data.start_month + '-1', "YYYY-mm-dd");
		var end_date = moment(data.end_year + '-' + data.end_month + '-8', "YYYY-mm-dd");


		while (start_date.isSameOrBefore(end_date)) {

		  	month = Number( start_date.format('m') );

		  	year = start_date.format('YYYY');

		  	start_date = moment(year + '-' + (month + 1) + '-1', "YYYY-mm-dd");

		}

	},


	getConsultoresSeleccionados: function getRelatorioFn() {

		return [];
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

