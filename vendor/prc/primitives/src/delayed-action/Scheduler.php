<?php
/**
 * Scheduler for delayed single actions.
 *
 * @package PRC\Primitives\DelayedAction
 */

declare(strict_types=1);

namespace PRC\Primitives\DelayedAction;

/**
 * Queue, inspect, and cancel delayed single actions.
 */
interface Scheduler {

	/**
	 * Whether the backing scheduler can run jobs.
	 */
	public function available(): bool;

	/**
	 * Schedule a unique single action.
	 *
	 * @param int               $timestamp Unix timestamp to run the job.
	 * @param string            $hook      Action hook.
	 * @param array<int, mixed> $args      Hook arguments.
	 * @param string            $group     Scheduler group.
	 * @return int|false Action ID, or false when the unique job already exists.
	 */
	public function schedule_single( int $timestamp, string $hook, array $args, string $group ): int|false;

	/**
	 * Remove every matching queued action.
	 *
	 * @param string            $hook  Action hook.
	 * @param array<int, mixed> $args  Hook arguments.
	 * @param string            $group Scheduler group.
	 */
	public function unschedule_all( string $hook, array $args, string $group ): void;

	/**
	 * Next matching job.
	 *
	 * @param string            $hook  Action hook.
	 * @param array<int, mixed> $args  Hook arguments.
	 * @param string            $group Scheduler group.
	 */
	public function next( string $hook, array $args, string $group ): JobState;
}
