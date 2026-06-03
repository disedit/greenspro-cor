<?php

function news() {
  $posts = [];
  $categories = $_GET['categories'];
  $categories = (!empty($categories)) ? explode(',', $categories) : null;
  $tags = $_GET['tags'];
  $tags = (!empty($tags)) ? explode(',', $tags) : null;
  $commissions = $_GET['commissions'];
  $commissions = (!empty($commissions)) ? explode(',', $commissions) : null;
  $page = $_GET['page'] ?? 1;
  $perPage = $_GET['per_page'] ?? 10;
  $searchTerm = $_GET['search'] ?? false;
  $brief = $_GET['brief'] ?? false;

  $args = [
    'post_type' => 'post',
    'posts_per_page' => $perPage,
    'category__in' => $categories,
    'tag__in' => $tags,
    'paged' => $page,
    'ignore_sticky_posts' => false
  ];

  if ($searchTerm) {
    $args['s'] = $searchTerm;
  }

  if ($commissions) {
    $args['tax_query'] = [
      [
        'taxonomy' => 'commission',
        'field' => 'term_id', 
        'terms' => $commissions,
        'include_children' => false
      ]
    ];
  }

  $news = get_posts($args);

  foreach($news as $post) {
    $postCategories = get_the_category($post);
    $categoryList = [];
    if (!empty($postCategories)) {
      foreach($postCategories as $categoryId) {
        $category = get_category($categoryId);
        if ($category) {
          $categoryList[] = [
            'id' => $category->term_id,
            'name' => $category->name,
            'slug' => $category->slug,
            'bg_color' => get_field('bg_color', $category->taxonomy . '_' . $category->term_id),
            'text_color' => get_field('text_color', $category->taxonomy . '_' . $category->term_id)
          ];
        }
      }
    }

    $postTags = get_the_tags($post);
    $tagList = [];
    if (!empty($postTags)) {
      foreach($postTags as $tagId) {
        $tag = get_term($tagId);
        if ($tag) {
          $tagList[] = [
            'id' => $tag->term_id,
            'name' => $tag->name,
            'slug' => $tag->slug
          ];
        }
      }
    }

    $thumbnail_id = get_post_thumbnail_id($post->ID);
    $alt = ($thumbnail_id) ? get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true) : null;

    $posts[] = [
      'id' => $post->ID,
      'title' => $post->post_title,
      'slug' => $post->post_name,
      'date' => $post->post_date,
      'excerpt' => get_the_excerpt($post),
      'thumbnail' => ($thumbnail_id) ? [
        'url' => get_the_post_thumbnail_url($post->ID, 'medium_large'),
        'full' => get_the_post_thumbnail_url($post->ID, 'full'),
        'alt' => $alt
      ] : null,
      'categories' => (count($categoryList) > 0) ? $categoryList : null,
      'tags' => (count($tagList) > 0) ? $tagList : null,
    ];
  }

  $categoryList = [];
  if (!empty($categories)) {
    foreach($categories as $categoryId) {
      $category = get_category($categoryId);
      if ($category) {
        $categoryList[] = [
          'id' => $category->term_id,
          'name' => $category->name,
          'slug' => $category->slug,
        ];
      }
    }
  }

  $tagList = [];
  if (!empty($tags)) {
    foreach($tags as $tagId) {
      $tag = get_term($tagId);
      if ($tag) {
        $tagList[] = [
          'id' => $tag->term_id,
          'name' => $tag->name,
          'slug' => $tag->slug,
        ];
      }
    }
  }

  $commissionList = [];
  if (!empty($commissions)) {
    foreach($commissions as $commissionId) {
      $commission = get_term($commissionId);
      if ($commission) {
        $commissionList[] = [
          'id' => $commission->term_id,
          'name' => $commission->name,
          'slug' => $commission->slug,
        ];
      }
    }
  }

  $allTax = null;
  if (!$brief) {
    $allTax = [
      'categories' => array_map(fn ($term) => ([
        'id' => $term->term_id,
        'slug' => $term->slug,
        'name' => $term->name,
        'count' => $term->count,
        'bg_color' => get_field('bg_color', $term->taxonomy . '_' . $term->term_id),
        'text_color' => get_field('text_color', $term->taxonomy . '_' . $term->term_id)
      ]), get_categories()),
      'tags' => array_map(fn ($term) => ([
        'id' => $term->term_id,
        'slug' => $term->slug,
        'name' => $term->name,
        'count' => $term->count
      ]), get_terms([
        'taxonomy' => 'post_tag',
        'hide_empty' => true,
        'number' => 50,
        'orderby' => 'count',
        'order' => 'DESC'
      ])),
      'commissions' => array_map(fn ($term) => ([
        'id' => $term->term_id,
        'slug' => $term->slug,
        'name' => $term->name,
        'count' => $term->count
      ]), get_terms([
        'taxonomy' => 'commission',
        'hide_empty' => false
      ])),
    ];
  }

  return [
    'page' => intval($page),
    'per_page' => intval($perPage),
    'posts' => $posts,
    'tags' => $tagList,
    'categories' => $categoryList,
    'commissions' => $commissionList,
    'all' => $allTax
  ];
}

