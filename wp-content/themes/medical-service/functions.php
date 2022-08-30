<?php
/**
 * Child Theme functions and definitions.
 * This theme is a child theme for Deneb.
 *
 * @subpackage Medical Service
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
 
add_action( 'wp_enqueue_scripts', 'medical_service_child_css',25);
function medical_service_child_css() {
	wp_enqueue_style( 'medical-service-parent-theme-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'medical-service-child-style',get_stylesheet_directory_uri() . '/child-css/child.css');
	wp_enqueue_script( 'medical-service-custom-script', get_stylesheet_directory_uri() . '/child-js/custom-script.js');
	wp_enqueue_style( 'medical-service-google-fonts', 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap' ); 
} 

function medical_service_customize_register() {
		global $wp_customize;
		$wp_customize->remove_section( 'colors' );
}
add_action( 'customize_register', 'medical_service_customize_register', 11 ); 