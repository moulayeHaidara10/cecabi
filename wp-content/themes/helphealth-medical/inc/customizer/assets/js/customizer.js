/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

// COLOR ALPHA -----------------------------
/**
 * Alpha Color Picker JS
 */
(function ($) {
    /**
     * Override the stock color.js toString() method to add support for
     * outputting RGBa or Hex.
     */
    Color.prototype.toString = function (flag) {

        // If our no-alpha flag has been passed in, output RGBa value with 100% opacity.
        // This is used to set the background color on the opacity slider during color changes.
        if ('no-alpha' == flag) {
            return this.toCSS('rgba', '1').replace(/\s+/g, '');
        }

        // If we have a proper opacity value, output RGBa.
        if (1 > this._alpha) {
            return this.toCSS('rgba', this._alpha).replace(/\s+/g, '');
        }

        // Proceed with stock color.js hex output.
        var hex = parseInt(this._color, 10).toString(16);
        if (this.error) {
            return '';
        }
        if (hex.length < 6) {
            for (var i = 6 - hex.length - 1; i >= 0; i--) {
                hex = '0' + hex;
            }
        }

        return '#' + hex;
    };

    /**
     * Given an RGBa, RGB, or hex color value, return the alpha channel value.
     */
    function acp_get_alpha_value_from_color(value) {
        var alphaVal;

        // Remove all spaces from the passed in value to help our RGBa regex.
        value = value.replace(/ /g, '');

        if (value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)) {
            alphaVal = parseFloat(value.match(/rgba\(\d+\,\d+\,\d+\,([^\)]+)\)/)[1]).toFixed(2) * 100;
            alphaVal = parseInt(alphaVal);
        } else {
            alphaVal = 100;
        }

        return alphaVal;
    }

    /**
     * Force update the alpha value of the color picker object and maybe the alpha slider.
     */
    function acp_update_alpha_value_on_color_input(alpha, $input, $alphaSlider, update_slider) {
        var iris, colorPicker, color;

        iris = $input.data('a8cIris');
        colorPicker = $input.data('wpWpColorPicker');

        // Set the alpha value on the Iris object.
        iris._color._alpha = alpha;

        // Store the new color value.
        color = iris._color.toString();

        // Set the value of the input.
        $input.val(color);
        $input.trigger('color_change');

        // Update the background color of the color picker.
        colorPicker.toggler.css({
            'background-color': color
        });

        // Maybe update the alpha slider itself.
        if (update_slider) {
            acp_update_alpha_value_on_alpha_slider(alpha, $alphaSlider);
        }

        // Update the color value of the color picker object.
        $input.wpColorPicker('color', color);
    }

    /**
     * Update the slider handle position and label.
     */
    function acp_update_alpha_value_on_alpha_slider(alpha, $alphaSlider) {
        $alphaSlider.slider('value', alpha);
        $alphaSlider.find('.ui-slider-handle').text(alpha.toString());
    }

    $.fn.alphaColorPicker = function () {

        return this.each(function () {

            // Scope the vars.
            var $input, startingColor, paletteInput, showOpacity, defaultColor, palette,
                colorPickerOptions, $container, $alphaSlider, alphaVal, sliderOptions;

            // Store the input.
            $input = $(this);

            // We must wrap the input now in order to get our a top level class
            // around the HTML added by wpColorPicker().
            $input.wrap('<div class="alpha-color-picker-wrap"></div>');

            // Get some data off the input.
            paletteInput = $input.attr('data-palette') || 'true';
            showOpacity = $input.attr('data-show-opacity') || 'true';
            defaultColor = $input.attr('data-default-color') || '';

            // Process the palette.
            if (paletteInput.indexOf('|') !== -1) {
                palette = paletteInput.split('|');
            } else if ('false' == paletteInput) {
                palette = false;
            } else {
                palette = true;
            }

            // Get a clean starting value for the option.
            startingColor = $input.val().replace(/\s+/g, '');
            //startingColor = $input.val().replace( '#', '' );
            //console.log( startingColor );

            // If we don't yet have a value, use the default color.
            if ('' == startingColor) {
                startingColor = defaultColor;
            }

            // Set up the options that we'll pass to wpColorPicker().
            colorPickerOptions = {
                change: function (event, ui) {
                    var key, value, alpha, $transparency;

                    key = $input.attr('data-customize-setting-link');
                    value = $input.wpColorPicker('color');

                    // Set the opacity value on the slider handle when the default color button is clicked.
                    if (defaultColor == value) {
                        alpha = acp_get_alpha_value_from_color(value);
                        $alphaSlider.find('.ui-slider-handle').text(alpha);
                    }

                    // If we're in the Customizer, send an ajax request to wp.customize
                    // to trigger the Save action.
                    if (typeof wp.customize != 'undefined') {
                        wp.customize(key, function (obj) {
                            obj.set(value);
                        });
                    }

                    $transparency = $container.find('.transparency');

                    // Always show the background color of the opacity slider at 100% opacity.
                    $transparency.css('background-color', ui.color.toString('no-alpha'));
                    $input.trigger('color_change');
                },
                clear: function () {
                    var key = $input.attr('data-customize-setting-link') || '';
                    if (key && key !== '') {
                        if (typeof wp.customize != 'undefined') {
                            wp.customize(key, function (obj) {
                                obj.set('');
                            });
                        }
                    }
                    $input.val('');
                    $input.trigger('color_change');
                },
                palettes: palette // Use the passed in palette.
            };

            // Create the colorpicker.
            $input.wpColorPicker(colorPickerOptions);

            $container = $input.parents('.wp-picker-container:first');

            // Insert our opacity slider.
            $('<div class="alpha-color-picker-container">' +
                '<div class="min-click-zone click-zone"></div>' +
                '<div class="max-click-zone click-zone"></div>' +
                '<div class="alpha-slider"></div>' +
                '<div class="transparency"></div>' +
                '</div>').appendTo($container.find('.wp-picker-holder'));

            $alphaSlider = $container.find('.alpha-slider');

            // If starting value is in format RGBa, grab the alpha channel.
            alphaVal = acp_get_alpha_value_from_color(startingColor);

            // Set up jQuery UI slider() options.
            sliderOptions = {
                create: function (event, ui) {
                    var value = $(this).slider('value');

                    // Set up initial values.
                    $(this).find('.ui-slider-handle').text(value);
                    $(this).siblings('.transparency ').css('background-color', startingColor);
                },
                value: alphaVal,
                range: 'max',
                step: 1,
                min: 0,
                max: 100,
                animate: 300
            };

            // Initialize jQuery UI slider with our options.
            $alphaSlider.slider(sliderOptions);

            // Maybe show the opacity on the handle.
            if ('true' == showOpacity) {
                $alphaSlider.find('.ui-slider-handle').addClass('show-opacity');
            }

            // Bind event handlers for the click zones.
            $container.find('.min-click-zone').on('click', function () {
                acp_update_alpha_value_on_color_input(0, $input, $alphaSlider, true);
            });
            $container.find('.max-click-zone').on('click', function () {
                acp_update_alpha_value_on_color_input(100, $input, $alphaSlider, true);
            });

            // Bind event handler for clicking on a palette color.
            $container.find('.iris-palette').on('click', function () {
                var color, alpha;

                color = $(this).css('background-color');
                alpha = acp_get_alpha_value_from_color(color);

                acp_update_alpha_value_on_alpha_slider(alpha, $alphaSlider);

                // Sometimes Iris doesn't set a perfect background-color on the palette,
                // for example rgba(20, 80, 100, 0.3) becomes rgba(20, 80, 100, 0.298039).
                // To compensante for this we round the opacity value on RGBa colors here
                // and save it a second time to the color picker object.
                if (alpha != 100) {
                    color = color.replace(/[^,]+(?=\))/, (alpha / 100).toFixed(2));
                }

                $input.wpColorPicker('color', color);
            });

            // Bind event handler for clicking on the 'Default' button.
            $container.find('.button.wp-picker-default').on('click', function () {
                var alpha = acp_get_alpha_value_from_color(defaultColor);

                acp_update_alpha_value_on_alpha_slider(alpha, $alphaSlider);
            });

            // Bind event handler for typing or pasting into the input.
            $input.on('input', function () {
                var value = $(this).val();
                var alpha = acp_get_alpha_value_from_color(value);

                acp_update_alpha_value_on_alpha_slider(alpha, $alphaSlider);
            });

            // Update all the things when the slider is interacted with.
            $alphaSlider.slider().on('slide', function (event, ui) {
                var alpha = parseFloat(ui.value) / 100.0;

                acp_update_alpha_value_on_color_input(alpha, $input, $alphaSlider, false);

                // Change value shown on slider handle.
                $(this).find('.ui-slider-handle').text(ui.value);
            });
        });
    }

}(jQuery));

