<?php
/**
 * Scheduler job state.
 *
 * @package PRC\Primitives\DelayedAction
 */

declare(strict_types=1);

namespace PRC\Primitives\DelayedAction;

/**
 * One of three states for a delayed Action Scheduler job.
 *
 * Pending carries a unix timestamp. Running means a worker already claimed the job.
 * Absent means nothing is queued.
 */
final class JobState {

	private const PENDING = 'pending';
	private const RUNNING = 'running';
	private const ABSENT  = 'absent';

	/**
	 * @param string   $status    One of pending, running, absent.
	 * @param int|null $timestamp Unix timestamp when pending, otherwise null.
	 */
	private function __construct(
		private string $status,
		private ?int $timestamp
	) {}

	/**
	 * Job is queued and has not started.
	 *
	 * @param int $timestamp Unix timestamp when the job should run.
	 */
	public static function pending( int $timestamp ): self {
		return new self( self::PENDING, $timestamp );
	}

	/**
	 * A worker has claimed the job.
	 */
	public static function running(): self {
		return new self( self::RUNNING, null );
	}

	/**
	 * Nothing is queued.
	 */
	public static function absent(): self {
		return new self( self::ABSENT, null );
	}

	public function is_pending(): bool {
		return self::PENDING === $this->status;
	}

	public function is_running(): bool {
		return self::RUNNING === $this->status;
	}

	public function is_absent(): bool {
		return self::ABSENT === $this->status;
	}

	public function timestamp(): ?int {
		return $this->timestamp;
	}
}
