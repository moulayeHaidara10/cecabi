<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'cecabi' );

/** Database username */
define( 'DB_USER', 'ucecabi' );

/** Database password */
define( 'DB_PASSWORD', 'Ong@2022' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'piiPcN_>Z>Wf)k HV4jNy7r?6.lh2^6E*=_<& <+*9ni.Ip-x/S uFRGN]14Sbrv' );
define( 'SECURE_AUTH_KEY',  '&;2>WK o7`[>nHb D`I>U(Zk2130k?yaQxp8c 0bOs.VI Ni7LcSNBA.k6=-;~po' );
define( 'LOGGED_IN_KEY',    'CoHS7;ycH;H5!x$3e:tU/v|DBI%6(TO>BHzD}qt4DG~HZBnDvn;qh-8:gR6lO=hq' );
define( 'NONCE_KEY',        'jw,im<iY-f|8jS&rigAWQH:ELDx.8MlykqU(G%d;v*&Z93O)kHpJfcBjvHM?G4;s' );
define( 'AUTH_SALT',        'Y_kM2>t-I_W%`Ho<9>HF`BE_er3OssM@7Bh( |BY=E*wuD)&#iXM!.kslE26Spq2' );
define( 'SECURE_AUTH_SALT', 'NaZQd=~3DfH# j^BaSU.*A7Apg9KIfox6~e%(05%mk/mWEJBLf9__mh9u:D  0W{' );
define( 'LOGGED_IN_SALT',   'Jr~o,:-e/jIV`^k}c}#~Y[egc%$9c;iE1 ~~>=8UI+!zW|-R;.V)i~[>ry2=b$r#' );
define( 'NONCE_SALT',       ')IIZ!vhcKPv)Oed1go4lB)/UK_ (T^9m(lFED1nW~Z0lW]?I+:o^U,(A79/YR~7_' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
