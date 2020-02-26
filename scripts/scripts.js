const bodyTag = document.querySelector("body");

// tell Barba to use the css module
// barba.use(barbaCss);

// init Barba
barba.init({
    transitions: [
        // {
        //     name: 'fade',
        //     beforeLeave ({ current, next, trigger }) {
        //         const headerLinks = document.querySelectorAll('header a');
        //         const href = next.url.path;

        //         headerLinks.forEach(link => {
        //             if (link.getAttribute("href") === href) {
        //                 link.classList.add('selected');
        //             } else {
        //                 link.classList.remove('selected');
        //             }
        //         })
        //     },
        //     beforeEnter ({ current, next, trigger }) {
        //         window.scrollTo ({
        //             top: 0
        //         })
        //     }
        // }
        {
            name: "fade",
            beforeLeave ({ next }) {
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
            leave ({ current }) {
                return new Promise(resolve => {
                    const timeline = gsap.timeline({
                        onComplete () {
                            current.container.remove();
                            resolve();
                        }
                    });

                    timeline
                    .to( current.container, { opacity: 0 } );
                })
            },
            beforeEnter ({ next }) {
                return new Promise(resolve => {
                    window.scrollTo({
                        top: 0
                    });

                    next.container.style.opacity = "0";

                    resolve();
                })
            },
            enter ({ next }) {
                return new Promise(resolve => {
                    const timeline = gsap.timeline({
                        onComplete() {
                            resolve();
                        }
                    });
    
                    timeline
                    .to(next.container, { opacity: 1 });
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