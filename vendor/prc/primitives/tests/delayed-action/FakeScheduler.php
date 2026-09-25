<?php
/**
 * In-memory Scheduler for DelayedAction tests.
 *
 * @package PRC\Primitives\DelayedAction\Tests
 */

declare(strict_types=1);

namespace PRC\Primitives\DelayedAction\Tests;

use PRC\Primitives\DelayedAction\JobState;
use PRC\Primitives\DelayedAction\Scheduler;

/**
 * Stores jobs keyed by hook, args, and group.
 */
final class FakeScheduler implements Scheduler {

	private bool $available = true;

	/** @var array<string, JobState> */
	private array $jobs = array();

	private int $next_id = 1;

	private bool $fail_schedule = false;

	private ?JobState $pending_after_failed_schedule = null;

	public function set_available( bool $available ): void {
		$this->available = $available;
	}

	public function fail_next_schedule_then_pending( int $timestamp ): void {
		$this->fail_schedule                   = true;
		$this->pending_after_failed_schedule   = JobState::pending( $timestamp );
	}

	public function fail_next_schedule(): void {
		$this->fail_schedule = true;
	}

	public function set_job( string $hook, array $args, string $group, JobState $state ): void {
		$this->jobs[ $this->key( $hook, $args, $group ) ] = $state;
	}

	/**
	 * {@inheritdoc}
	 */
	public function available(): bool {
		return $this->available;
	}

	/**
	 * {@inheritdoc}
	 */
	public function schedule_single( int $timestamp, string $hook, array $args, string $group ): int|false {
		$key = $this->key( $hook, $args, $group );
		if ( $this->fail_schedule ) {
			$this->fail_schedule = false;
			if ( null !== $this->pending_after_failed_schedule ) {
				$this->jobs[ $key ]                    = $this->pending_after_failed_schedule;
				$this->pending_after_failed_schedule   = null;
			}
			return false;
		}
		if ( isset( $this->jobs[ $key ] ) && ! $this->jobs[ $key ]->is_absent() ) {
			return false;
		}

		$this->jobs[ $key ] = JobState::pending( $timestamp );
		$id                 = $this->next_id;
		++$this->next_id;
		return $id;
	}

	/**
	 * {@inheritdoc}
	 */
	public function unschedule_all( string $hook, array $args, string $group ): void {
		$key = $this->key( $hook, $args, $group );
		if ( isset( $this->jobs[ $key ] ) && $this->jobs[ $key ]->is_running() ) {
			return;
		}
		unset( $this->jobs[ $key ] );
	}

	/**
	 * {@inheritdoc}
	 */
	public function next( string $hook, array $args, string $group ): JobState {
		return $this->jobs[ $this->key( $hook, $args, $group ) ] ?? JobState::absent();
	}

	/**
	 * @param array<int, mixed> $args Hook arguments.
	 */
	private function key( string $hook, array $args, string $group ): string {
		return $hook . '|' . $group . '|' . wp_json_encode( $args );
	}
}
