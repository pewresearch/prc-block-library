# Tokens List

## Usage Requirements

1. You parent store needs to provide a `state.tokens` array of objects with the following properties:

- `slug` (string): The slug of the token.
- `label` (string): The label of the token.
- `value` (string): The value of the token. 

2. You parent store also needs to provide an `actions.onClear` function that accepts the following arguments:

- `value` (string): The value of the token to clear.

It is up to you to control the logic of what happens when a token is removed. 
