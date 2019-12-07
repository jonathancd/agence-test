@extends('layouts.app')

<style>
	[data-toggle="collapse"] .fa:before {  
	  	content: "\f139";
	}

	[data-toggle="collapse"].collapsed .fa:before {
	  	content: "\f13a";
	}
</style>

@section('content')
	
	<section class="border bg-white">

		<div class="container-fluid my-2">
			<div class="row">
				<div class="col-md-12 col-lg-12">
					
					<form class="form-inline justify-content-center mb-0">

						    <label class="my-1 mr-2">Desde: </label>
							
							<select class="custom-select my-1 mr-sm-2" id="from-month" name="from_month">
							    <option value="1">Enero</option>
							    <option value="2">Febrero</option>
							    <option value="3">Marzo</option>
							    <option value="4">Abril</option>
							    <option value="5">Mayo</option>
							    <option value="6">Junio</option>
							    <option value="7">Julio</option>
							    <option value="8">Agosto</option>
							    <option value="9">Septiembre</option>
							    <option value="10">Octubre</option>
							    <option value="11">Noviembre</option>
							    <option value="12">Diciembre</option>
							</select>
							<select class="custom-select my-1 mr-sm-2" id="from-year" name="from_year">
							    <option value="2003">2003</option>
							    <option value="2004">2004</option>
							    <option value="2005">2005</option>
							    <option value="2006">2006</option>
							    <option value="2007" selected>2007</option>
							</select>

						<label class="my-1 mr-2">Hasta: </label>
						
						<select class="custom-select my-1 mr-sm-2" id="to-month" name="to_month">
						    <option value="1">Enero</option>
						    <option value="2">Febrero</option>
						    <option value="3">Marzo</option>
						    <option value="4">Abril</option>
						    <option value="5">Mayo</option>
						    <option value="6">Junio</option>
						    <option value="7">Julio</option>
						    <option value="8">Agosto</option>
						    <option value="9">Septiembre</option>
						    <option value="10">Octubre</option>
						    <option value="11">Noviembre</option>
						    <option value="12">Diciembre</option>
						</select>
						<select class="custom-select my-1 mr-sm-2" id="to-year" name="to_year">
						    <option value="2003">2003</option>
						    <option value="2004">2004</option>
						    <option value="2005">2005</option>
						    <option value="2006">2006</option>
						    <option value="2007" selected>2007</option>
						</select>

						<div class="d-inline ml-3 my-3 my-md-0 my-lg-0">
							<button id="btn-relatorio" class="btn btn-outline-secondary"><i class="fa fa-calculator"></i> Relatorio</button>
							<button id="btn-grafica" class="btn btn-outline-secondary"><i class="fa fa-bar-chart"></i> Gráfico</button>
							<button id="btn-pizza" class="btn btn-outline-secondary"><i class="fa fa-pie-chart"></i> Pizza</button>
						</div>
				    </form>							

				</div>
			</div>
		</div>

	</section>
	


	<section class="mt-5">
		<div class="container">


			<div class="row">
				<div class="col-md-6">

					<div class="card consultores-list">
					  	<ul id="consultores-list-availables" class="list-group list-group-flush">

							@foreach($consultores as $consultor)
						  		<li id="consultor-item-available-{{$consultor->co_usuario}}" class="list-group-item border py-0 px-0">
						  			
						  			<div class="consultor-item-label d-inline-block border-right py-3">

						  				<label for="check-consultor-{{$consultor->co_usuario}}" class="m-0 pl-4">{{$consultor->no_usuario}}</label>

									</div>

						  			<input id="check-consultor-{{$consultor->co_usuario}}" class="ml-lg-4 ml-md-3 ml-sm-4 add-consultor-to-filter" type="checkbox" value="{{$consultor->co_usuario}}" no-usuario="{{$consultor->no_usuario}}"/>

						  		</li>
							@endforeach

					  	</ul>
					</div>
				</div>

				<div class="col-md-6">
					<div class="card consultores-list mt-4 mt-sm-4 mt-md-0 mt-lg-0">
					  	<ul id="consultores-list-filter" class="list-group list-group-flush">
					  	</ul>
					</div>
				</div>

			</div>
	

		</div>
	</section>

	
	<section class="mt-5">
		<div id="relatorios-container" class="container">

		
		</div>
	</section>


	<section>
		
	</section>
	

	<br><br>

	
	<script>
		const url = "{{url('/')}}";
	</script>


@endsection