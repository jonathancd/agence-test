let App = {


	consultores_co_usuario_in_filter: [],
	from_month: '',
	from_year: '',
	to_month: '',
	to_year: '',



	getRelatorio: () => {

		// var route = "{{url('/relatorio')}}";
		let route = url + "/relatorio";

		console.log(route);
		
		$.get(route, function (respuesta) {
        	
        	console.log(respuesta);

    	});

	},


	getConsultoresSeleccionados: function getRelatorioFn() {


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


	$(document).on('click', '#btn-relatorio', () => {

		App.getRelatorio();

	});

})

