<?php
/**
 * Delay and cancel a unique Action Scheduler job.
 *
 * @package PRC\Primitives\DelayedAction
 */

declare(strict_types=1);

namespace PRC\Primitives\DelayedAction;

use WP_Error;

/**
 * Queue or cancel a delayed unique single action.
 *
 * Callers keep their own post meta and hook callbacks.
 */
final class DelayedAction {

	/**
	 * @param Scheduler $scheduler Backing scheduler.
	 */
	public function __construct(
		private Scheduler $scheduler
	) {}

	/**
	 * Schedule a unique single action at time() + delay.
	 *
	 * If a matching job is already pending, return that timestamp.
	 * Does not run the callback when Action Scheduler is missing.
	 *
	 * @param string            $hook          Action hook.
	 * @param array<int, mixed> $args          Hook arguments.
	 * @param string            $group         Scheduler group.
	 * @param int               $delay_seconds Seconds from now.
	 * @return array{ queued: bool, scheduled_at: int }|WP_Error
	 */
	public function queue( string $hook, array $args, string $group, int $delay_seconds ): array|WP_Error {
		if ( ! $this->scheduler->available() ) {
			return new WP_Error(
				'action_scheduler_unavailable',
				'Action Scheduler is not available. The action was not queued.',
				array( 'status' => 500 )
			);
		}

		$existing = $this->scheduler->next( $hook, $args, $group );
		if ( $existing->is_pending() ) {
			return array(
				'queued'       => true,
				'scheduled_at' => (int) $existing->timestamp(),
			);
		}

		$timestamp = time() + $delay_seconds;
		$action_id = $this->scheduler->schedule_single( $timestamp, $hook, $args, $group );
		if ( false !== $action_id ) {
			return array(
				'queued'       => true,
				'scheduled_at' => $timestamp,
			);
		}

		$next = $this->scheduler->next( $hook, $args, $group );
		if ( $next->is_pending() ) {
			return array(
				'queued'       => true,
				'scheduled_at' => (int) $next->timestamp(),
			);
		}

		return new WP_Error(
			'schedule_failed',
			'The action could not be queued.',
			array( 'status' => 500 )
		);
	}

	/**
	 * Remove a queued action before it runs.
	 *
	 * @param string            $hook  Action hook.
	 * @param array<int, mixed> $args  Hook arguments.
	 * @param string            $group Scheduler group.
	 * @return array{ cancelled: bool }|WP_Error
	 */
	public function cancel( string $hook, array $args, string $group ): array|WP_Error {
		if ( ! $this->scheduler->available() ) {
			return new WP_Error(
				'action_scheduler_unavailable',
				'Action Scheduler is not available. The action was not cancelled.',
				array( 'status' => 500 )
			);
		}

		$state = $this->scheduler->next( $hook, $args, $group );
		if ( $state->is_absent() ) {
			return new WP_Error(
				'no_pending',
				'There is no queued action to cancel.',
				array( 'status' => 409 )
			);
		}

		if ( $state->is_running() ) {
			return new WP_Error(
				'in_progress',
				'This action is already in progress and cannot be cancelled.',
				array( 'status' => 409 )
			);
		}

		$this->scheduler->unschedule_all( $hook, $args, $group );

		$after = $this->scheduler->next( $hook, $args, $group );
		if ( $after->is_running() ) {
			return new WP_Error(
				'in_progress',
				'This action is already in progress and cannot be cancelled.',
				array( 'status' => 409 )
			);
		}

		return array(
			'cancelled' => true,
		);
	}
}
