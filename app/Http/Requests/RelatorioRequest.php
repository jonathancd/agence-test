<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RelatorioRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
                'desde_m' => 'required|numeric|min:1|max:12',
                'desde_y' => 'required|numeric|min:2003|max:2007',
                'hasta_m' => 'required|numeric|min:1|max:12',
                'hasta_y' => 'required|numeric|min:2003|max:2007',
            ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'desde_m.required' => 'Debe seleccionar un mes de inicio de periodo',
            'desde_m.min' => 'Seleccione un mes de inicio valido',
            'desde_m.max' => 'Seleccione un mes de inicio valido',
            'desde_m.numeric' => 'El mes de inicio debe ser numerico',

            'desde_y.required' => 'Debe seleccionar un año de inicio de periodo',
            'desde_y.min' => 'El año de inicio no puede ser menor a :min',
            'desde_y.max' => 'El año de inicio no puede ser mayor a :max',
            'desde_y.numeric' => 'El año de inicio debe ser numerico',

            'hasta_m.required' => 'Debe seleccionar un mes de fin de periodo',
            'hasta_m.min' => 'Seleccione un mes de fin valido',
            'hasta_m.max' => 'Seleccione un mes de fin valido',
            'hasta_m.numeric' => 'El mes de fin debe ser numerico',

            'hasta_y.required' => 'Debe seleccionar un año de fin de periodo',
            'hasta_y.min' => 'El año de fin no puede ser menor a :min',
            'hasta_y.max' => 'El año de fin no puede ser mayor a :max',
            'hasta_y.numeric' => 'El año de fin debe ser numerico',
        ];
    }
}
