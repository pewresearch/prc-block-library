This concept will fuel future scrolley telly development. The idea is simple enough.

An island controller controls which island is active.
A island trigger tells the controller to switch to a specific island.
And lastly, an island is a collection of blocks that are displayed together.

Using `data-wp-router-region` we can define the islands and their triggers. The controller will then listen for these triggers and switch the active island accordingly.
A simple if is activeId equals {myTriggerId} then show else hide will do the trick.

We can expand on this concept with animations, transitions, and more. But to start, let's get the basic rendering down. 
