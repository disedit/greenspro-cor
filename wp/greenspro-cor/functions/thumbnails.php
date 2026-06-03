<?php

add_action('after_setup_theme', 'my_theme_setup');

function my_theme_setup()
{
  add_theme_support('post-thumbnails');
  set_post_thumbnail_size(750, 750, true);
  add_filter('excerpt_more', function () {
    return '&hellip;';
  });
}
