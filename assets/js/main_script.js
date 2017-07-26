/**
 * File Name: main_script.js
 * Description: Main JavaScript File
 * @author: Analia Mok
 */

window.onload = init;

var NAV_HEIGHT;


/**
 * init - Initializes element events
 */
function init(){
    document.getElementById("menu-icon").onclick = toggleMenu;

    // Adding scrolling event listener to window
    window.addEventListener("scroll", checkPos);

    // Calculating nav height
    NAV_HEIGHT = $(".nav-container").height();

} // End of init


/**
 * toggleMenu - Toggles display state of mobile nav
 */
function toggleMenu(){
    var menu = document.getElementsByClassName("nav-container")[0]
                       .getElementsByTagName("ul")[0];

    var state = menu.style.display;

    if(state === "" || state === "none"){
        // Toggle On
        menu.style.display = "block";
    }else{
        // Toggle Off
        menu.style.display = "none";
    }

} // End of toggleMenu


/**
 * changeActiveElement - Given a position inside nav list, switches the previous
 *      active element with the new one.
 *      - Changes the id of nav list items and applies DHTML.
 *          0 - ABOUT ME
 *          1 - RESUME
 *          2 - PROJECTS
 *          3 - CONTACT
 *
 * @param navItemLocale - Array index [0, 3]
 * @return true on success; false otherwise
 */
function changeActiveElement(navItemLocale){
    // List Items inside navigation
    var navItems = document.getElementsByClassName('nav-container')[0]
        .getElementsByTagName("li");

    if(navItemLocale >= 0 || navItemLocale <= 3){
        // Changing current active element
        var currActive = document.getElementById("active");
        currActive.style.fontWeight = "500";
        currActive.style.textDecoration = "none";
        currActive.id = "";

        navItems[navItemLocale].id = "active";
        navItems[navItemLocale].style.fontWeight = "600";
        navItems[navItemLocale].style.color = "#FFF";
        navItems[navItemLocale].style.textDecoration = "underline";
        return true;
    }else{
        alert("USAGE: \'navItemLocale\' out of bounds");
        return false;
    }

} // End of changeActiveElement


/**
 * scrollTo - Given an element ID, function scrolls to the element with the
 *      specified element. Utilizes jQuery
 *
 * NOTE: I DO NOT TAKE CREDIT FOR THE jQuery portion of this code.
 * Source:
 * https://www.abeautifulsite.net/smoothly-scroll-to-an-element-without-a-jquery-plugin-2
 *
 * @param  String elementId - Id of the targeted element
 */
function scrollToElement(elementId, navItemLocale){

    var currentPos = $('html').offset().top;
    var elementPos = $("#"+elementId).offset().top;

    if(currentPos < elementPos){
        // If elementPos is higher up on page, subtract
        // 7rem ~= 112px
        elementPos -= 112;
    }else if(currentPos > elementPos){
        // Otherwise, add additional 112px
        elementPos += 112;
    }
    // Do nothing else if equal

    // Changing current active element
    //changeActiveElement(navItemLocale);

    $('html, body').animate({
        scrollTop: elementPos
    }, 900); // Shortened Animation

} // End of scrollTo


/**
 * checkPos - Compares the current position of the user to set positions of the
 *      page and changes the active nav element as necessary
 */
function checkPos(){
    //var currentPos = window.pageYOffset+112;
    var currentPos = window.scrollY;
    var offset = 115;
    //console.log("Current position: " + currentPos);
    var navPos = $(".nav-container").offset().top;

    var callToAction = $('#call-to-action').offset().top - offset;
    var resume = $('#resume').offset().top - offset;
    var projects = $('#projects').offset().top - offset;
    var contactPage = $('#contact-page').offset().top - 150;
    // console.log("callToAction: " + callToAction + "\n");
    // console.log("resume: " + resume + "\n");
    // console.log("projects: " + projects + "\n");
    // console.log("contactPage: " + contactPage + "\n");

    if(navPos < resume){
        // Change active element to "ABOUT ME"
        changeActiveElement(0);
    }else if(navPos >= resume && navPos < projects){
        // Change active element to "RESUME"
        changeActiveElement(1);
        //console.log("Projects: " + projects);
    }else if(navPos >= projects && navPos < contactPage){
        // Change active element to "PROJECTS"
        changeActiveElement(2);
        //console.log("Contact Page: " + contactPage);
    }else{
        // Change active element to "CONTACT"
        changeActiveElement(3);
    }

    console.log("Nav Pos: " + navPos + "; Contact: " + contactPage);



} // End of checkPos
