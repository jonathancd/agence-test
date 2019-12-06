<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
	
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <link href="{{ asset('css/styles.css') }}" rel="stylesheet">
	
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

	<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>

</head>
<body>

	<div id="app">
		@include('layouts._partials.navbar')
	
		@yield('content')

	</div>

	
</body>
</html>