// ==UserScript==
// @name         Easy 1 click coupons shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Makes an easy one click button to clip all coupons
// @author       James Palmisano
// @match        https://www.kroger.com/savings/cl/coupons/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kroger.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // mk btn for user to easily click and clip all coupons

    // mk function to find all coupon btns returned as an array of elements
    const findAllCoupons = function () {
        // scroll to bottom of the page to load all coupons

        // query for all coupons on the page
        document.querySelectorAll("#content > section > div > section.relative.pt-48 > section > section > div > div.CouponsCatalogue-bottomContent.flex.items-start > div.CouponsCatalogue-coupons.flex-1.flex.flex-col.overflow-hidden > div > div > div > ul > li > div > div > div > div > div.CouponCard-ButtonSection > button:nth-child(2)");
        // return all coupon buttons as an array of button elements
        // Encourage filtering as large coupon requests sign out user.
    }
    // mk function that clips all coupons by clicking on the btn
    const clipAllCoupons = function () {
        document.querySelector("#root > div > div.Page-top-block.Page-top-block-pin-t.sticky.stack-highest > div.dpr.Header > div > div.KrogerHeader.flex.items-center > div.KrogerHeader-Item.KrogerHeader-Welcome > div > div > div").innerText.toLowerCase() === "sign in";


        for (const coupon of findAllCoupons()) {
            coupon.click();
        }
    }
})();