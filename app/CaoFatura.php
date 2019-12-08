<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class CaoFatura extends Model
{
    protected $table = 'cao_fatura';



    public static function getPerformance($co_usuario, $start_date, $end_date){

	    return DB::table('cao_fatura')
	            ->select(DB::raw(' US.no_usuario, SUM(cao_fatura.valor - cao_fatura.total_imp_inc/100) as receita, S.brut_salario as costo_fijo, SUM((cao_fatura.valor - (cao_fatura.valor * (cao_fatura.total_imp_inc/100))) * (cao_fatura.comissao_cn / 100)) AS comision, MONTH(cao_fatura.data_emissao) as periodo_mes, YEAR(cao_fatura.data_emissao) AS periodo_anio, cao_fatura.data_emissao'))
	            ->join('cao_os as OS', 'OS.co_os', '=','cao_fatura.co_os')
	            ->join('cao_usuario as US', 'US.co_usuario', '=','OS.co_usuario')
	            ->join('cao_salario as S','S.co_usuario','=','US.co_usuario')
	            ->where('US.co_usuario','=', $co_usuario)
	            ->whereBetween("cao_fatura.data_emissao",[$start_date, $end_date])
	            ->groupBy('periodo_mes')
	            ->groupBy('periodo_anio')
	            ->get();

	}





	// public static function getPerformance($co_usuario, $start_date, $end_date){

	//     return DB::table('cao_usuario')
	//             ->select(DB::raw(' cao_usuario.no_usuario, SUM(CF.valor - CF.total_imp_inc/100) as receita, S.brut_salario as costo_fijo, SUM((CF.valor - (CF.valor * (CF.total_imp_inc/100))) * (CF.comissao_cn / 100)) AS comision, MONTH(CF.data_emissao) as periodo_mes, YEAR(CF.data_emissao) AS periodo_anio, CF.data_emissao'))

	//             ->join('cao_os', 'cao_os.co_usuario', '=','cao_usuario.co_usuario')
	//     		->join('cao_fatura as CF', 'CF.co_os', '=','cao_os.co_os')
	//     		->leftjoin('cao_salario as S','S.co_usuario','=','cao_usuario.co_usuario')

	//             // ->join('cao_os as OS', 'OS.co_os', '=','cao_fatura.co_os')
	//             // ->join('cao_usuario as cao_usuario', 'cao_usuario.co_usuario', '=','OS.co_usuario')
	//             // ->join('cao_salario as S','S.co_usuario','=','cao_usuario.co_usuario')

	//             ->where('cao_usuario.co_usuario','=', $co_usuario)
	//             ->whereBetween("CF.data_emissao",[$start_date, $end_date])
	//             ->groupBy('periodo_mes')
	//             ->groupBy('periodo_anio')
	//             ->get();

	// }






	public static function getWithTotalEarnings($co_usuario, $start_date, $end_date){

		return DB::table('cao_usuario')
					->select(DB::raw(' cao_usuario.no_usuario, SUM(CF.valor - CF.total_imp_inc/100) as receita, CF.data_emissao'))
	    			->join('cao_os', 'cao_os.co_usuario', '=','cao_usuario.co_usuario')
	    			->join('cao_fatura as CF', 'CF.co_os', '=','cao_os.co_os')
	    			->where('cao_usuario.co_usuario','=', $co_usuario)
		            ->first();

	}

}
