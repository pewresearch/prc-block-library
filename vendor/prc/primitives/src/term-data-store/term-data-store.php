<?php
/**
 * PRC Term Data Store
 *
 * Forked from 10up/term-data-store (original author: John P. Bloch).
 * Maintained by Pew Research Center as `prc/term-data-store` under the
 * `PRC\Primitives\TDS` namespace, with stronger ID-based meta linking, hierarchical
 * term handling, and optional permalink rewrites.
 *
 * Establishes a relationship between a taxonomy and a custom post type such
 * that there is a one-to-one relation between each taxonomy term and CPT post.
 *
 *   add_relationship()   sets up the relationships
 *   get_related_post()   returns a term's post for storing and returning related meta
 *   get_related_term()   returns the related term (e.g. to base a related posts query on)
 *
 * @package PRC\Primitives\TDS
 * @license GPL-2.0-or-later
 */

namespace PRC\Primitives\TDS;

use WP_Error;
use WP_Query;

if ( ! function_exists( '\PRC\Primitives\TDS\add_relationship' ) ) {

	class General_Exception extends \Exception {
	}

	class Invalid_Input_Exception extends General_Exception {
	}

	/**
	 * Sets up a term data storage relationship between a post type and a taxonomy
	 *
	 * This relationship will keep a post type and a term in a 1:1 synced relation,
	 * ensuring that no terms or posts ever exist without a matching entity of the
	 * other type.
	 *
	 * First the function makes sure get_post_type_object() and get_taxonomy()
	 * return something and then checks get_relationship() for the post type and for
	 * the taxonomy to make sure that neither is already in a relationship.
	 *
	 * The function adds a hook for save_post. The callback for the hook is the
	 * return value from get_save_post_hook().
	 *
	 * Then it adds a hook for create_$taxonomy. The callback for the hook is the
	 * return value from get_create_term_hook().
	 *
	 * Optionally, this function can also add hooks to modify post permalinks to point
	 * to their related term archives. This is controlled by the $enable_permalink_rewrites
	 * parameter, which defaults to true for backward compatibility.
	 *
	 * Finally, this function adds the relationship to the get_relationship static
	 * variable by providing the post_type as the first argument and the taxonomy as
	 * the second.
	 *
	 * @uses get_post_type_object()
	 * @uses get_taxonomy()
	 * @uses get_relationship()
	 * @uses add_action() Adds the return of get_save_post_hook() to save_post (2 arguments)
	 * @uses add_action() Adds the return of get_create_term_hook() to "create_$taxonomy"
	 * @uses add_filter() Optionally adds permalink modification hooks
	 *
	 * @throws Invalid_Input_Exception If either post_type or taxonomy is invalid
	 *
	 * @param string $post_type The post type slug
	 * @param string $taxonomy  The taxonomy slug
	 * @param bool   $enable_permalink_rewrites Optional. Whether to enable automatic permalink rewrites. Default true.
	 *
	 * @return string The relationship
	 */
	function add_relationship( $post_type, $taxonomy, $enable_permalink_rewrites = true ) {

		if ( ! get_post_type_object( $post_type ) ) {
			throw new Invalid_Input_Exception( __FUNCTION__ . '() invalid post_type input.' );
		}

		if ( ! get_taxonomy( $taxonomy ) ) {
			throw new Invalid_Input_Exception( __FUNCTION__ . '() invalid taxonomy input.' );
		}

		$post_type_relationships = get_relationship( $post_type );
		$taxonomy_relationships  = get_relationship( $taxonomy );
		if ( ! empty( $post_type_relationships ) && ! empty( $taxonomy_relationships ) ) {
			throw new Invalid_Input_Exception( __FUNCTION__ . '() post_type and taxonomy already have relationships.' );
		} elseif ( ! empty( $post_type_relationships ) && empty( $taxonomy_relationships ) ) {
			throw new Invalid_Input_Exception( __FUNCTION__ . '() post_type already has a relationship.' );
		} elseif ( empty( $post_type_relationships ) && ! empty( $taxonomy_relationships ) ) {
			throw new Invalid_Input_Exception( __FUNCTION__ . '() taxonomy already has a relationship.' );
		}
		unset( $post_type_relationships, $taxonomy_relationships );

		add_action( 'save_post', get_save_post_hook( $post_type, $taxonomy ), 10, 2 );
		add_action( 'create_' . $taxonomy, get_save_term_hook( $post_type, $taxonomy ) );
		add_action( 'edit_term', get_save_term_hook( $post_type, $taxonomy ) );
		add_action( 'before_delete_post', get_delete_post_hook( $post_type, $taxonomy ) );
		add_action( 'pre_delete_term', get_delete_term_hook( $post_type, $taxonomy ), 10, 2 );

		// Optionally add permalink rewrite hooks to redirect single posts to term archives.
		if ( $enable_permalink_rewrites ) {
			add_filter( 'post_link', get_post_link_hook( $post_type, $taxonomy ), 20, 2 );
			add_filter( 'post_type_link', get_post_type_link_hook( $post_type, $taxonomy ), 20, 2 );
		}

		$relationship = get_relationship( $post_type, $taxonomy );
		return $relationship;
	}

	function get_taxonomy_term_by_meta( $taxonomy, $meta_key, $meta_value ) {
		$term = get_terms(
			array(
				'taxonomy'   => $taxonomy,
				'meta_key'   => $meta_key,
				'meta_value' => $meta_value,
				'hide_empty' => false,
			)
		);

		if ( $term && ! is_wp_error( $term ) ) {
			return $term[0];
		}

		return null;
	}

	/**
	 * Get the name of an object's corresponding type
	 *
	 * This function stores a static variable containing an associative array with
	 * post types as keys and taxonomies as values. This function will return the
	 * taxonomy name if $for exists as a post type (i.e. a key in the array) or the
	 * post type name if $for exists as a taxonomy (i.e. a value found using
	 * array_search()). Otherwise it returns null
	 *
	 * @internal If the function is called with a non-null value for $set, add the value to the array using $for as the key and $set as the value.
	 *
	 * @param string      $for The name of the object type (post type or taxonomy) to get
	 * @param string|null $set Used internally. Ignore
	 *
	 * @return string|null The corresponding value
	 */
	function get_relationship( $for, $set = null ) {

		static $post_type_relationships = array();

		if ( isset( $set ) ) {
			return $post_type_relationships[ $for ] = $set;
		}

		if ( ! empty( $post_type_relationships[ $for ] ) ) {
			return $post_type_relationships[ $for ];
		}

		$search = array_search( $for, $post_type_relationships );
		if ( ! empty( $search ) ) {
			return $search;
		}

		return null;
	}

	function establish_post_term_connection( $post_type, $taxonomy, $post, $post_id ) {
		if ( apply_filters( 'tds_balancing_from_post', balancing_relationship(), $post_type, $taxonomy, $post ) ) {
			return;
		}

		if ( empty( $post ) || $post_type !== $post->post_type || ( 'publish' !== $post->post_status ) ) {
			return;
		}

		balancing_relationship( true );

		// Key off term id -> post id to prevent duplicates if name change occurs.
		$term    = false;
		$term_id = get_post_meta( $post_id, 'tds_term_id', true );
		if ( function_exists( 'wpcom_vip_get_term_by' ) && ! empty( $term_id ) ) {
			$term = wpcom_vip_get_term_by( 'term_id', $term_id, $taxonomy, ARRAY_A );
		} elseif ( ! empty( $term_id ) ) {
			$term = get_term_by( 'term_id', $term_id, $taxonomy, ARRAY_A );
		}

		$term_meta = null;
		$post_meta = null;

		if ( ! $term ) {
			$term = wp_insert_term( $post->post_title, $taxonomy, array( 'slug' => $post->post_name ) );
			if ( is_wp_error( $term ) ) {
				balancing_relationship( false );
				report_sync_error( 'Error creating a term: ' . implode( ', ', $term->get_error_messages() ) . ' Slug: ' . $post->post_name . ' / Title: ' . $post->post_title );
				return;
			}
			$term_meta = update_term_meta( $term['term_id'], 'tds_post_id', $post_id );
			$post_meta = update_post_meta( $post_id, 'tds_term_id', $term['term_id'] );
		} else {
			if ( is_object( $term ) ) {
				$term = (array) $term;
			}

			// Quick check if the term name or slug should be updated.
			$update = false;
			if ( $term['name'] !== $post->post_title ) {
				$term['name'] = $post->post_title;
				$update       = true;
			}

			if ( $term['slug'] !== $post->post_name ) {
				$term['slug'] = $post->post_name;
				$update       = true;
			}

			if ( $update ) {
				$term = wp_update_term( $term['term_id'], $taxonomy, $term );
			}

			if ( is_wp_error( $term ) ) {
				balancing_relationship( false );
				report_sync_error( 'Error updating a post -> term: ' . implode( ', ', $term->get_error_messages() ) . ' Slug: ' . $post->post_name . ' / Title: ' . $post->post_title );
				return;
			}
		}

		// Check to see if this post has a parent, if it does and it's term does not, then we should get the parent posts's matching term id and then set this term's parent to it...
		if ( $post->post_parent > 0 ) {
			$parent_post = get_post( $post->post_parent );
			if ( $parent_post ) {
				$parent_term = get_related_term( $parent_post );
				if ( $parent_term ) {
					$result = wp_update_term(
						$term['term_id'],
						$taxonomy,
						array(
							'parent' => $parent_term->term_id,
						)
					);
					if ( is_wp_error( $result ) ) {
						report_sync_error( 'Error setting a term parent: ' . implode( ', ', $result->get_error_messages() ) . ' Slug: ' . $post->post_name . ' / Title: ' . $post->post_title );
					}
				}
			}
		} elseif ( ( $term['parent'] ?? 0 ) > 0 ) {
			$parent_term = get_term( $term['parent'], $taxonomy );
			$parent_post = get_related_post( $parent_term->term_id, $taxonomy );
			if ( $parent_post ) {
				$post->post_parent = $parent_post->ID;
				wp_update_post(
					array(
						'ID'          => $post->ID,
						'post_parent' => $post->post_parent,
					)
				);
			}
		}

		wp_set_object_terms( $post->ID, (int) $term['term_id'], $taxonomy );
		balancing_relationship( false );
	}

	/**
	 * Report a failed sync step without interrupting the save that triggered it.
	 *
	 * @param string $message What failed and for which post or term.
	 */
	function report_sync_error( $message ) {
		if ( extension_loaded( 'newrelic' ) && function_exists( 'newrelic_notice_error' ) ) {
			\newrelic_notice_error( $message );
			return;
		}
		error_log( 'term-data-store: ' . $message ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log -- Sync runs inside save hooks, so a failure is logged instead of thrown.
	}

	/**
	 * Returns a boolean to indicate whether a relationship is currently being balanced
	 *
	 * This allows the plugin to create posts and terms without triggering an
	 * infinite loop of creating posts and terms from each other. The function uses
	 * a static variable to store the current balancing status. To set it, pass a
	 * variable as an argument. The function will check for any arguments and use
	 * the first one cast as a boolean as the static value. The function also passes
	 * the value through a filter to make this more extensible.
	 *
	 * @uses apply_filters() Filters return value with tds_balancing_relationship
	 *
	 * @return bool Whether a relationship is currently being balanced
	 */
	function balancing_relationship() {

		static $balancing_status = false;

		if ( func_num_args() ) {
			$balancing_status = (bool) func_get_arg( 0 );
		}

		return $balancing_status;
	}

	/**
	 * Returns a closure to be used as the callback hooked to save_post
	 *
	 * If balancing_relationship() returns true, this function does nothing.
	 * Otherwise it will set balancing_relationship to true before starting and back
	 * to false at the end of the function.
	 *
	 * The closure will receive the post_type and taxonomy values through its use
	 * statement so that it will have the necessary data to filter out posts created
	 * for other post types and will know which taxonomy to check and create terms
	 * for.
	 *
	 * The function stores references to the closures in a static variable using the
	 * md5 hash of "$post_type|$taxonomy" to generate the key. If that value exists,
	 * return it instead of creating a new copy.
	 *
	 * The closure that this function generates receives two arguments ($post_id and
	 * $post) and does the following:
	 *   If $post->post_type is $post_type and $post->post_status is 'publish' and
	 *   get_the_terms() is empty:
	 *     Create a new term in $taxonomy with the same name and slug as the post
	 *     and 'tag' the post with that term using wp_set_object_terms().
	 *
	 * @uses balancing_relationship()
	 * @uses get_the_terms()
	 * @uses wp_insert_term()
	 * @uses wp_set_object_terms()
	 *
	 * @param string $post_type
	 * @param string $taxonomy
	 *
	 * @return \Closure The callback
	 */
	function get_save_post_hook( $post_type, $taxonomy ) {
		static $existing_closures;
		if ( ! isset( $existing_closures ) ) {
			$existing_closures = array();
		}

		$md5 = md5( $post_type . '|' . $taxonomy );

		if ( isset( $existing_closures[ $md5 ] ) ) {
			return $existing_closures[ $md5 ];
		}

		$closure = function ( $post_id, $post ) use ( $post_type, $taxonomy ) {
			establish_post_term_connection( $post_type, $taxonomy, $post, $post_id );
		};

		$existing_closures[ $md5 ] = $closure;

		return $closure;
	}

	/**
	 * Returns a closure to be used as the callback hooked to save_post
	 *
	 * If balancing_relationship() returns true, this function does nothing.
	 * Otherwise it will set balancing_relationship to true before starting and back
	 * to false at the end of the function.
	 *
	 * The closure will receive the post_type and taxonomy values through its use
	 * statement so that it will be aware of which taxonomy the term was created in
	 * and which post type to create a post for.
	 *
	 * The function stores references to the closures in a static variable using the
	 * md5 hash of "$post_type|$taxonomy" to generate the key. If that value exists,
	 * return it instead of creating a new copy.
	 *
	 * The closure that this function generates receives one argument ($term_id) and
	 * does the following:
	 *   If get_objects_in_term() for the term id and the taxonomy is not a non-
	 *   empty array:
	 *     Get the term using get_term(). Create a new post of post type $post_type
	 *     with the same title and slug as the term and 'tag' the post with the term
	 *     using wp_set_object_terms().
	 *
	 * @uses balancing_relationship()
	 * @uses get_objects_in_term()
	 * @uses get_term()
	 * @uses wp_insert_post()
	 * @uses wp_set_object_terms()
	 *
	 * @param string $post_type
	 * @param string $taxonomy
	 *
	 * @return \Closure The callback
	 */
	function get_save_term_hook( $post_type, $taxonomy ) {

		static $existing_closures;
		if ( ! isset( $existing_closures ) ) {
			$existing_closures = array();
		}

		$md5 = md5( $post_type . '|' . $taxonomy );
		if ( isset( $existing_closures[ $md5 ] ) ) {
			return $existing_closures[ $md5 ];
		}

		$closure = function ( $term_id ) use ( $post_type, $taxonomy ) {
			if ( apply_filters( 'tds_balancing_from_term', balancing_relationship(), $taxonomy, $post_type, $term_id ) ) {
				return;
			}
			if ( empty( $term_id ) ) {
				return;
			}
			balancing_relationship( true );
			$term_objects        = get_objects_in_term( $term_id, $taxonomy );
			$matched_term_object = null;

			$create_post = true;

			// Check to see if any of the objects are of our post type
			if ( ! empty( $term_objects ) ) {
				foreach ( $term_objects as $term_object ) {
					if ( $post_type === get_post_type( $term_object ) ) {
						$create_post         = false;
						$matched_term_object = $term_object;
						break;
					}
				}
			}

			$term = get_term( $term_id, $taxonomy );

			// If no terms were found, then don't create a post
			if ( empty( $term ) ) {
				$create_post = false;
			}

			if ( true === $create_post ) {
				$post_id   = wp_insert_post(
					array(
						'post_type'   => $post_type,
						'post_title'  => $term->name,
						'post_name'   => $term->slug,
						'post_status' => 'publish',
						'meta_input'  => array(
							'tds_term_id' => $term->term_id,
						),
					)
				);
				$term_meta = update_term_meta( $term->term_id, 'tds_post_id', $post_id );
				wp_set_object_terms( $post_id, $term_id, $taxonomy );
			} elseif ( $matched_term_object ) {
				$post = get_post( $matched_term_object );

				if ( null === $post ) {
					balancing_relationship( false );
					report_sync_error( 'Error getting post for term update: Slug: ' . $term->slug . ' / Title: ' . $term->name );
					return;
				}

				// Quick check if the post title or post_name should be updated.
				if ( $term->name !== $post->post_title || $term->slug !== $post->post_name ) {
					$post->post_title = $term->name;
					$post->post_name  = $term->slug;
					$result           = wp_update_post(
						array(
							'ID'         => $post->ID,
							'post_title' => $post->post_title,
							'post_name'  => $post->post_name,
						),
						true
					);
					if ( is_wp_error( $result ) ) {
						balancing_relationship( false );
						report_sync_error( 'Error updating a term -> post: ' . implode( ', ', $result->get_error_messages() ) . ' Slug: ' . $term->slug . ' / Title: ' . $term->name );
						return;
					}
				}

				// Check for and enforce a parent post relationship the same as the term relationship.
				if ( $term->parent > 0 && $post->post_parent === 0 ) {
					$parent_term = get_term( $term->parent, $taxonomy );
					$parent_post = get_related_post( $parent_term->term_id, $taxonomy );
					if ( $parent_post ) {
						$post->post_parent = $parent_post->ID;
						$result            = wp_update_post(
							array(
								'ID'          => $post->ID,
								'post_parent' => $post->post_parent,
							),
							true
						);
						if ( is_wp_error( $result ) ) {
							balancing_relationship( false );
							report_sync_error( 'Error updating a term -> post: ' . implode( ', ', $result->get_error_messages() ) . ' Slug: ' . $term->slug . ' / Title: ' . $term->name );
							return;
						}
					}
				}
			}

			balancing_relationship( false );
		};

		$existing_closures[ $md5 ] = $closure;
		return $closure;
	}

	/**
	 * Takes a term object and returns a post object related to it
	 *
	 * If $term is an ID the term is fetched using get_term(). If that function does
	 * not return a valid term object, the function returns null. Otherwise, get the
	 * related post type using get_relationship() and grab the most recent published
	 * post of that post type and return it.
	 *
	 * @uses get_term()
	 * @uses is_wp_error()
	 * @uses get_relationship()
	 * @uses get_posts()
	 *
	 * @param object|int  $term     The term object or a term id WITH a taxonomy
	 * @param string|null $taxonomy The taxonomy (required if $term is an ID)
	 *
	 * @return \WP_Post|null
	 */
	function get_related_post( $term, $taxonomy = null ) {

		if ( is_int( $term ) ) {
			if ( ! empty( $taxonomy ) ) {
				$term = get_term( $term, $taxonomy );
			} else {
				return null;
			}
		}

		if ( is_wp_error( $term ) || ! is_object( $term ) ) {
			return null;
		}

		$post_type = get_relationship( $term->taxonomy );
		if ( empty( $post_type ) ) {
			return null;
		}

		$posts = new WP_Query(
			array(
				'post_type'           => $post_type,
				'posts_per_page'      => 1,
				'post_status'         => array( 'publish', 'draft' ),
				'tax_query'           => array(
					array(
						'taxonomy'         => $term->taxonomy,
						'field'            => 'id',
						'terms'            => $term->term_id,
						'include_children' => false,
					),
				),
				'ignore_sticky_posts' => true,
				'no_found_rows'       => true,
			)
		);

		return $posts->post_count == 0 ? null : $posts->post;
	}

	/**
	 * Takes a post object (or ID) and returns a term object related to it
	 *
	 * First $post is run through get_post() to ensure it's a valid post object. If
	 * it's not, null is returned. Then the terms are fetched using get_the_terms().
	 * If a non-empty array is not returned, null is returned. Otherwise, the first
	 * element of the array is returned.
	 *
	 * @uses get_post()
	 * @uses get_the_terms()
	 * @uses is_wp_error()
	 *
	 * @param \WP_Post|int $post The post or post id
	 *
	 * @return object|null
	 */
	function get_related_term( $post ) {

		$post = get_post( $post );
		if ( empty( $post ) ) {
			return;
		}

		$terms = get_the_terms( $post->ID, get_relationship( $post->post_type ) );

		if ( is_wp_error( $terms ) || ! $terms ) {
			return null;
		}

		if ( is_array( $terms ) && count( $terms ) > 0 ) {
			return reset( $terms );
		}

		return null;
	}

	/**
	 * Returns a closure to be used as the callback hooked to before_delete_post
	 *
	 * If balancing_relationship() returns true, this function does nothing.
	 * Otherwise it will set balancing_relationship to true before starting and back
	 * to false at the end of the function.
	 *
	 * The closure will receive the post_type and taxonomy values through its use
	 * statement so that it will have the necessary data to filter out posts created
	 * for other post types and will know which taxonomy to check and delete terms
	 * for.
	 *
	 * The function stores references to the closures in a static variable using the
	 * md5 hash of "$post_type|$taxonomy" to generate the key. If that value exists,
	 * return it instead of creating a new copy.
	 *
	 * The closure that this function generates receives one argument ($post_id) and does the following:
	 *   If able to find a post for the $post_id, and the $post->post_type is $post_type and get_related_term returns a term
	 *   then delete that term.
	 *
	 * @uses balancing_relationship()
	 * @uses get_related_term()
	 * @uses wp_delete_term()
	 *
	 * @param string $post_type
	 * @param string $taxonomy
	 *
	 * @return \Closure The callback
	 */
	function get_delete_post_hook( $post_type, $taxonomy ) {

		static $existing_closures;
		if ( ! isset( $existing_closures ) ) {
			$existing_closures = array();
		}

		$md5 = md5( $post_type . '|' . $taxonomy );
		if ( isset( $existing_closures[ $md5 ] ) ) {
			return $existing_closures[ $md5 ];
		}

		$closure = function ( $post_id ) use ( $post_type, $taxonomy ) {
			if ( apply_filters( 'tds_balancing_from_delete_post', balancing_relationship(), $post_type, $taxonomy, $post_id ) ) {
				return;
			}

			$post = get_post( $post_id );

			if ( empty( $post ) || $post_type !== $post->post_type ) {
				return;
			}

			balancing_relationship( true );

			$term = get_related_term( $post );

			if ( $term ) {
				wp_delete_term( $term->term_id, $taxonomy );
			}

			balancing_relationship( false );
		};

		$existing_closures[ $md5 ] = $closure;

		return $closure;
	}

	/**
	 * Returns a closure to be used as the callback hooked to pre_delete_term
	 *
	 * If balancing_relationship() returns true, this function does nothing.
	 * Otherwise it will set balancing_relationship to true before starting and back
	 * to false at the end of the function.
	 *
	 * The closure will receive the post_type and taxonomy values through its use
	 * statement so that it will be aware of which taxonomy the term was created in
	 * and which post type to delete a post for.
	 *
	 * The function stores references to the closures in a static variable using the
	 * md5 hash of "$post_type|$taxonomy" to generate the key. If that value exists,
	 * return it instead of creating a new copy.
	 *
	 * The closure that this function generates receives two arguments ($deleted_term, $deleted_term_taxonomy ) and
	 * does the following:
	 * If we're able to find a post in $post_type that has the same term id as the deleted term's id and, that post id deleted
	 *
	 * @uses balancing_relationship()
	 * @uses wp_delete_post()
	 *
	 * @param string $post_type
	 * @param string $taxonomy
	 *
	 * @return \Closure The callback
	 */
	function get_delete_term_hook( $post_type, $taxonomy ) {

		static $existing_closures;
		if ( ! isset( $existing_closures ) ) {
			$existing_closures = array();
		}

		$md5 = md5( $post_type . '|' . $taxonomy );
		if ( isset( $existing_closures[ $md5 ] ) ) {
			return $existing_closures[ $md5 ];
		}

		$closure = function ( $deleted_term, $deleted_term_taxonomy ) use ( $post_type, $taxonomy ) {

			if ( apply_filters( 'tds_balancing_from_delete_term', balancing_relationship(), $post_type, $taxonomy, $deleted_term ) ) {
				return;
			}

			if ( empty( $deleted_term ) || $deleted_term_taxonomy !== $taxonomy ) {
				return;
			}

			balancing_relationship( true );

			// Get post id on term deletion.
			$post_id = 0;
			$post    = get_related_post( $deleted_term, $taxonomy );

			if ( is_a( $post, 'WP_Post' ) ) {
				$post_id = $post->ID;
			}

			if ( 0 !== $post_id ) {
				wp_delete_post( $post_id, true );
			}

			balancing_relationship( false );
		};

		$existing_closures[ $md5 ] = $closure;

		return $closure;
	}

	/**
	 * Returns a closure to be used as the callback hooked to post_link
	 *
	 * This closure modifies the permalink for single posts to point to their
	 * related term archive instead of the post type single page. This is useful
	 * when the post type is used as a data store for the taxonomy and the
	 * taxonomy archive is the primary way to view the content.
	 *
	 * The function stores references to the closures in a static variable using the
	 * md5 hash of "$post_type|$taxonomy" to generate the key. If that value exists,
	 * return it instead of creating a new copy.
	 *
	 * The closure that this function generates receives two arguments ($url and $post)
	 * and does the following:
	 *   If $post->post_type is $post_type and $post->post_status is 'publish':
	 *     Get the related term using get_related_term() and return the term archive link
	 *     using get_term_link(). If no term is found or there's an error, return the
	 *     original URL.
	 *
	 * @uses get_related_term()
	 * @uses get_term_link()
	 *
	 * @param string $post_type The post type slug
	 * @param string $taxonomy  The taxonomy slug
	 *
	 * @return \Closure The callback
	 */
	function get_post_link_hook( $post_type, $taxonomy ) {
		static $existing_closures;
		if ( ! isset( $existing_closures ) ) {
			$existing_closures = array();
		}

		$md5 = md5( $post_type . '|' . $taxonomy . '|post_link' );
		if ( isset( $existing_closures[ $md5 ] ) ) {
			return $existing_closures[ $md5 ];
		}

		$closure = function ( $url, $post ) use ( $post_type, $taxonomy ) {
			if ( 'publish' !== $post->post_status ) {
				return $url;
			}

			if ( $post_type === $post->post_type ) {
				$term = get_related_term( $post );
				if ( $term && ! is_wp_error( $term ) ) {
					$term_link = get_term_link( $term, $taxonomy );
					if ( ! is_wp_error( $term_link ) ) {
						return $term_link;
					}
				}
			}

			return $url;
		};

		$existing_closures[ $md5 ] = $closure;
		return $closure;
	}

	/**
	 * Returns a closure to be used as the callback hooked to post_type_link
	 *
	 * This closure modifies the permalink for single posts to point to their
	 * related term archive instead of the post type single page. This is useful
	 * when the post type is used as a data store for the taxonomy and the
	 * taxonomy archive is the primary way to view the content.
	 *
	 * The function stores references to the closures in a static variable using the
	 * md5 hash of "$post_type|$taxonomy" to generate the key. If that value exists,
	 * return it instead of creating a new copy.
	 *
	 * The closure that this function generates receives two arguments ($url and $post)
	 * and does the following:
	 *   If $post->post_type is $post_type and $post->post_status is 'publish':
	 *     Get the related term using get_related_term() and return the term archive link
	 *     using get_term_link(). If no term is found or there's an error, return the
	 *     original URL.
	 *
	 * @uses get_related_term()
	 * @uses get_term_link()
	 *
	 * @param string $post_type The post type slug
	 * @param string $taxonomy  The taxonomy slug
	 *
	 * @return \Closure The callback
	 */
	function get_post_type_link_hook( $post_type, $taxonomy ) {
		static $existing_closures;
		if ( ! isset( $existing_closures ) ) {
			$existing_closures = array();
		}

		$md5 = md5( $post_type . '|' . $taxonomy . '|post_type_link' );
		if ( isset( $existing_closures[ $md5 ] ) ) {
			return $existing_closures[ $md5 ];
		}

		$closure = function ( $url, $post ) use ( $post_type, $taxonomy ) {
			if ( 'publish' !== $post->post_status ) {
				return $url;
			}

			if ( $post_type === $post->post_type ) {
				$term = get_related_term( $post );
				if ( $term && ! is_wp_error( $term ) ) {
					$term_link = get_term_link( $term, $taxonomy );
					if ( ! is_wp_error( $term_link ) ) {
						return $term_link;
					}
				}
			}

			return $url;
		};

		$existing_closures[ $md5 ] = $closure;
		return $closure;
	}

}
