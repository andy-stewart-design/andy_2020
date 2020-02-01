// tell Barba to use the css module
barba.use(barbaCss);

// init Barba
barba.init({
    transitions: [
        {
            name: 'fade',
            beforeEnter ({ current, next, trigger }) {
                const headerLinks = document.querySelectorAll('header a');

                headerLinks.forEach(link => {
                    link.classList.remove('selected');
                })

                window.scrollTo ({
                    top: 0
                })
            }
        }
    ]
});