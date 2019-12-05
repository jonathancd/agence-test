<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RelatorioRequest;
use App\CaoUsuario;
use App\CaoFatura;
use App\PermissaoSistema;
use Carbon\Carbon;

class DesempenoConsultoresController extends Controller
{
    public function index(){

    	// $consultores = CaoUsuario::join('permissao_sistema', 'permissao_sistema.co_usuario', '=', 'cao_usuario.co_usuario')
     //                    ->where([
					// 	    ['permissao_sistema.co_sistema', '=', 1],
					// 	    ['permissao_sistema.in_ativo', '=', 'S'],
					// 	])
     //                    ->whereIn('permissao_sistema.co_tipo_usuario', [0, 1, 2])
     //                    ->orderBy('cao_usuario.no_usuario','asc')
     //                    ->get();

     //    return response()->json([
     //    		'consultores' => $consultores
     //    	], 200);

        return view('welcome');
    }

    public function relatorio(RelatorioRequest $request){

    	return $request->all();

    	if($request->ajax()){

    		$consultores = $request->consultores;
	    	$desde_m = $request->desde_m;
	    	$desde_y = $request->desde_y;
	    	$hasta_m = $request->hasta_m;
	    	$hasta_y = $request->hasta_y;

    		return response()->json(200);
    	}

    	abort(401);
    }


    public function getReceitaLiquida(){

    }
}
