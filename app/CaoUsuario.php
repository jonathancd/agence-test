<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class CaoUsuario extends Model
{
    protected $table = 'cao_usuario';

    protected $with = ["salario"];

    public function salario(){
        return $this->hasOne('App\CaoSalario', 'co_usuario', 'co_usuario');
    }


    public static function getAll(){

    	$usuarios = CaoUsuario::join('permissao_sistema', 'permissao_sistema.co_usuario', '=', 'cao_usuario.co_usuario')
                        ->where([
						    ['permissao_sistema.co_sistema', '=', 1],
						    ['permissao_sistema.in_ativo', '=', 'S'],
						])
                        ->whereIn('permissao_sistema.co_tipo_usuario', [0, 1, 2])
                        ->orderBy('cao_usuario.no_usuario','asc')
                        ->get();

        return $usuarios;

    }
	
}
