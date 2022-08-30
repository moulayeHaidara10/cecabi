<?php
/**
 * Child Theme functions and definitions.
 * This theme is a child theme for Deneb.
 *
 * @subpackage Hosptial Service
 * @author  wptexture https://testerwp.com/
 * @license http://www.gnu.org/licenses/gpl-3.0.html GNU Public License
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 */

/**
 * Theme functions and definitions.
 */
 
add_action( 'wp_enqueue_scripts', 'hosptial_service_child_css',25);
function hosptial_service_child_css() {
	wp_enqueue_style( 'hospital-service-parent-theme-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'hospital-service-child-style',get_stylesheet_directory_uri() . '/child-css/child.css');
	wp_enqueue_script( 'hospital-service-custom-script', get_stylesheet_directory_uri() . '/child-js/custom-script.js');
	wp_enqueue_style( 'hospital-service-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&family=Nunito+Sans:wght@200;300;400;600;700;800;900&display=swap' ); 
} 

function hospital_service_customize_register() {
		global $wp_customize;
		$wp_customize->remove_section( 'colors' );
}
add_action( 'customize_register', 'hospital_service_customize_register', 11 ); 