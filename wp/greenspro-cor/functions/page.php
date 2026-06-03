<?php

function page()
{
  $path = $_GET['path'];
  $page = get_page_by_path($path);

  if (!$page || $page->post_status !== 'publish') {
    return null;
  }

  $ancestors = get_post_ancestors($page->ID);
  $topAncestor = (count($ancestors) > 0) ? $ancestors[count($ancestors) - 1] : $page->ID;
  $menu = ($page->post_parent) ? get_pages([
    'child_of' => $topAncestor,
    'sort_column' => 'menu_order',
    'sort_order' => 'ASC'
  ]) : get_pages([
    'child_of' => $page->ID,
    'sort_column' => 'menu_order',
    'sort_order' => 'ASC'
  ]);
  $breadcrumbs = array_reverse($ancestors);
  $breadcrumbs = array_map(function ($id) {
    $page = get_post($id);
    return [
      'id' => $page->ID,
      'title' => $page->post_title,
      'url' => get_permalink($page->ID),
    ];
  }, $breadcrumbs);

  return [
    'id' => $page->ID,
    'title' => html_entity_decode($page->post_title),
    'slug' => $page->post_name,
    'content' => apply_filters('the_content', $page->post_content),
    'fields' => get_fields($page->ID) ?: null,
    'menu' => pageMenu($menu, $topAncestor),
    'breadcrumbs' => $breadcrumbs,
  ];
}

function pageMenu($pages, $topAncestor)
{
  $menu = [];
  $children = array_filter($pages, function ($page) use ($topAncestor) {
    return $page->post_parent == $topAncestor;
  });
  foreach ($children as $child) {
    $menu[] = [
      'id' => $child->ID,
      'title' => $child->post_title,
      'url' => get_permalink($child->ID),
      'children' => pageMenu($pages, $child->ID)
    ];
  }
  return $menu;
}
