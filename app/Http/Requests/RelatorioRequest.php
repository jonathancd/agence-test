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
                'start_month' => 'required|numeric|min:1|max:12',
                'start_year' => 'required|numeric|min:2003|max:2007',
                'end_month' => 'required|numeric|min:1|max:12',
                'end_year' => 'required|numeric|min:2003|max:2007',
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
            'start_month.required' => 'Debe seleccionar un mes de inicio de periodo',
            'start_month.min' => 'Seleccione un mes de inicio valido',
            'start_month.max' => 'Seleccione un mes de inicio valido',
            'start_month.numeric' => 'El mes de inicio debe ser numerico',

            'start_year.required' => 'Debe seleccionar un año de inicio de periodo',
            'start_year.min' => 'El año de inicio no puede ser menor a :min',
            'start_year.max' => 'El año de inicio no puede ser mayor a :max',
            'start_year.numeric' => 'El año de inicio debe ser numerico',

            'end_month.required' => 'Debe seleccionar un mes de fin de periodo',
            'end_month.min' => 'Seleccione un mes de fin valido',
            'end_month.max' => 'Seleccione un mes de fin valido',
            'end_month.numeric' => 'El mes de fin debe ser numerico',

            'end_year.required' => 'Debe seleccionar un año de fin de periodo',
            'end_year.min' => 'El año de fin no puede ser menor a :min',
            'end_year.max' => 'El año de fin no puede ser mayor a :max',
            'end_year.numeric' => 'El año de fin debe ser numerico',
        ];
    }
}