// WP COLOR ALPHA customizer -----------------------------
(function (api, $) {
    api.controlConstructor['alpha-color'] = api.Control.extend({
        ready: function () {
            var control = this;
            $('.alpha-color-control', control.container).alphaColorPicker({
                clear: function (event, ui) {

                }
            });
        }

    });

})(wp.customize, jQuery);



// Footer Widget Layout
jQuery(document).ready(function ($) {
	
    //Scroll to front page section
    $('body').on('click', '#sub-accordion-panel-helphealth_medical_frontpage_options .control-subsection .accordion-section-title', function(event) {
        var section_id = $(this).parent('.control-subsection').attr('id');
        scrollToSection( section_id );
    }); 
	
});
	


function scrollToSection( section_id ){
    var preview_section_id = "slider-section";

    var $contents = jQuery('#customize-preview iframe').contents();

    switch ( section_id ) {
        
        case 'accordion-section-helphealth_medical_cta_options':
        preview_section_id = "cta-section";
        break;
        
        case 'accordion-section-helphealth_medical_service_options':
        preview_section_id = "services-section";
        break;
        
        case 'accordion-section-helphealth_medical_departments_options':
        preview_section_id = "department-section";
        break;

        case 'accordion-section-helphealth_medical_mission_options':
        preview_section_id = "mission-section";
        break;
        
        case 'accordion-section-helphealth_medical_features_options':
        preview_section_id = "features-section";
        break;

        case 'accordion-section-helphealth_medical_testimonial_options':
        preview_section_id = "testimonials-section";
        break;
		
        case 'accordion-section-helphealth_medical_recent_posts_options':
        preview_section_id = "recent-posts-section";
        break;
		
        case 'accordion-section-helphealth_medical_schedule_options':
        preview_section_id = "schedule";
        break;
		
        case 'accordion-section-helphealth_medical_map_options':
        preview_section_id = "map-section";
        break;
		
    }

    if( $contents.find('#'+preview_section_id).length > 0 && $contents.find('.home').length > 0 ){
        $contents.find("html, body").animate({
			scrollTop: $contents.find( "#" + preview_section_id ).offset().top
        }, 1000);
    }
}


