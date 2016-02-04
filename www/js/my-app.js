// Initialize your app
var myApp = new Framework7({
	template7Pages: true,
	material: true, //enable Material theme
	modalTitle: 'MG',
	modalButtonOk: 'Да',
	modalButtonCancel: 'Нет',
	// allowDuplicateUrls: true, // allow loading of new pages that have same url as currently "active" page in View
});
	
// Export selectors engine
var $$ = Dom7;
// var jsonURL = 'http://scr.ru/mg/www/php/json680000.txt'; 
var jsonURL = 'http://27podarkov.ru/mg-json/json680000.txt';

// Ajax setting for timeout
$$.ajaxSetup({
	cache: false,
	crossDomain: true, // don't know if it's working for CORS properly, on localhost - CORS failed during ajax form submit, regular submit ok
	timeout: 9000, // 9 seconds, same as timeout in  ptrContent.on setTimeout
	error: function(xhr) {
	myApp.hideProgressbar();
	var status = xhr.status;
	myApp.alert( "Проверьте подключение к Интернету" , 'Ошибка сети', function () {
		$$(".back").click();
		});
	}
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



// Select, Compile and render template
myApp.compiledNewsTemplate = Template7.compile(homeTemplate = $$('#news-template').html());// Select, Compile and render
// myApp.compiledSaleTemplate = Template7.compile(homeTemplate = $$('#sale-template').html());// Select, Compile and render
myApp.compiledCinemaTemplate = Template7.compile(homeTemplate = $$('#cinema-template').html());// Select, Compile and render
myApp.compiledEventsTemplate = Template7.compile(homeTemplate = $$('#events-template').html());// Select, Compile and render
myApp.compiledCurrencyTemplate = Template7.compile(homeTemplate = $$('#currency-template').html());// Select, Compile and render

// Add main View
var mainView = myApp.addView('.view-main', {
});


myApp.buildHomeHTML = function () {
	$$.getJSON(jsonURL, function (json) {
		Template7.data = json;
		// $$('.news-list ul').html(''); // Insert blank data into page
		
		// Insert data into template
		var newsHtml = myApp.compiledNewsTemplate(json);
		// var saleHtml = myApp.compiledSaleTemplate(json);
		var cinemaHtml = myApp.compiledCinemaTemplate(json);
		var eventsHtml = myApp.compiledEventsTemplate(json);
		var currencyHtml = myApp.compiledCurrencyTemplate(json);

		// Insert HTML data into page
		$$('.news-list ul').html(newsHtml);
		// $$('.sale-list ul').html(saleHtml);
		$$('.cinema-list ul').html(cinemaHtml);
		$$('.events-list ul').html(eventsHtml);
		$$('.currency-list ul').html(currencyHtml);
		
		myApp.pullToRefreshDone();
	});
};


// Pull to refresh content
var ptrContent = $$('.pull-to-refresh-content');
ptrContent.on('refresh', function (e) { // Add 'refresh' listener on it
	// myApp.alert('buildHomeHTML', 'Home!');
	setTimeout(function () {
		// console.log('buildHomeHTML');
		myApp.buildHomeHTML();
        
        myApp.pullToRefreshDone();// When loading done, we need to reset it
    // }, 2000);
    });
});

myApp.buildHomeHTML();
navigator.splashscreen.hide(); // Phonegap splashscreen plugin hide picture



// $$('.demo-progressbar-infinite-multi-overlay .button').on('click', function () {
    // var container = $$('body');
    // if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
    // myApp.showProgressbar(container, 'multi');
    // setTimeout(function () {
        // myApp.hideProgressbar();
    // }, 5000);
// });
































/* 	
	// var mySwiper = $$('.page')[0].swiper;
	
	  // var mySwiper = myApp.swiper('.page'); // found
	  // var mySwiper = $$('.page')[0].swiper;
	  var mySwiper = $$('.swiper-container').swiper;
	mySwiper.update();
	console.log( mySwiper);
	 */
	
// myApp.onPageBeforeInit('post',function(page){
// myApp.onPageBeforeAnimation('post',function(page){
// console.log(  'post page');
// });

/* 
// Initializing Home Page ====================================
myApp.onPageBeforeAnimation('home',function(page){
	console.log( 'myApp.onPageBeforeAnimation home');

	// Build details page
	// $$('.places-list').on('click', 'a.item-link', function (e) {
	
	// });

});
 */





















	
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
  