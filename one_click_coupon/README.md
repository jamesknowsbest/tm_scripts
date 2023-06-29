# One click coupon

Ever be on a store's page and find a bunch of coupons but you need to click on every single one? This handy script will find all the "clip" buttons and click them for you.

## site supported currently

https://www.kroger.com/savings/cl/coupons/

## usage

If installed, click on the tamper monkey icon in the top right of the browser. This icon may not be visable by default and you'll need to make sure its is pinned in the browser. In chrome this is done by clicking on the extension icon(puzzle piece) and then clicking on the pin icon.

Once pinned, click on the tm extension and you should see the one_click_coupon script running on the page. There'll be a sub menu option displayed called "Clip All Coupons"

When clicked, the script will
- scroll to the bottom of the page to load all coupons
- scroll back to the top of the page
- click each "clip" button with a delay of 500 milliseconds between each clip

### Assumptions

This script assumes you're already logged into the account.
