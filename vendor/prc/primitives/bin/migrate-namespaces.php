#!/usr/bin/env php
<?php
/**
 * Rewrite references to the pre-2.0 prc/primitives namespaces.
 *
 * Handles single and doubled backslashes, so PHP code, PHP strings, JSON, and
 * Markdown all convert. Running it twice changes nothing.
 *
 * Usage:
 *   php bin/migrate-namespaces.php [--check] [--skip=<path substring>]... <path>...
 *
 * --check lists every remaining old reference and exits 1 if any exist.
 *
 * @package PRC\Primitives
 */

// phpcs:disable WordPress.WP.AlternativeFunctions, WordPress.Security.EscapeOutput.OutputNotEscaped

const SKIP_DIRS       = array( '.git', 'vendor', 'node_modules', 'build' );
const SKIP_FILES      = array( 'composer.lock', 'package-lock.json', 'CHANGELOG.md' );
const TEXT_EXTENSIONS = array( 'php', 'inc', 'json', 'md', 'txt', 'xml', 'dist', 'js', 'jsx', 'ts', 'tsx', 'mjs', 'yml', 'yaml' );

/**
 * Old module segment after `PRC\` mapped to its segments after `PRC\`.
 *
 * Order matters. The URL_Helper namespace prefix (test namespaces) converts
 * before the bare URL_Helper class name.
 *
 * @return array<int, array{0: string, 1: string, 2: string[]}> Pattern suffix, replacement segments.
 */
function migrate_namespace_rules() {
	return array(
		array( 'URL_Helper', '(?=\\\\)', array( 'Primitives', 'URL_Helper' ) ),
		array( 'URL_Helper', '(?![\\w\\\\])', array( 'Primitives', 'URL_Helper', 'URL_Helper' ) ),
		array( 'BlockUtils', '(?!\\w)', array( 'Primitives', 'BlockUtils' ) ),
		array( 'Html', '(?!\\w)', array( 'Primitives', 'HTML_Processors' ) ),
		array( 'DelayedAction', '(?!\\w)', array( 'Primitives', 'DelayedAction' ) ),
		array( 'TDS', '(?!\\w)', array( 'Primitives', 'TDS' ) ),
	);
}

/**
 * Rewrite one file's contents.
 *
 * @param string $contents File contents.
 * @return string
 */
function migrate_namespaces_in( $contents ) {
	$contents = preg_replace(
		'/(@package\s+)PRC\\\\URL_Helper(?![\w\\\\])/',
		'$1PRC\\\\Primitives\\\\URL_Helper',
		$contents
	);
	if ( preg_match( '/^\s*class\s+URL_Helper\b/m', $contents ) ) {
		$contents = preg_replace( '/^namespace PRC;$/m', 'namespace PRC\\\\Primitives\\\\URL_Helper;', $contents );
	}
	foreach ( migrate_namespace_rules() as list( $old, $guard, $segments ) ) {
		$contents = preg_replace_callback(
			'/(?<!\w)PRC(\\\\{1,2})' . $old . $guard . '/',
			static function ( $m ) use ( $segments ) {
				return 'PRC' . $m[1] . implode( $m[1], $segments );
			},
			$contents
		);
	}
	return $contents;
}

/**
 * List old references left in a file.
 *
 * @param string $contents File contents.
 * @return int[] One-based line numbers.
 */
function old_namespace_lines( $contents ) {
	$modules = implode( '|', array_unique( array_column( migrate_namespace_rules(), 0 ) ) );
	$lines   = array();
	foreach ( explode( "\n", $contents ) as $i => $line ) {
		$declares_url_helper = preg_match( '/^namespace PRC;$/', $line ) && preg_match( '/^\s*class\s+URL_Helper\b/m', $contents );
		if ( $declares_url_helper || preg_match( '/(?<!\w)PRC\\\\{1,2}(?:' . $modules . ')(?!\w)/', $line ) ) {
			$lines[] = $i + 1;
		}
	}
	return $lines;
}

/**
 * Yield every text file under the given paths.
 *
 * @param string[] $paths Files or directories.
 * @param string[] $skips Path substrings to ignore.
 * @return Generator<string>
 */
function text_files( array $paths, array $skips ) {
	$self = realpath( __FILE__ );
	foreach ( $paths as $path ) {
		$files = is_dir( $path )
			? new RecursiveIteratorIterator(
				new RecursiveCallbackFilterIterator(
					new RecursiveDirectoryIterator( $path, FilesystemIterator::SKIP_DOTS ),
					static function ( $file ) {
						return ! ( $file->isDir() && in_array( $file->getFilename(), SKIP_DIRS, true ) );
					}
				)
			)
			: array( new SplFileInfo( $path ) );
		foreach ( $files as $file ) {
			$name = $file->getPathname();
			if (
				! $file->isFile()
				|| realpath( $name ) === $self
				|| in_array( $file->getFilename(), SKIP_FILES, true )
				|| ! in_array( strtolower( $file->getExtension() ), TEXT_EXTENSIONS, true )
			) {
				continue;
			}
			foreach ( $skips as $skip ) {
				if ( str_contains( $name, $skip ) ) {
					continue 2;
				}
			}
			yield $name;
		}
	}
}

$args  = array_slice( $argv, 1 );
$check = in_array( '--check', $args, true );
$skips = array();
$paths = array();
foreach ( $args as $arg ) {
	if ( str_starts_with( $arg, '--skip=' ) ) {
		$skips[] = substr( $arg, 7 );
	} elseif ( '--check' !== $arg ) {
		$paths[] = $arg;
	}
}
if ( empty( $paths ) ) {
	fwrite( STDERR, "Usage: php bin/migrate-namespaces.php [--check] [--skip=<path substring>]... <path>...\n" );
	exit( 2 );
}

$found   = 0;
$changed = 0;
foreach ( text_files( $paths, $skips ) as $file ) {
	$contents = file_get_contents( $file );
	if ( $check ) {
		foreach ( old_namespace_lines( $contents ) as $line ) {
			echo "{$file}:{$line}\n";
			++$found;
		}
		continue;
	}
	$next = migrate_namespaces_in( $contents );
	if ( $next !== $contents ) {
		file_put_contents( $file, $next );
		echo "updated {$file}\n";
		++$changed;
	}
}

if ( $check ) {
	echo $found ? "{$found} old namespace reference(s) remain.\n" : "No old namespace references remain.\n";
	exit( $found ? 1 : 0 );
}
echo "Updated {$changed} file(s).\n";
