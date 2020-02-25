const bodyTag = document.querySelector("body");

// tell Barba to use the css module
barba.use(barbaCss);

// init Barba
barba.init({
    transitions: [
        {
            name: 'fade',
            beforeLeave ({ current, next, trigger }) {
                const headerLinks = document.querySelectorAll('header a');
                const href = next.url.path;

                headerLinks.forEach(link => {
                    if (link.getAttribute("href") === href) {
                        link.classList.add('selected');
                    } else {
                        link.classList.remove('selected');
                    }
                })
            },
            beforeEnter ({ current, next, trigger }) {
                window.scrollTo ({
                    top: 0
                })
            }
        }
    ],
    views: [
        {
            namespace: "dark",
            beforeEnter () {
                bodyTag.classList.remove("light");
                bodyTag.classList.add("dark");
            }
        },
        {
            namespace: "light",
            beforeEnter () {
                bodyTag.classList.remove("dark");
                bodyTag.classList.add("light");
            }
        }
    ]
});