<?php

function profiles()
{
  $orderedProfiles = [];
  $ids = $_GET['ids'];
  $brief = $_GET['brief'] ?? false;
  $ids = explode(',', $ids);
  $populate = $_GET['populate'];
  $populate = explode(',', $populate);
  $order_by = $_GET['order_by'] ?? 'menu_order';
  $args = (isset($_GET['populate'])) ? [
    'tax_query' => [
      [
        'taxonomy' => 'profile-category',
        'field' => 'term_id',
        'terms' => $populate,
        'include_children' => false
      ]
    ],
    'post_type' => 'profile',
    'orderby' => $order_by,
    'order' => 'ASC',
    'numberposts' => -1,
  ] : [
    'post__in' => $ids,
    'post_type' => 'profile',
    'numberposts' => -1,
    'orderby' => 'post__in'
  ];
  if ($order_by === 'country') {
    $args['meta_key'] = 'country';
    $args['orderby'] = 'meta_key';
  }
  if ($order_by === 'profiles_order') {
    $args['meta_query'] = [
      'profile_order_clause' => [
        'key'  => 'profile_order',
        'type' => 'NUMERIC',
      ],
      'type_clause' => [
        'key' => 'type',
      ],
    ];

    $args['orderby'] = [
      'profile_order_clause' => 'ASC',
      'type_clause'          => 'DESC',
      'title'                => 'ASC',
    ];
  }

  $profiles = get_posts($args);
  if (isset($_GET['populate'])) {
    $ids = $profiles;
  }

  foreach ($ids as $id) {
    if (isset($_GET['populate'])) {
      $thisProfile = [$id];
    } else {
      $thisProfile = array_filter($profiles, function ($profile) use ($id) {
        return $profile->ID == $id;
      });
      $thisProfile = array_values($thisProfile);
    }

    if (empty($thisProfile)) {
      continue;
    }

    $fields = get_fields($id);
    $memberParty = (!empty($fields['member_party'])) ? get_fields($fields['member_party'][0]->ID) : null;
    $commissions = null;

    if (!$brief) {
      $terms = get_the_terms($thisProfile[0]->ID, 'commission');
      $commissions = [];
      foreach ($terms as $term) {
        $commissions[] = [
          'id' => $term->term_id,
          'name' => $term->name,
          'slug' => $term->slug
        ];
      }
    }

    $orderedProfiles[] = [
      'id' => $thisProfile[0]->ID,
      'slug' => $thisProfile[0]->post_name,
      'type' => $fields['type'],
      'name' => $thisProfile[0]->post_title,
      'photo' => $fields['photo']['sizes']['medium'] ?? $fields['photo']['url'],
      'picture' => $fields['photo'],
      'description' => $fields['description'],
      'country' => $fields['country'],
      'socials' => (!$brief) ? $fields['socials'] : null,
      'summary' => (!$brief) ? $fields['summary'] : null,
      'email' => (!$brief) ? $fields['email'] : null,
      'phone' => (!$brief) ? $fields['phone'] : null,
      'commissions' => $commissions
    ];
  }

  return $orderedProfiles;
}
