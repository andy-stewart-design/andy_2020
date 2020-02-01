const bodyTag = querySelector('body');

// tell Barba to use the css module
barba.use(barbaCss);

// init Barba
barba.init({
    transitions: [
        {
            name: 'fade',
            beforeEnter ({ current, next, trigger }) {
                const headerLinks = document.querySelectorAll('header a');
                const href = next.url.path;

                headerLinks.forEach(link => {
                    if (link.getAttribute("href") === href) {
                        link.classList.add('selected');
                    } else {
                        link.classList.remove('selected');
                    }
                })

                window.scrollTo ({
                    top: 0
                })
            }
        }
    ],
    views: [
        {
            namespace: 'feed',
            beforeEnter () {
                bodyTag.classList.add('feed')
            },
            beforeLeave () {
                bodyTag.classList.remove('feed')
            }
        }
    ]
});