function post() {
  $slug = $_GET['slug'];
  $args = [
    'name'           => $slug,
    'post_type'      => 'post',
    'post_status'    => 'publish',
    'posts_per_page' => 1
  ];
  $posts = get_posts($args);

  if (!$posts) {
    return null;
  }

  $post = $posts[0];

  $categories = get_the_category($post);
  $tags = get_the_tags($post);
  $commissions = get_the_terms($post, 'commission');

  $categoryList = [];
  if (!empty($categories)) {
    foreach($categories as $categoryId) {
      $category = get_category($categoryId);
      if ($category) {
        $categoryList[] = [
          'id' => $category->term_id,
          'name' => $category->name,
          'slug' => $category->slug,
          'bg_color' => get_field('bg_color', $category->taxonomy . '_' . $category->term_id),
          'text_color' => get_field('text_color', $category->taxonomy . '_' . $category->term_id)
        ];
      }
    }
  }

  $tagList = [];
  if (!empty($tags)) {
    foreach($tags as $tagId) {
      $tag = get_term($tagId);
      if ($tag) {
        $tagList[] = [
          'id' => $tag->term_id,
          'name' => $tag->name,
          'slug' => $tag->slug
        ];
      }
    }
  }

  $commissionList = [];
  if (!empty($commissions)) {
    foreach($commissions as $commissionId) {
      $commission = get_term($commissionId);
      if ($commission) {
        $commissionList[] = [
          'id' => $commission->term_id,
          'name' => $commission->name,
          'slug' => $commission->slug
        ];
      }
    }
  }

  $thumbnail_id = get_post_thumbnail_id($post->ID);
  $alt = ($thumbnail_id) ? get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true) : null;
  $caption = ($thumbnail_id) ? wp_get_attachment_caption($thumbnail_id) : null;

  return [
    'id' => $post->ID,
    'title' => $post->post_title,
    'slug' => $post->post_name,
    'date' => $post->post_date,
    'content' => apply_filters('the_content', $post->post_content),
    'excerpt' => get_the_excerpt($post),
    'thumbnail' => ($thumbnail_id) ? [
      'url' => get_the_post_thumbnail_url($post->ID, '2048x2048'),
      'full' => get_the_post_thumbnail_url($post->ID, 'full'),
      'alt' => $alt,
      'caption' => $caption
    ] : false,
    'categories' => (count($categoryList) > 0) ? $categoryList : null,
    'tags' => (count($tagList) > 0) ? $tagList : null,
    'commissions' => (count($commissionList) > 0) ? $commissionList : null,
    'fields' => get_fields($post->ID) ?: null,
  ];
}
