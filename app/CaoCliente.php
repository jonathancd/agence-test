<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CaoCliente extends Model
{
    protected $table = 'cao_cliente';


    

 //    SELECT x.receita, x.costo_fijo, x.comision, SUM(x.receita - (x.costo_fijo + x.comision)) as lucro, x.periodo_mes, x.periodo_anio, x.data_emissao
	// FROM(



	// SELECT SUM(cao_fatura.valor - cao_fatura.total_imp_inc) as receita, cao_salario.brut_salario as costo_fijo, SUM((cao_fatura.valor - (cao_fatura.valor * (cao_fatura.total_imp_inc/100))) * (cao_fatura.comissao_cn / 100)) AS comision, MONTH(cao_fatura.data_emissao) as periodo_mes, YEAR(cao_fatura.data_emissao) AS periodo_anio, cao_fatura.data_emissao
	// FROM `cao_fatura`
	// JOIN cao_os
	// ON cao_fatura.co_os = cao_os.co_os
	// JOIN cao_salario
	// ON cao_salario.co_usuario = cao_os.co_usuario


	// WHERE cao_os.co_usuario = 'carlos.arruda'
	// GROUP BY MONTH(cao_fatura.data_emissao), YEAR(cao_fatura.data_emissao)
	// ) as X
	// GROUP BY MONTH(x.data_emissao), YEAR(x.data_emissao)
}
