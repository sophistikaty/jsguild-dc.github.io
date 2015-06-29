console.log('bananaFoo');

// JavaScript for the sticky nav bar --

// variable defines height of header and subtracts the height
// of the main-nav id to get the height of where the toggleScroll
// function should be triggered
var headerHeight = (document.getElementById('js-header').offsetHeight - document.getElementById('js-main-nav').offsetHeight);

// sets an onscroll event listener to trigger the toggleScroll
// function on a scroll event. This is also on the body element
// but could be on any element
document.body.onscroll = toggleScroll;


function toggleScroll() {
    // if the scroll (or YOffset is less then headerHeight, keep
    // the class 'main-nav'
    if(window.pageYOffset < headerHeight ) {
        document.getElementById('js-main-nav').className = 'main-nav';
        document.getElementById('js-sticky-nav-filler').style.marginTop = 'inherit';
    // else give js-main-nav the 'triggered' class
    } else {
        document.getElementById('js-main-nav').className = 'sticky-nav';
        document.getElementById('js-sticky-nav-filler').style.marginTop = headerHeight + "px";
    }
};





// Google Maps API initialization function

function initialize() {
    // creates an object that houses all of the google
    // maps keys.
    var mapOptions = {
        center: { lat: 38.90423423481152, lng: -77.03126300000002},
        zoom: 12
        };

    // creates a new google map out of the above specs
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}

// loads that map we created above when the window gets loaded
google.maps.event.addDomListener(window, 'load', initialize);

///Content buttons & paths

// Function to send visitors to correct content based on initial button clicks
// function whoAreYou() {
    
//     console.log('listening');
//     var member = document.getElementById('member');

//     member.onclick = function go(){
//         var info = document.getElementById('info');
//         var form = document.getElementById('form');

//         //function to hide all other person classes and show class "this" (stringified) in the info and form divs
//         console.log(member);
//         console.log(this);
//         debugger

//     }
// }whoAreYou();

 // function go(person) {
 //    console.log('hey');
 //        console.log(person+' clicked');
 //    };

 // Creates an array full of objects, or users, that can visit our site.
// This makes it easier to add or remove types of visitors without having
// to change them in multiple places.

var userTypes = [{
        user     : 'Current Member',
        id       : 'js-logic-path-current-member',
        content  : '<p>You are awesome as a current member!</p><div id="attendanceAvatars"><div>',
        form     : '<a href="https://google.com">Link to a form for current members</a>'
    },
    {
        user     : 'Future Member',
        id       : 'js-logic-path-future-member',
        content  : 'You are awesome for thinking about being a member!',
        form     : '<a href="https://google.com">Link to a form for new members</a>'
    },
    {
        user     : 'Employer',
        id       : 'js-logic-path-employer',
        content  : 'You should hire all of us cause we are awesome!',
        form     : '<a href="https://google.com">Link to a form for employers</a>'
    },
    {
        user     : 'Other',
        id       : 'js-logic-path-other',
        content  : 'You are awesome...',
        form     : '<a href="https://google.com">Link to a form for other peeps</a>'
    }
];


// This is the main js function that listens for onclick events. when an
// onclick event happens, it runs contentChanger()

function triggerView(){

    // The contentChanger() function has some funky stuff going on. 'this'
    // in this context is (userTypes[i]) because we bind it in the onclick
    // function below. (See comment above the for loop).

    // The first part of the contentChanger() function has access to the
    // key value pairs of the objects in the userTypes array, and can
    // insert them into the DOM.

    function contentChanger(){
        document.getElementById('js-user').innerHTML    = this.user;
        document.getElementById('js-content').innerHTML = this.content;
        document.getElementById('js-form').innerHTML    = this.form;
    }

    // Here we are looping through our array of objects, userTypes. When
    // any of these elements are clicked, we bind that object to the
    // contentChanger() function. This way it can access its key value
    // pairs when we want to insert the HTML into the DOM.

    for (var i = 0; i < userTypes.length; i++) {
        document.getElementById(userTypes[i].id).onclick = contentChanger.bind(userTypes[i]);
    }
}

// start listening for that sheezy

triggerView();

//Carolyn's test


// Tabletop Spreadsheet Functions

window.onload = function() { init() };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1J6B8-GfEcRgFxtdhPNqPOoIow2nbTP7LgML3YsnB8U0/pubhtml?gid=0&single=true';

function init() {

    Tabletop.init( { key: public_spreadsheet_url,
        callback: showInfo,
        simpleSheet: true } )
}

var tabletopData;

function showInfo(data, tabletop) {

    tabletopData = data;

    selectContent();
}

tabletopData = JSON.stringify(tabletopData);


function selectContent () {
    console.log('tabletopData is ', tabletopData);

    var personName = tabletopData.map(function (item) { 

        return item["Name"]; 
    }

    ).map( function (content, item) { 

        var index = tabletopData[item];
        // checkPage(item);
        return "<p>"+item+"</p>" 

    }).join('');

    document.getElementById('attendanceAvatars').innerHTML = personName;

};


