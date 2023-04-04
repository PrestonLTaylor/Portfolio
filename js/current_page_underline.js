function is_on_index_with_empty_pathname(pathname)
{
    if (window.location.pathname != "/") return false;
    return pathname == "/index.html";
}

function addUnderlineIfLinksToCurrentPage(element)
{
    if (!element) { return; }

    const anchor = element.getElementsByTagName("a")[0];
    if (!anchor) { return; }

    const anchor_pathname = new URL(anchor.href).pathname;

    if (window.location.pathname == anchor_pathname || is_on_index_with_empty_pathname(anchor_pathname))
    {
        anchor.classList.add("underline");
    }
}

window.addEventListener("load", () =>
{
    const nav_list = document.getElementsByClassName("nav-list")[0];
    if (!nav_list) { return; }

    const nav_list_elements = nav_list.getElementsByTagName("li");
    if (!nav_list_elements) { return; }
    
    for (let current_element of nav_list_elements)
    {
        addUnderlineIfLinksToCurrentPage(current_element);
    }
});
