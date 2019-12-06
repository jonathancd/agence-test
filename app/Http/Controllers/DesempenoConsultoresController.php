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

    public function relatorio(Request $request){

    	if($request->ajax()){

    		$consultores = $request->consultores;
	    	$from_month = $request->from_month;
	    	$from_year = $request->from_year;
	    	$to_month = $request->to_month;
	    	$hasta_y = $request->hasta_y;

            $relatorio = CaoFatura::getRelatorio($request);

    		return response()->json([ "relatorio" => $relatorio], 200);

    	}

    	abort(401);

    }

}
