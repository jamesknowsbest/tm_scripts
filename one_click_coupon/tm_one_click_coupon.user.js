// ==UserScript==
// @name         Easy 1 click coupons shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Makes an easy one click button to clip all coupons
// @author       James Palmisano
// @match        https://www.kroger.com/savings/cl/coupons/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kroger.com
// @grant        GM_notification
// @grant        GM_addElement
// @require      https://github.com/jamesknowsbest/tm_scripts/raw/main/one_click_coupon/functions.js
// ==/UserScript==


(function () {
    'use strict';
    // create button for user to click
    addEventListener("DOMContentLoaded", createClipAllBtn);
})();
