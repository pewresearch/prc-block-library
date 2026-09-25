<?php
/**
 * DelayedAction queue and cancel behavior.
 *
 * @package PRC\Primitives\DelayedAction\Tests
 */

declare(strict_types=1);

namespace PRC\Primitives\DelayedAction\Tests;

use PHPUnit\Framework\TestCase;
use PRC\Primitives\DelayedAction\DelayedAction;
use PRC\Primitives\DelayedAction\JobState;
use WP_Error;

/**
 * @covers \PRC\Primitives\DelayedAction\DelayedAction
 */
final class DelayedActionTest extends TestCase {

	private const HOOK  = 'prc_test_delayed';
	private const GROUP = 'prc-test';
	private const ARGS  = array( 42 );

	public function test_queue_schedules_unique_action_at_delay(): void {
		$scheduler = new FakeScheduler();
		$action    = new DelayedAction( $scheduler );
		$before    = time();

		$result = $action->queue( self::HOOK, self::ARGS, self::GROUP, 600 );

		$this->assertIsArray( $result );
		$this->assertTrue( $result['queued'] );
		$this->assertGreaterThanOrEqual( $before + 600, $result['scheduled_at'] );
		$this->assertLessThanOrEqual( $before + 601, $result['scheduled_at'] );
		$this->assertTrue( $scheduler->next( self::HOOK, self::ARGS, self::GROUP )->is_pending() );
	}

	public function test_queue_returns_existing_pending_timestamp(): void {
		$scheduler = new FakeScheduler();
		$existing  = time() + 120;
		$scheduler->set_job( self::HOOK, self::ARGS, self::GROUP, JobState::pending( $existing ) );
		$action = new DelayedAction( $scheduler );

		$result = $action->queue( self::HOOK, self::ARGS, self::GROUP, 600 );

		$this->assertIsArray( $result );
		$this->assertTrue( $result['queued'] );
		$this->assertSame( $existing, $result['scheduled_at'] );
	}

	public function test_queue_uses_next_timestamp_when_unique_schedule_fails(): void {
		$scheduler = new FakeScheduler();
		$deduped   = time() + 90;
		$scheduler->fail_next_schedule_then_pending( $deduped );
		$action = new DelayedAction( $scheduler );

		$result = $action->queue( self::HOOK, self::ARGS, self::GROUP, 600 );

		$this->assertIsArray( $result );
		$this->assertSame( $deduped, $result['scheduled_at'] );
	}

	public function test_queue_returns_schedule_failed_when_store_write_fails(): void {
		$scheduler = new FakeScheduler();
		$scheduler->fail_next_schedule();
		$action = new DelayedAction( $scheduler );

		$result = $action->queue( self::HOOK, self::ARGS, self::GROUP, 600 );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertSame( 'schedule_failed', $result->get_error_code() );
		$this->assertTrue( $scheduler->next( self::HOOK, self::ARGS, self::GROUP )->is_absent() );
	}

	public function test_queue_returns_schedule_failed_when_unique_job_is_running(): void {
		$scheduler = new FakeScheduler();
		$scheduler->set_job( self::HOOK, self::ARGS, self::GROUP, JobState::running() );
		$action = new DelayedAction( $scheduler );

		$result = $action->queue( self::HOOK, self::ARGS, self::GROUP, 600 );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertSame( 'schedule_failed', $result->get_error_code() );
		$this->assertTrue( $scheduler->next( self::HOOK, self::ARGS, self::GROUP )->is_running() );
	}

	public function test_queue_returns_unavailable_when_scheduler_is_missing(): void {
		$scheduler = new FakeScheduler();
		$scheduler->set_available( false );
		$action = new DelayedAction( $scheduler );

		$result = $action->queue( self::HOOK, self::ARGS, self::GROUP, 600 );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertSame( 'action_scheduler_unavailable', $result->get_error_code() );
		$this->assertTrue( $scheduler->next( self::HOOK, self::ARGS, self::GROUP )->is_absent() );
	}

	public function test_cancel_removes_pending_job(): void {
		$scheduler = new FakeScheduler();
		$scheduler->set_job( self::HOOK, self::ARGS, self::GROUP, JobState::pending( time() + 60 ) );
		$action = new DelayedAction( $scheduler );

		$result = $action->cancel( self::HOOK, self::ARGS, self::GROUP );

		$this->assertIsArray( $result );
		$this->assertTrue( $result['cancelled'] );
		$this->assertTrue( $scheduler->next( self::HOOK, self::ARGS, self::GROUP )->is_absent() );
	}

	public function test_cancel_returns_no_pending_when_absent(): void {
		$action = new DelayedAction( new FakeScheduler() );

		$result = $action->cancel( self::HOOK, self::ARGS, self::GROUP );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertSame( 'no_pending', $result->get_error_code() );
	}

	public function test_cancel_returns_in_progress_when_worker_claimed_job(): void {
		$scheduler = new FakeScheduler();
		$scheduler->set_job( self::HOOK, self::ARGS, self::GROUP, JobState::running() );
		$action = new DelayedAction( $scheduler );

		$result = $action->cancel( self::HOOK, self::ARGS, self::GROUP );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertSame( 'in_progress', $result->get_error_code() );
		$this->assertTrue( $scheduler->next( self::HOOK, self::ARGS, self::GROUP )->is_running() );
	}

	public function test_cancel_returns_unavailable_when_scheduler_is_missing(): void {
		$scheduler = new FakeScheduler();
		$scheduler->set_available( false );
		$action = new DelayedAction( $scheduler );

		$result = $action->cancel( self::HOOK, self::ARGS, self::GROUP );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertSame( 'action_scheduler_unavailable', $result->get_error_code() );
	}
}
