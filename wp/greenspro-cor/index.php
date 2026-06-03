<?php
$request = $_SERVER['REQUEST_URI'];

if (str_starts_with($request, '/news/event/')) {
    $request = str_replace('/news/event/', '/events/', $request);
}

if (str_starts_with($request, '/news/profile/')) {
    $request = '/who-we-are/our-members/';
}

header("Location: https://greenspro-cor.eu" . $request, true, 301);