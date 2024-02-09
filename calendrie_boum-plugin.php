<?php
/*
Plugin Name: Calendrie boum
Description: Plugin pour intégrer votre calendrier.
Version: 1.0
Author: ISCRA Radu et Yanis ZAGHLI
*/

// Enqueue scripts and styles
function enqueue_plugin_assets() {
    wp_enqueue_style('calendrier-boum-style', plugins_url('style.css', __FILE__));
    wp_enqueue_script('calendrier-boum-script', plugins_url('script.js', __FILE__), array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_plugin_assets');

// Include widget file
include_once(plugin_dir_path(__FILE__) . 'widget.php');

?>