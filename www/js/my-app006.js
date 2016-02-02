// Initialize your app
var myApp = new Framework7({
	// template7Pages: true,
	material: true, //enable Material theme
	modalTitle: 'MG',
	modalButtonOk: 'Да',
	modalButtonCancel: 'Нет',
});
	
// Export selectors engine
var $$ = Dom7;
var jsonURL = 'http://scr.ru/mg/www/php/json680000.txt';
// var jsonURL = 'http://27podarkov.ru/json680000.txt';

// Ajax setting for timeout
$$.ajaxSetup({
	crossDomain: true, // don't know if it's working for CORS properly, on localhost - CORS failed during ajax form submit, regular submit ok
	timeout: 9000, // 9 seconds
	error: function(xhr) {
	myApp.hideProgressbar();
	var status = xhr.status;
	myApp.alert( "Проверьте подключение к Интернету" , 'Ошибка сети', function () {
		$$(".back").click();
		});
	}
});

// Urban Dic version
// var homeTemplate = $$('#home-template').html();// Select Template
// var compiledHomeTemplate = Template7.compile(homeTemplate);// Compile and render

// Select, Compile and render template
myApp.compiledHomeTemplate = Template7.compile(homeTemplate = $$('#home-template').html());
myApp.compiledPostTemplate = Template7.compile(homeTemplate = $$('#post-template').html());// Select, Compile and render

// Add main View
var mainView = myApp.addView('.view-main', {
});

// Back Button! Call onDeviceReady when PhoneGap is loaded. At this point, the document has loaded but phonegap-1.0.0.js has not. When PhoneGap is loaded and talking with the native device, it will call the event deviceready.
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() { // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
	document.addEventListener("backbutton", onBackKeyDown, false); // Register the event listener backButton
}
function onBackKeyDown() { // Handle the back button
	if(mainView.activePage.name == "home"){ navigator.app.exitApp(); }
	else { mainView.router.back(); }
}

myApp.buildHomeHTML = function () {
	// Get all text content from JSON and redirect to new page
	$$.getJSON(jsonURL, function (json) {
		Template7.data = json;
		console.log( Template7.data );
		console.log( json);
		$$('#content-wrap').html(myApp.compiledHomeTemplate(json));
	});
};

myApp.buildHomeHTML();

// Build details page
$$('.list-block').on('click', 'a.item-link', function (e) {
	
			console.log( Template7.data );
		console.log( json);
    // var woeid = $$(this).attr('data-woeid');
    // var item;
    // var weatherData = JSON.parse(localStorage.w7Data);
    // for (var i = 0; i < weatherData.length; i++) {
        // if (weatherData[i].woeid === woeid) item = weatherData[i];
    // }
    // var pageContent = myApp.detailsTemplate(item);
    // mainView.loadContent(pageContent);
	
	
	// $$('#content-wrap').html(myApp.compiledPostTemplate(Template7.data.news.all.posts));
	// data-context-name="events.all.posts.{{@index}}"
});











	
// progressbar strange working
// var container = $$('body');
// if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
// myApp.showProgressbar(container, 'multi');
// myApp.hideProgressbar();
		
	
// myApp.onPageInit('home',function(page){
	// console.log( 'init home' );
	// });
	
/* 	
// Initializing Post Page ====================================
myApp.onPageInit('post',function(page){
	console.log( 'post');
	// console.log( $$(page));
	// console.log( page);
		// myApp.alert(mainView.activePage.name, 'Post!');
	// console.log( Template7.data);
	// console.log(Template7.data.news.all.posts)
	
	// $$(page.container).on('click','.alert-text-title',function(){
		// myApp.alert(mainView.activePage.name, 'Post!');
	// });
	
	window.onscroll = function(ev) {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			// you're at the bottom of the page
			alert("you're at the bottom of the page");
		}
	}; 
});
*/
  