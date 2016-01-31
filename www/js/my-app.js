// Initialize your app
var myApp = new Framework7({
	template7Pages: true,
	material: true, //enable Material theme
	modalTitle: 'MG',
	modalButtonOk: 'Да',
	modalButtonCancel: 'Нет',
});
	
// Export selectors engine
var $$ = Dom7;
// var jsonURL = 'http://scr.ru/mg/www/js/jsoncars.txt';
var jsonURL = 'http://scr.ru/mg/www/php/jsontest.txt';

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
 
// Add main View
var mainView = myApp.addView('.view-main', {
	// domCache: true //enable inline pages
});

// Call onDeviceReady when PhoneGap is loaded. At this point, the document has loaded but phonegap-1.0.0.js has not. When PhoneGap is loaded and talking with the native device, it will call the event deviceready.
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() { // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
	document.addEventListener("backbutton", onBackKeyDown, false); // Register the event listener backButton
}
function onBackKeyDown() { // Handle the back button
	if(mainView.activePage.name == "home"){ navigator.app.exitApp(); }
	else { mainView.router.back(); }
}

// Get all text content from JSON and redirect to new page
$$.getJSON(jsonURL, function (json) {
	Template7.data = json;
	console.log( Template7.data );
	mainView.router.load({
		url: 'tabs.html',
		context: Template7.data
		});
});
	
	
// Initializing Post Page ====================================
myApp.onPageInit('post',function(page){
	// console.log( $$(page));
	// console.log( page);
		// myApp.alert(mainView.activePage.name, 'Post!');
	console.log( Template7.data);
	// console.log(Template7.data.news.all.posts)
	
	// $$(page.container).on('click','.alert-text-title',function(){
		// myApp.alert(mainView.activePage.name, 'Post!');
	// });
	
/* 	window.onscroll = function(ev) {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			// you're at the bottom of the page
			alert("you're at the bottom of the page");
		}
	}; */
});
  
  