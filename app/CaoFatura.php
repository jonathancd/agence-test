<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class CaoFatura extends Model
{
    protected $table = 'cao_fatura';

    public static function getRelatorio($co_usuario, $start_date, $end_date){

	    return DB::table('cao_fatura')
	            ->select(DB::raw(' US.no_usuario, SUM(cao_fatura.valor - cao_fatura.total_imp_inc) as receita, S.brut_salario as costo_fijo, SUM((cao_fatura.valor - (cao_fatura.valor * (cao_fatura.total_imp_inc/100))) * (cao_fatura.comissao_cn / 100)) AS comision, MONTH(cao_fatura.data_emissao) as periodo_mes, YEAR(cao_fatura.data_emissao) AS periodo_anio, cao_fatura.data_emissao'))
	            ->join('cao_os as OS', 'OS.co_os', '=','cao_fatura.co_os')
	            ->join('cao_usuario as US', 'US.co_usuario', '=','OS.co_usuario')
	            ->join('cao_salario as S','S.co_usuario','=','US.co_usuario')
	            ->where('US.co_usuario','=', $co_usuario)
	            ->whereBetween("cao_fatura.data_emissao",[$start_date, $end_date])
	            ->groupBy('periodo_mes')
	            ->groupBy('periodo_anio')
	            ->get();
	}

}
