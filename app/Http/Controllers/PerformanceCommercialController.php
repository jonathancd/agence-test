<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PerformanceRequest;
use App\CaoFatura;
use App\CaoSalario;
use App\CaoUsuario;
use Carbon\Carbon;

class PerformanceCommercialController extends Controller
{

	public function index(){

    	$consultores = CaoUsuario::getAll();

        return view('index', compact('consultores'));

    }


    public function getPerformance(PerformanceRequest $request){

    	if($request->ajax()){

    		$consultores_id = $request->consultores;

            $data = array();

            $start_date = Carbon::createFromDate($request->start_year, $request->start_month)->startOfMonth();;

            $end_date = Carbon::createFromDate($request->end_year, $request->end_month)->endOfMonth();

            $start_date_str = $start_date->year . '-' . $start_date->month . '-' . $start_date->day;

            $end_date_str = $end_date->year . '-' . $end_date->month . '-' . $end_date->day;


            if($start_date > $end_date){
                return response()->json([
                        'error' => "La fecha inicial no puede ser mayor a la fecha final."
                    ], 422);
            }


            for($i = 0; $i < count($consultores_id) ; $i++) {
                
                $consultor = CaoUsuario::where('co_usuario', $consultores_id[$i])->first();

                if($consultor){

                    $consultor->performances = CaoFatura::getPerformance($consultores_id[$i], $start_date_str, $end_date_str);

                    array_push($data, $consultor);

                }

            }


            if($request->type == 2){

            	$costo_fijo_promedio = CaoSalario::getCostoFijoPromedio($data);

            	return response()->json([
                    	'data' => $data,
                    	'costo_fijo_promedio' => $costo_fijo_promedio
                	], 200);

            }

            return response()->json([
                    'data' => $data,
                ], 200);

    	}

    	abort(401);

    }



    public function getTotalEarnings(PerformanceRequest $request){

    	if($request->ajax()){

    		$consultores_id = $request->consultores;

            $data = array();

            $start_date = Carbon::createFromDate($request->start_year, $request->start_month)->startOfMonth();;

            $end_date = Carbon::createFromDate($request->end_year, $request->end_month)->endOfMonth();

            $start_date_str = $start_date->year . '-' . $start_date->month . '-' . $start_date->day;

            $end_date_str = $end_date->year . '-' . $end_date->month . '-' . $end_date->day;


            if($start_date > $end_date){
                return response()->json([
                        'error' => "La fecha inicial no puede ser mayor a la fecha final."
                    ], 422);
            }


            $total_all_consultores_earnings = 0;

            for($i = 0; $i < count($consultores_id) ; $i++) {

                $consultor = CaoFatura::getWithTotalEarnings($consultores_id[$i], $start_date_str, $end_date_str);

                $total_all_consultores_earnings += $consultor->receita;

                array_push($data, $consultor);

            }


            foreach($data as $consultor){

                $consultor->porcentaje = ($consultor->receita * 100) / $total_all_consultores_earnings;

            }


            return response()->json([
                    'data' => $data
                ], 200);

    	}

    	abort(401);

    }

    
}
