/**
 * handy function to wait for a predetermined amount of time
 * found here https://stackoverflow.com/a/47480429
 * @param {num of milliseconds to wait} ms 
 * @returns 
 */
const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * 
 * @returns 
 */
const findAllCoupons = function () {
    // scroll to bottom of the page to load all coupons

    // query for all coupons on the page
    let coupons = document.querySelectorAll("#content > section > div > section.relative.pt-48 > section > section > div > div.CouponsCatalogue-bottomContent.flex.items-start > div.CouponsCatalogue-coupons.flex-1.flex.flex-col.overflow-hidden > div > div > div > ul > li > div > div > div > div > div.CouponCard-ButtonSection > button:nth-child(2)");
    // return all coupon buttons as an array of button elements
    // Encourage filtering as large coupon requests sign out user.
    return coupons;
};

/**
 * tests to see if the user is logged in or not
 * @returns true if the user is logged in, false otherwise
 */
const userIsLoggedIn = function () {
    return !document.querySelector("#root > div > div.Page-top-block.Page-top-block-pin-t.sticky.stack-highest > div.dpr.Header > div > div.KrogerHeader.flex.items-center > div.KrogerHeader-Item.KrogerHeader-Welcome > div > div > div").innerText.toLowerCase() === "sign in";
};

/**
 * clips all coupons by clicking on the btn
 * @returns true if no exception thrown while clicking, false otherwise
 */
const clipAllCoupons = async function () {
    //check if user is logged in first and if not return false and display prompt
    if (!userIsLoggedIn) {
        GM_notification({
            text: "Hi, you are not logged in, please log in to clip coupons",
            title: "Please log in",
            silent: true,
            timeout: 7000
        });
        return false;
    }
    let coupons = findAllCoupons();
    coupons = Array.prototype.slice.call(coupons);
    try {
        for (const coupon of coupons) {
            // for every 5th coupon wait 5 seconds to help avoid throttles
            if (coupons.indexOf(coupon) % 5 === 0) {
                await delay(5000);
                // TODO update button text to show progress 
            }
            coupon.click();
        }
    } catch (error) {
        console.error(error);
        return false;
    }
    return true;
};

/**
 * create button on the page with styles
 */
const createClipAllBtn = function () {
    let btnContainer = document.querySelector("#content > section > div > section > section > div");
    GM_addElement(btnContainer, 'button', {
        id : "clipAllBtn",
        innerText : "Clip all coupons displayed",
        class: "kds-Tabs-tab interactive kind-dominant variant-fill palette-accent",
        onclick: clipAllCoupons
    });
};