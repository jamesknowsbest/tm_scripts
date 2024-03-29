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
const findAllCoupons = async function () {
    // scroll to bottom of the page to load all coupons
    let root = document.getElementById("root");
    let scrollHeight = root.scrollHeight;
    // window.scrollTo(0, root.scrollHeight);
    window.scrollTo({
        top: root.scrollHeight,
        left: 0,
        behavior: "smooth",
    });
    root = document.getElementById("root");
    await delay(2000);
    while (scrollHeight != root.scrollHeight) {
        window.scrollTo({
            top: root.scrollHeight,
            left: 0,
            behavior: "smooth",
        });
        root = document.getElementById("root");
        scrollHeight = root.scrollHeight;
        await delay(3000);
    }
    // go back to the top when done
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
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
    // This didn't seem to work, not sure exactly why but I don't think its needed
    // the page will prompt the user on its own to sign in.
    // check if user is logged in first and if not return false and display prompt
    // if (!userIsLoggedIn) {
    //     console.log("user is not logged in");
    //     GM_notification({
    //         text: "Hi, you are not logged in, please log in to clip coupons",
    //         title: "Please log in",
    //         silent: true,
    //         timeout: 7000
    //     });
    //     return false;
    // }
    let coupons = await findAllCoupons();
    coupons = Array.prototype.slice.call(coupons);
    // console.log("coupons", coupons);
    // let totalNumOfCoupons = coupons.length;
    // let clipAllBtnInnerTxt = document.getElementById("clipAllBtnInnerTxt");
    try {
        // clipAllBtnInnerTxt.innerText = `clipping... 0% clipped`;
        for (const coupon of coupons) {
            // for every 5th coupon wait 5 seconds to help avoid throttles
            await delay(500);
            // clipAllBtnInnerTxt.innerText = `clipping... ${parseInt((coupons.indexOf(coupon)/totalNumOfCoupons)*100)}% clipped`;
            coupon.click();
        }
        // clipAllBtnInnerTxt.innerText = `Finished clipping!`;
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
    const clip_all_btn_command_id = GM_registerMenuCommand("Clip All Coupons", function(event) {
        // create button for user to click
        clipAllCoupons();
    }, "a");
    return clip_all_btn_command_id;
};