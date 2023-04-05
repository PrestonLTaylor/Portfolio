/**
 * @jest-environment jsdom
 */
import * as script from "./current_page_underline.js"

function initializeNavListToDocument() {
    let navList = document.createElement("ul");
    navList.classList.add("nav-list");

    let indexLi = document.createElement("li");
    let testLi = document.createElement("li");
    navList.appendChild(indexLi);
    navList.appendChild(testLi);

    let indexAnchor = document.createElement("a");
    indexAnchor.setAttribute("href", "/index.html");
    let testAnchor = document.createElement("a");
    testAnchor.setAttribute("href", "/test.html");

    indexLi.appendChild(indexAnchor);
    testLi.appendChild(testAnchor);

    document.body.appendChild(navList);
}

beforeAll(() => {
    initializeNavListToDocument();
});

function resetAnchorsTestDecorationValue() {
    let anchors = document.querySelectorAll("a");
    for (let anchor of anchors) {
        anchor.classList.remove("underline");
    }
}

beforeEach(() => {
    resetAnchorsTestDecorationValue();
});

test("isOnIndexPage returns true when supplied pathname of /index.html when on /", function() {
    delete window.location;

    window.location = new URL("/", "https://www.test.com/");
    expect(script.isOnIndexPage("/index.html")).toBe(true);
})

test("isOnIndexPage returns true when supplied pathname of /index.html when on /index.html", function() {
    delete window.location;

    window.location = new URL("/index.html", "https://www.test.com/");
    expect(script.isOnIndexPage("/index.html")).toBe(true);
});

test("isOnIndexPage returns false when not on / or /index.html", function() {
    delete window.location;

    window.location = new URL("/test.html", "https://www.test.com/");
    expect(script.isOnIndexPage("/index.html")).toBe(false);
});

test("isOnIndexPage returns false when not supplied /index.html", function() {
    expect(script.isOnIndexPage("/test.html")).toBe(false);
    expect(script.isOnIndexPage("/index.htmls")).toBe(false);
});

test("doesAnchorLinkToCurrentPage returns true when anchor links to current page", function() {
    delete window.location;

    let anchors = document.querySelectorAll("a");
    for (let anchor of anchors) {
        if (anchor.pathname == "/index.html") {
            // We want index.html anchor to be underlined if we're on /
            window.location = new URL("/", anchor.origin);
            expect(script.doesAnchorLinkToCurrentPage(anchor)).toBe(true);
        }

        window.location = new URL(anchor.href);
        expect(script.doesAnchorLinkToCurrentPage(anchor)).toBe(true);
    }
});

test("doesAnchorLinkToCurrentPage returns false when anchor links to another page", function() {
    delete window.location;

    let anchors = document.querySelectorAll("a");
    for (let anchor of anchors) {
        if (anchor.pathname == "/index.html") {
            // We don't want index.html anchor to be underlined if we're not on / or /index.html
            window.location = new URL("/test.html", anchor.origin);
            expect(script.doesAnchorLinkToCurrentPage(anchor)).toBe(false);
        }

        window.location = new URL(anchor.href + "DifferentPage");
        expect(script.doesAnchorLinkToCurrentPage(anchor)).toBe(false);
    }
});

test("addUnderlineToAnchorIfLinksToCurrentPage underlines an anchor when it links to current page", function() {
    delete window.location;

    let listElements = document.querySelectorAll("li");
    for (let listElement of listElements) {
        let anchor = listElement.querySelector("a");
        window.location = new URL(anchor.href);

        script.addUnderlineToAnchorIfLinksToCurrentPage(listElement);

        expect(anchor.className.includes("underline")).toBe(true);
    }
});

test("addUnderlineToAnchorIfLinksToCurrentPage doesn't underline an anchor when it links to another page", function() {
    delete window.location;

    let listElements = document.querySelectorAll("li");
    for (let listElement of listElements) {
        let anchor = listElement.querySelector("a");
        window.location = new URL("/differentpage.html", anchor.origin);

        script.addUnderlineToAnchorIfLinksToCurrentPage(listElement);

        expect(anchor.className.includes("underline")).toBe(false);
    }
});
