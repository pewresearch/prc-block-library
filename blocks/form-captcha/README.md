# Form Captcha
Contributors:      Seth Rubenstein
Tags:              block
Tested up to:      6.4
Stable tag:        1.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Display a captcha form element, conditionally.

## Description

This captcha is powered by Cloudflare's Turnstile. It is a simple captcha that can be used to protect block applications from bots and spam.
It is conditionally displayed when it's parent and target namespace have a context.captchaHidden value of false, by default most applications will have this set to true.

Upon successful completion of the captcha, the challenge token will be returned back to the targetnamespace at `context.captchaToken` which you should further validate in your rest request. See `\PRC\Platform\Mailchimp->verify_captcha()` for an example of how to validate the captcha token.

## Instructions

Drop block in block application, set the targetnamespace attribute in the PRC Interactiity API panel. This will be the namespace of the parent block that will control the captcha visibility. It is incumbent upon the parent block to handle toggling the block on|off and further validation of the returned challenge token.

## Frequently Asked Questions

= A question that someone might have =

An answer to that question.

### What about foo bar?

Answer to foo bar dilemma.

## Screenshots

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif).
2. This is the second screen shot
3. You can store screenshots in a .docs folder in this block directory...

## Changelog

= 1.0.0 =
* Release

## Developer Notes

You may provide arbitrary sections, in the same format as the ones above. This may be of use for extremely complicated
blocks where more information needs to be conveyed that doesn't fit into the categories of "description" or
"installation." Arbitrary sections will be shown below the built-in sections outlined above.
