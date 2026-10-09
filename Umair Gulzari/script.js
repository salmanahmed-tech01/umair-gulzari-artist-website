/* =========================================================
   UMAIR GULZARI — ARTIST PORTFOLIO
   FINAL MERGED JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. PAGE SYSTEM
    ===================================================== */

    const pages = document.querySelectorAll(".site-page");
    const navigationLinks = document.querySelectorAll("[data-page]");

    const validPages = [
        "home",
        "gallery",
        "collection",
        "about",
        "detail-1",
        "detail-2",
        "detail-3",
        "detail-4",
        "detail-5",
        "detail-6"
    ];

    let currentPage = "home";


    /* =====================================================
       02. SHOW PAGE
    ===================================================== */

    function showPage(pageName, updateHistory = true) {

        /* If invalid page, go home */

        if (!validPages.includes(pageName)) {
            pageName = "home";
        }


        const selectedPage =
            document.getElementById(
                "page-" + pageName
            );


        /* Safety check */

        if (!selectedPage) {

            pageName = "home";

            const homePage =
                document.getElementById("page-home");

            if (!homePage) {
                return;
            }

            homePage.classList.add("active-page");

        }


        /* Hide all pages */

        pages.forEach((page) => {

            page.classList.remove(
                "active-page"
            );

            page.setAttribute(
                "aria-hidden",
                "true"
            );
        });


        /* Show selected page */

        const activePage =
            document.getElementById(
                "page-" + pageName
            );


        if (!activePage) {
            return;
        }


        activePage.classList.add(
            "active-page"
        );

        activePage.setAttribute(
            "aria-hidden",
            "false"
        );


        currentPage = pageName;


        /* =================================================
           RESET SCROLL
        ================================================= */

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });


        /* =================================================
           ACTIVE NAVIGATION
        ================================================= */

        navigationLinks.forEach((link) => {

            link.classList.remove("active");

            link.removeAttribute(
                "aria-current"
            );
        });


        document
            .querySelectorAll(
                `[data-page="${pageName}"]`
            )
            .forEach((link) => {

                link.classList.add("active");

                link.setAttribute(
                    "aria-current",
                    "page"
                );
            });


        /* =================================================
           URL HASH
        ================================================= */

        if (updateHistory) {

            const newHash =
                "#" + pageName;


            if (
                window.location.hash !==
                newHash
            ) {

                history.pushState(
                    {
                        page: pageName
                    },
                    "",
                    newHash
                );
            }
        }


        /* =================================================
           SCROLL REVEAL
        ================================================= */

        prepareReveal(activePage);

        observeReveal(activePage);
    }


    /* =====================================================
       03. NAVIGATION CLICK
    ===================================================== */

    navigationLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const pageName =
                    link.getAttribute(
                        "data-page"
                    );


                if (!pageName) {
                    return;
                }


                event.preventDefault();


                showPage(
                    pageName,
                    true
                );
            }
        );

    });


    /* =====================================================
       04. BROWSER BACK / FORWARD
    ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            const pageName =
                window.location.hash
                    .replace("#", "") ||
                "home";


            showPage(
                pageName,
                false
            );
        }
    );


    /* =====================================================
       05. HASH CHANGE
    ===================================================== */

    window.addEventListener(
        "hashchange",
        () => {

            const pageName =
                window.location.hash
                    .replace("#", "") ||
                "home";


            /*
               Prevent unnecessary duplicate routing.
            */

            if (
                pageName !== currentPage
            ) {

                showPage(
                    pageName,
                    false
                );
            }
        }
    );


    /* =====================================================
       06. INITIAL PAGE
    ===================================================== */

    const initialPage =
        window.location.hash
            .replace("#", "") ||
        "home";


    showPage(
        initialPage,
        false
    );


    /* =====================================================
       07. SCROLL REVEAL
    ===================================================== */

    let revealObserver = null;


    const revealSelectors = [

        ".gallery-item",
        ".art-card",
        ".collection-cta",
        ".artist-section",
        ".philosophy-section",
        ".medium",
        ".journey-item",
        ".about-cta",
        ".product-detail-container",
        ".gallery-section .section-title",
        ".collection-header",
        ".about-header",
        ".mediums-section",
        ".journey-section"

    ];


    /* =====================================================
       ADD REVEAL CLASS
    ===================================================== */

    function addRevealClasses(page) {

        revealSelectors.forEach(
            (selector) => {

                page
                    .querySelectorAll(
                        selector
                    )
                    .forEach((element) => {

                        element.classList.add(
                            "reveal"
                        );
                    });
            }
        );
    }


    /* =====================================================
       RESET REVEAL
    ===================================================== */

    function prepareReveal(page) {

        addRevealClasses(page);


        page
            .querySelectorAll(".reveal")
            .forEach((element) => {

                element.classList.remove(
                    "is-visible"
                );
            });
    }


    /* =====================================================
       OBSERVER
    ===================================================== */

    function observeReveal(page) {

        addRevealClasses(page);


        /* Browser doesn't support observer */

        if (
            !("IntersectionObserver" in window)
        ) {

            page
                .querySelectorAll(".reveal")
                .forEach((element) => {

                    element.classList.add(
                        "is-visible"
                    );
                });

            return;
        }


        /* Remove old observer */

        if (revealObserver) {
            revealObserver.disconnect();
        }


        revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -60px 0px"
                }
            );


        page
            .querySelectorAll(
                ".reveal"
            )
            .forEach((element) => {

                revealObserver.observe(
                    element
                );
            });
    }


    /* =====================================================
       08. ARTWORK DETAIL DATA
    ===================================================== */

    const artworkData = {

        "detail-1": {
            title: "Gold Medallion Halo",
            image: "images/1.webp"
        },

        "detail-2": {
            title: "Hasbunallahu Wa Ni'mal Wakeel",
            image: "images/2.webp"
        },

        "detail-3": {
            title: "Wednesday Addams",
            image: "images/3.jpg"
        },

        "detail-4": {
            title: "Serenity Profile Study",
            image: "images/4.jpg"
        },

        "detail-5": {
            title: "Ember & Sapphire",
            image: "images/5.jpg"
        },

        "detail-6": {
            title: "Majestic Peak",
            image: "images/6.jpg"
        }

    };


    /* =====================================================
       09. DETAIL PAGE GALLERY
    ===================================================== */

    function setupDetailGallery(detailPage) {

        const mainImage =
            detailPage.querySelector(
                ".main-image-viewer img"
            );


        const thumbnails =
            detailPage.querySelectorAll(
                ".thumb-button"
            );


        const previousButton =
            detailPage.querySelector(
                ".slider-arrow.left"
            );


        const nextButton =
            detailPage.querySelector(
                ".slider-arrow.right"
            );


        /* No gallery */

        if (
            !mainImage ||
            thumbnails.length === 0
        ) {
            return;
        }


        let currentIndex = 0;


        /* =================================================
           SHOW IMAGE
        ================================================= */

        function showImage(index) {

            /* Loop backwards */

            if (index < 0) {

                index =
                    thumbnails.length - 1;
            }


            /* Loop forwards */

            if (
                index >=
                thumbnails.length
            ) {

                index = 0;
            }


            currentIndex = index;


            const selectedThumbnail =
                thumbnails[currentIndex];


            const thumbnailImage =
                selectedThumbnail.querySelector(
                    "img"
                );


            if (!thumbnailImage) {
                return;
            }


            /* Fade image */

            mainImage.style.opacity = "0";


            setTimeout(() => {

                mainImage.src =
                    thumbnailImage.src;


                mainImage.alt =
                    thumbnailImage.alt ||
                    "Umair Gulzari artwork";


                mainImage.style.opacity =
                    "1";

            }, 150);


            /* Active thumbnail */

            thumbnails.forEach(
                (thumbnail, thumbnailIndex) => {

                    thumbnail.classList.toggle(
                        "active",
                        thumbnailIndex ===
                        currentIndex
                    );
                }
            );
        }


        /* =================================================
           THUMBNAIL CLICK
        ================================================= */

        thumbnails.forEach(
            (thumbnail, index) => {

                thumbnail.addEventListener(
                    "click",
                    () => {

                        showImage(index);

                    }
                );

            }
        );


        /* =================================================
           PREVIOUS IMAGE
        ================================================= */

        if (previousButton) {

            previousButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    showImage(
                        currentIndex - 1
                    );
                }
            );
        }


        /* =================================================
           NEXT IMAGE
        ================================================= */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    showImage(
                        currentIndex + 1
                    );
                }
            );
        }


        /* =================================================
           KEYBOARD
        ================================================= */

        detailPage.addEventListener(
            "keydown",
            (event) => {

                if (
                    !detailPage.classList.contains(
                        "active-page"
                    )
                ) {
                    return;
                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    showImage(
                        currentIndex - 1
                    );
                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    showImage(
                        currentIndex + 1
                    );
                }

            }
        );


        /* First image */

        showImage(0);
    }


    /* =====================================================
       INITIALIZE DETAIL GALLERIES
    ===================================================== */

    pages.forEach((page) => {

        if (
            page.querySelector(
                ".main-image-viewer"
            ) &&
            page.querySelector(
                ".thumb-button"
            )
        ) {

            setupDetailGallery(
                page
            );
        }
    });


    /* =====================================================
       10. WHATSAPP
    ===================================================== */

    const whatsappNumber =
        "923490236351";


    function whatsappURL(message) {

        return (
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(
                message
            )
        );
    }


    /* =====================================================
       ARTWORK ENQUIRY BUTTONS
    ===================================================== */

    Object.keys(artworkData).forEach(
        (pageName) => {

            const page =
                document.getElementById(
                    "page-" + pageName
                );


            if (!page) {
                return;
            }


            const artwork =
                artworkData[pageName];


            const whatsappButtons =
                page.querySelectorAll(
                    ".whatsapp-btn"
                );


            whatsappButtons.forEach(
                (button) => {

                    const message =
                        `Hi Umair, I'm interested in the "${artwork.title}" artwork. Please share the details, price and availability.`;


                    button.href =
                        whatsappURL(
                            message
                        );


                    button.target =
                        "_blank";


                    button.rel =
                        "noopener noreferrer";
                }
            );

        }
    );


    /* =====================================================
       GENERAL WHATSAPP BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".whatsapp-float, .whatsapp"
        )
        .forEach((button) => {

            /*
               Don't overwrite artwork-specific buttons.
            */

            if (
                button.classList.contains(
                    "whatsapp-btn"
                )
            ) {
                return;
            }


            button.href =
                whatsappURL(
                    "Hi Umair, I would like to know more about your artwork and commissions."
                );


            button.target =
                "_blank";


            button.rel =
                "noopener noreferrer";
        });


    /* =====================================================
       11. GALLERY ITEM → DETAIL PAGE
    ===================================================== */

    document
        .querySelectorAll(
            ".gallery-item"
        )
        .forEach(
            (item, index) => {

                const detailNumber =
                    index + 1;


                if (
                    detailNumber < 1 ||
                    detailNumber > 6
                ) {
                    return;
                }


                /*
                   Only use automatic mapping when the
                   gallery item doesn't already have a
                   data-page value.
                */

                if (
                    !item.hasAttribute(
                        "data-page"
                    )
                ) {

                    item.setAttribute(
                        "data-page",
                        `detail-${detailNumber}`
                    );
                }


                item.style.cursor =
                    "pointer";


                item.addEventListener(
                    "click",
                    (event) => {

                        /*
                           Don't hijack buttons/links.
                        */

                        if (
                            event.target.closest(
                                "a"
                            ) ||
                            event.target.closest(
                                "button"
                            )
                        ) {
                            return;
                        }


                        const targetPage =
                            item.getAttribute(
                                "data-page"
                            );


                        if (
                            validPages.includes(
                                targetPage
                            )
                        ) {

                            showPage(
                                targetPage
                            );
                        }

                    }
                );

            }
        );


    /* =====================================================
       12. COLLECTION CARD → DETAIL
    ===================================================== */

    document
        .querySelectorAll(
            ".art-card"
        )
        .forEach(
            (card, index) => {

                const viewLink =
                    card.querySelector(
                        ".view-link"
                    );


                if (!viewLink) {
                    return;
                }


                const detailNumber =
                    index + 1;


                /*
                   If HTML already has data-page,
                   keep it.
                */

                if (
                    !viewLink.hasAttribute(
                        "data-page"
                    ) &&
                    detailNumber <= 6
                ) {

                    viewLink.setAttribute(
                        "data-page",
                        `detail-${detailNumber}`
                    );
                }


                const targetPage =
                    viewLink.getAttribute(
                        "data-page"
                    );


                if (
                    validPages.includes(
                        targetPage
                    )
                ) {

                    viewLink.href =
                        "#" + targetPage;
                }

            }
        );


    /* =====================================================
       13. BACK BUTTON
    ===================================================== */

    document
        .querySelectorAll(
            ".back-link"
        )
        .forEach((button) => {

            /*
               If the button already has data-page,
               the main navigation system handles it.
            */

            if (
                button.hasAttribute(
                    "data-page"
                )
            ) {
                return;
            }


            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    showPage(
                        "collection"
                    );
                }
            );

        });


    /* =====================================================
       14. NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(
            ".navbar"
        );


    function updateNavbar() {

        if (!navbar) {
            return;
        }


        if (
            window.scrollY > 30
        ) {

            navbar.classList.add(
                "navbar-scrolled"
            );

        } else {

            navbar.classList.remove(
                "navbar-scrolled"
            );
        }
    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();


    /* =====================================================
       15. MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );


    const navLinks =
        document.querySelector(
            ".navbar .nav-links"
        );


    if (
        menuToggle &&
        navLinks
    ) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navLinks.classList.toggle(
                        "mobile-open"
                    );


                menuToggle.classList.toggle(
                    "open",
                    isOpen
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );
            }
        );


        /* Close menu after page selection */

        navLinks.addEventListener(
            "click",
            (event) => {

                if (
                    event.target.closest(
                        "[data-page]"
                    )
                ) {

                    navLinks.classList.remove(
                        "mobile-open"
                    );


                    menuToggle.classList.remove(
                        "open"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }
        );
    }


    /* =====================================================
       16. ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            if (navLinks) {

                navLinks.classList.remove(
                    "mobile-open"
                );
            }


            if (menuToggle) {

                menuToggle.classList.remove(
                    "open"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }
    );


    /* =====================================================
       17. IMAGE LOADING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            /*
               Add lazy loading to normal images.
            */

            if (
                !image.hasAttribute(
                    "loading"
                )
            ) {

                image.setAttribute(
                    "loading",
                    "lazy"
                );
            }


            /* Image error */

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-load-error"
                    );


                    console.warn(
                        "Image could not be loaded:",
                        image.src
                    );
                }
            );
        });


    /* =====================================================
       18. HERO IMAGE PRIORITY
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero img"
        );


    if (heroImage) {

        heroImage.setAttribute(
            "loading",
            "eager"
        );


        heroImage.setAttribute(
            "fetchpriority",
            "high"
        );
    }


    /* =====================================================
       19. DETAIL IMAGE TRANSITION
    ===================================================== */

    document
        .querySelectorAll(
            ".main-image-viewer img"
        )
        .forEach((image) => {

            image.style.transition =
                "opacity 0.25s ease";
        });


    /* =====================================================
       20. REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function updateMotionPreference() {

        if (
            reducedMotion.matches
        ) {

            document.documentElement.classList.add(
                "reduced-motion"
            );

        } else {

            document.documentElement.classList.remove(
                "reduced-motion"
            );
        }
    }


    updateMotionPreference();


    if (
        reducedMotion.addEventListener
    ) {

        reducedMotion.addEventListener(
            "change",
            updateMotionPreference
        );
    }


    /* =====================================================
       21. WINDOW RESIZE
    ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(() => {

                    const activePage =
                        document.querySelector(
                            ".site-page.active-page"
                        );


                    if (activePage) {

                        observeReveal(
                            activePage
                        );
                    }

                }, 200);
        },
        {
            passive: true
        }
    );
})

    /* =====================================================
       22. GLOBAL PAGE FUNCTION
    ===================================================== */ 