/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const navbar_list = document.getElementById('navbar__list');
const btn_top = document.getElementById('btn_top');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function setActive(element, clasName) {
    //remove other
    const otherActive = document.querySelector('.' + clasName);
    if (otherActive) {
        otherActive.classList.remove(clasName)
    }
    //add active class
    element.classList.add(clasName)
}

function setActiveMenu(element, clasName) {
    //remove other
    const activeLink = document.querySelector(`a[href="#${element.getAttribute("id")}"]`);
    // console.log(activeLink);
    const actMenu = document.querySelector('.' + clasName)
    // console.log(actMenu)
    if (actMenu) {
        actMenu.classList.remove(clasName)
    }
    //add active class
    activeLink.classList.add(clasName)
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function crateNav() {
    for (let i = 0; i < sections.length; i++) {
        // console.log([i]);
        let li_section = document.createElement('li');
        li_section.innerHTML = '<a href=\'#section' + [i + 1] + '\' class =\'menu__link\' > ' + 'Section ' + [i + 1] + ' </a>';
        navbar_list.appendChild(li_section);
    }
}

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', function() {
    sections.forEach((element) => {
        if (isInViewport(element)) {
            setActive(element, 'active')
            setActiveMenu(element, 'active_menu')
        }
    })
})

// // Scroll to anchor ID using scrollTO event
//function overwrited by scrollIntoViev

/**
 * End Main Functions
 * Begin Events
 * 
 */
 
//dsiplay TOP button when user scrolls down
window.onscroll = function() {
    showUpBtn()
};

function showUpBtn() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn_top.style.display = "block";
    } else {
        btn_top.style.display = "none";
    }
}

//body works on safari for other browsers documentElement
btn_top.addEventListener('click', function() {
    document.body.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

// Build menu 
//wait till all elements are loaded
document.addEventListener("DOMContentLoaded", function() {
    crateNav();

    navbar_list.addEventListener('click', function(e) {
        e.preventDefault();
        // Scroll to section on link click
        const sectionId = e.target.getAttribute("href");
        // console.log(sectionId);
        let sectionNr = document.querySelector(sectionId);
        sectionNr.scrollIntoView({
            behavior: "smooth"
        });
    })
})

//Src: 
// https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
// http://blog.fofwebdesign.co.uk/41-add-classes-to-an-element-when-scrolled-into-viewport
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_scroll_to_top