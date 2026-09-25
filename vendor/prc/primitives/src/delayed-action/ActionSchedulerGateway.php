<?php
/**
 * Action Scheduler adapter.
 *
 * @package PRC\Primitives\DelayedAction
 */

declare(strict_types=1);

namespace PRC\Primitives\DelayedAction;

/**
 * Translates Action Scheduler function returns into JobState.
 *
 * This is the only type that calls as_schedule_single_action,
 * as_unschedule_all_actions, and as_next_scheduled_action.
 */
final class ActionSchedulerGateway implements Scheduler {

	/**
	 * {@inheritdoc}
	 */
	public function available(): bool {
		return function_exists( 'as_schedule_single_action' )
			&& function_exists( 'as_unschedule_all_actions' )
			&& function_exists( 'as_next_scheduled_action' );
	}

	/**
	 * {@inheritdoc}
	 */
	public function schedule_single( int $timestamp, string $hook, array $args, string $group ): int|false {
		$result = as_schedule_single_action( $timestamp, $hook, $args, $group, true );
		if ( ! $result ) {
			return false;
		}

		return (int) $result;
	}

	/**
	 * {@inheritdoc}
	 */
	public function unschedule_all( string $hook, array $args, string $group ): void {
		as_unschedule_all_actions( $hook, $args, $group );
	}

	/**
	 * {@inheritdoc}
	 */
	public function next( string $hook, array $args, string $group ): JobState {
		$result = as_next_scheduled_action( $hook, $args, $group );
		if ( true === $result ) {
			return JobState::running();
		}
		if ( is_numeric( $result ) && (int) $result > 0 ) {
			return JobState::pending( (int) $result );
		}

		return JobState::absent();
	}
}
