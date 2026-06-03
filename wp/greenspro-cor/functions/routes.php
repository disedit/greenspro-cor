<?php

add_action("rest_api_init", function () {
  register_rest_route("greenspro-cor", "/settings", ["methods" => "GET", "callback" => "options"]);
  register_rest_route("greenspro-cor", "/news", ["methods" => "GET", "callback" => "news"]);
  register_rest_route("greenspro-cor", "/post", ["methods" => "GET", "callback" => "post"]);
  register_rest_route("greenspro-cor", "/profiles", ["methods" => "GET", "callback" => "profiles"]);
  register_rest_route("greenspro-cor", "/events", ["methods" => "GET", "callback" => "events"]);
  register_rest_route("greenspro-cor", "/event", ["methods" => "GET", "callback" => "event"]);
  register_rest_route("greenspro-cor", "/page", ["methods" => "GET", "callback" => "page"]);
});
