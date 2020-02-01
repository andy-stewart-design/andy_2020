// tell Barba to use the css module
barba.use(barbaCss);

// init Barba
barba.init({
    transitions: [
        {
            name: 'fade',
            beforeEnter () {
                window.scrollTo ({
                    top: 0
                })
            }
        }
    ]
});