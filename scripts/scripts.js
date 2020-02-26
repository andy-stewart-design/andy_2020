const bodyTag = document.querySelector("body");

const wiperLeft = document.createElement("div");
wiperLeft.classList.add("wiper", "wiper-left");
bodyTag.appendChild(wiperLeft);

const wiperRight = document.createElement("div");
wiperRight.classList.add("wiper", "wiper-right");
bodyTag.appendChild(wiperRight);

// init Barba
barba.init({
    transitions: [
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
                    .set( wiperLeft, { y: "-110%" } )
                    .set( wiperRight, { y: "-110%" } )
                    .to( current.container, { opacity: 0 }, 0 )
                    .to( wiperLeft, { y: "0%", ease: "power3.inOut", duration: .5 }, .25 )
                    .to( wiperRight, { y: "0%", ease: "power3.inOut", duration: .5 }, .375 );
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
                    .to(next.container, { opacity: 1 }, .875 )
                    .to(wiperLeft, { y: "110%", ease: "power3.inOut", duration: .5 }, .5 )
                    .to(wiperRight, { y: "110%", ease: "power3.inOut", duration: .5 }, .675 );
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