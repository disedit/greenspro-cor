<?php

function events()
{
  $page = $_GET['page'] ?? 1;
  $perPage = $_GET['per_page'] ?? 10;

  if ($page === 1) {
    $upcomingEvents = get_posts([
      'post_type' => 'event',
      'numberposts' => -1,
      'orderby' => 'meta_value',
      'order' => 'ASC',
      'meta_key' => 'date_and_time',
      'meta_query' => [
        [
          'key' => 'date_and_time',
          'value' => date('Y-m-d'),
          'compare' => '>=',
          'type' => 'DATE'
        ]
      ]
    ]);
  } else {
    $upcomingEvents = null;
  }

  $pastEvents = get_posts([
    'post_type' => 'event',
    'posts_per_page' => $perPage,
    'paged' => $page,
    'orderby' => 'meta_value',
    'order' => 'DESC',
    'meta_key' => 'date_and_time',
    'meta_query' => [
      [
        'key' => 'date_and_time',
        'value' => date('Y-m-d'),
        'compare' => '<',
        'type' => 'DATE'
      ]
    ]
  ]);

  return [
    'upcoming' => eventsWithFields($upcomingEvents),
    'past' => eventsWithFields($pastEvents),
    'page' => intval($page),
    'per_page' => intval($perPage),
  ];
}

function eventsWithFields($events)
{
  $eventsWithFields = [];
  foreach ($events as $event) {
    $thumbnail_id = get_post_thumbnail_id($event->ID);
    $alt = ($thumbnail_id) ? get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true) : null;

    $eventsWithFields[] = [
      'id' => $event->ID,
      'title' => $event->post_title,
      'slug' => $event->post_name,
      'thumbnail' => ($thumbnail_id) ? [
        'url' => get_the_post_thumbnail_url($event->ID, 'full'),
        'alt' => $alt
      ] : false,
      'fields' => get_fields($event->ID) ?: null,
    ];
  }
  return $eventsWithFields;
}

function event()
{
  $slug = $_GET['slug'];
  $args = [
    'name'           => $slug,
    'post_type'      => 'event',
    'post_status'    => 'publish',
    'posts_per_page' => 1
  ];
  $events = get_posts($args);

  if (!$events) {
    return null;
  }

  $event = $events[0];

  $thumbnail_id = get_post_thumbnail_id($event->ID);
  $alt = ($thumbnail_id) ? get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true) : null;

  return [
    'id' => $event->ID,
    'title' => $event->post_title,
    'slug' => $event->post_name,
    'date' => get_field('date', $event->ID),
    'content' => apply_filters('the_content', $event->post_content),
    'thumbnail' => ($thumbnail_id) ? [
      'url' => get_the_post_thumbnail_url($event->ID, 'large'),
      'full' => get_the_post_thumbnail_url($event->ID, 'full'),
      'alt' => $alt
    ] : false,
    'fields' => get_fields($event->ID) ?: null,
  ];
}
