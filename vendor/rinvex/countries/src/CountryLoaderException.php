<?php

declare(strict_types=1);

namespace Rinvex\Country;

use Exception;

class CountryLoaderException extends Exception
{
    /**
     * Create a new exception instance.
     */
    public static function invalidCountry(): static
    {
        return new static('Country code may be misspelled, invalid, or data not found on server!');
    }
}
