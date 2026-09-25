<?php
/**
 * ActionSchedulerGateway maps Action Scheduler returns to JobState.
 *
 * @package PRC\Primitives\DelayedAction\Tests
 */

declare(strict_types=1);

namespace PRC\Primitives\DelayedAction\Tests;

use PHPUnit\Framework\TestCase;
use PRC\Primitives\DelayedAction\ActionSchedulerGateway;

/**
 * @covers \PRC\Primitives\DelayedAction\ActionSchedulerGateway
 */
final class ActionSchedulerGatewayTest extends TestCase {

	public function test_available_is_false_without_action_scheduler_functions(): void {
		$gateway = new ActionSchedulerGateway();

		$this->assertFalse( $gateway->available() );
	}
}
