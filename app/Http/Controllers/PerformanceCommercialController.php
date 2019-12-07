<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RelatorioRequest;
use App\CaoUsuario;
use App\CaoFatura;
use App\PermissaoSistema;
use Carbon\Carbon;

class PerformanceCommercialController extends Controller
{

	public function index(){

    	$consultores = CaoUsuario::join('permissao_sistema', 'permissao_sistema.co_usuario', '=', 'cao_usuario.co_usuario')
                        ->where([
						    ['permissao_sistema.co_sistema', '=', 1],
						    ['permissao_sistema.in_ativo', '=', 'S'],
						])
                        ->whereIn('permissao_sistema.co_tipo_usuario', [0, 1, 2])
                        ->orderBy('cao_usuario.no_usuario','asc')
                        ->get();

        return view('welcome', compact('consultores'));

    }

    
    public function relatorio(RelatorioRequest $request){

    	if($request->ajax()){

    		$consultores = $request->consultores;
            $start_month = $request->start_month;
            $start_year = $request->start_year;
            $end_month = $request->end_month;
            $end_year = $request->end_year;

            $relatorios = array();

            $start_date = Carbon::createFromDate($start_year, $start_month)->startOfMonth();;

            $end_date = Carbon::createFromDate($end_year, $end_month)->endOfMonth();

            $start_date_str = $start_date->year . '-' . $start_date->month . '-' . $start_date->day;

            $end_date_str = $end_date->year . '-' . $end_date->month . '-' . $end_date->day;


            if($start_date > $end_date){
                return response()->json([
                        'error' => "La fecha inicial no puede ser mayor a la fecha final."
                    ], 422);
            }


            for($i = 0; $i < count($consultores) ; $i++) {
                
                $consultor = CaoUsuario::where('co_usuario', $consultores[$i])->first();

                if($consultor){

                    $consultor->relatorios = CaoFatura::getRelatorio($consultores[$i], $start_date_str, $end_date_str);

                    array_push($relatorios, $consultor);

                }

            }

            return response()->json([
                    'relatorios' => $relatorios,
                    'consultores' => $consultores,
                    'star' => $start_date_str,
                    'end' => $end_date_str
                ], 200);

    	}

    	abort(401);

    }
}
