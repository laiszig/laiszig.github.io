(function (document) {
    var toggle = document.querySelector(".sidebar-toggle");
    var sidebar = document.querySelector("#sidebar");
    var checkbox = document.querySelector("#sidebar-checkbox");

    document.addEventListener(
        "click",
        function (e) {
            var target = e.target;

            if (
                !checkbox.checked ||
                sidebar.contains(target) ||
                target === checkbox ||
                target === toggle
            )
                return;

            checkbox.checked = false;
        },
        false
    );
})(document);

function loadContent(url, element, event) {
    // Prevent the default behavior of the link
    if (event) {
        event.preventDefault();
    }

    // Fetch and update the content
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            // Update only the content inside the markdown section
            document.getElementById("content").innerHTML = data;

            // Manage active link highlighting
            document.querySelectorAll(".sidebar-nav a").forEach((link) => {
                link.classList.remove("active");
            });
            element.classList.add("active");
        });
}
