export { isOnIndexPage, doesAnchorLinkToCurrentPage, addUnderlineToAnchorIfLinksToCurrentPage };

function isOnIndexPage(pathname) {
    if (pathname != "/index.html") { return false; }
    return window.location.pathname == "/" || window.location.pathname == "/index.html";
}

function doesAnchorLinkToCurrentPage(anchor) {
    if (!anchor) { return; }

    const anchor_pathname = anchor.pathname;
    return isOnIndexPage(anchor_pathname) || window.location.pathname == anchor_pathname;
}

function addUnderlineToAnchorIfLinksToCurrentPage(element) {
    if (!element) { return; }

    const anchor = element.querySelector("a");
    if (doesAnchorLinkToCurrentPage(anchor)) {
        anchor.classList.add("underline");
    }
}

window.addEventListener("load", () => {
    const nav_list = document.querySelector(".nav-list");
    if (!nav_list) { return; }

    const nav_list_elements = nav_list.getElementsByTagName("li");
    if (!nav_list_elements) { return; }

    for (let current_element of nav_list_elements) {
        addUnderlineToAnchorIfLinksToCurrentPage(current_element);
    }
});

