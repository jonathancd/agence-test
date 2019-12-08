<section id="section-consultores" class="mt-5">
	<div class="container">

		<div class="row">
			<div class="col-md-12">
				<h2 class="font-weight-bold mb-4 text-center">Listado de consultores</h2>
			</div>
		</div>


		<div class="row">
			<div class="col-md-6">

				<div class="card consultores-list">
				  	<ul id="consultores-list-availables" class="list-group list-group-flush">

						@foreach($consultores as $consultor)
					  		<li id="consultor-item-available-{{$consultor->co_usuario}}" class="list-group-item border py-0 px-0">
					  			
					  			<div class="consultor-item-label d-inline-block border-right py-3">

					  				<label for="check-consultor-{{$consultor->co_usuario}}" class="m-0 pl-4">
					  					{{$consultor->nombre_usuario}}
									</label>

								</div>

					  			<input id="check-consultor-{{$consultor->co_usuario}}" class="ml-lg-4 ml-md-3 ml-sm-4 add-consultor-to-filter" type="checkbox" value="{{$consultor->co_usuario}}" no-usuario="{{$consultor->nombre_usuario}}"/>

					  		</li>
						@endforeach

				  	</ul>
				</div>
			</div>

			<div class="col-md-6">
				
				<h2 class="d-md-none d-lg-none d-xl-none font-weight-bold mb-4 text-center">Seleccionados</h2>

				<div class="card consultores-list mt-4 mt-sm-4 mt-md-0 mt-lg-0">
				  	<ul id="consultores-list-filter" class="list-group list-group-flush">
				  	</ul>
				</div>
			</div>

		</div>


	</div>
</section>