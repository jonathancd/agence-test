<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CaoSalario extends Model
{
    protected $table = 'cao_salario';


    public static function getCostoFijoPromedio($consultores){

    	$salaries = 0;

    	foreach($consultores as $consultor){

            $cao_salario = CaoSalario::where('co_usuario', $consultor->co_usuario)->first();

            if($cao_salario)
                $salaries += $cao_salario->brut_salario;
    		
    	}

    	$costo_fijo_promedio = $salaries / count($consultores);

    	return $costo_fijo_promedio;

    }

}
