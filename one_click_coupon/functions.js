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
    let root = document.getElementById("root");
    window.scrollTo(0, root.scrollHeight);
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
        console.log("user is not logged in");
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
    let totalNumOfCoupons = coupons.length;
    let clipAllBtnInnerTxt = document.getElementById("clipAllBtnInnerTxt");
    try {
        clipAllBtnInnerTxt.innerText = `clipping... 0% clipped`;
        for (const coupon of coupons) {
            // for every 5th coupon wait 5 seconds to help avoid throttles
            if (coupons.indexOf(coupon) % 5 === 0) {
                await delay(5000);
                clipAllBtnInnerTxt.innerText = `clipping... ${coupons.indexOf(coupon)/totalNumOfCoupons}% clipped`;
            }
            coupon.click();
        }
        clipAllBtnInnerTxt.innerText = `Finished clipping, happy shopping!`;
    } catch (error) {
        console.error(error);
        return false;
    }
    return true;
};

/**
 * waits for element to exist on the page
 * source https://stackoverflow.com/a/61511955
 */
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};

/**
 * create button on the page with styles
 */
const createClipAllBtn = async function () {
    await waitForElm("#content > section > div > section.relative.pt-48 > section > section > div > div.CouponsCatalogue-bottomContent.flex.items-start > div.CouponsCatalogue-coupons.flex-1.flex.flex-col.overflow-hidden");
    let btnContainer = await waitForElm("#content > section > div > section > section > div");
    let clipAllBtn = GM_addElement(btnContainer, 'button', {
        id : "clipAllBtn",
        innerText : "Clip all coupons displayed",
        class : "kds-Tabs-tab interactive kind-dominant variant-fill palette-accent"
    });
    clipAllBtn.addEventListener('click', clipAllCoupons, false);
    clipAllBtn.innerHTML = "<span id=\"clipAllBtnInnerTxt\" class=\"kds-Text--l tab-text\">Clip All Coupons</span>";
    return clipAllBtn;
};