// Initialize your app
var myApp = new Framework7({
    // animateNavBackIcon:true,//ios only
    swipePanel: 'left',
	// pushstate: true, // for h/w back button support MAYBE! KOSTYL
	swipePanelActiveArea: 50,
	material: true, //enable Material theme
	allowDuplicateUrls: true, // allow loading of new pages that have same url as currently "active" page in View
	modalTitle: 'MG',
	modalButtonOk: 'Да',
	modalButtonCancel: 'Нет',
	
	
});
	
// Export selectors engine
var $$ = Dom7;

// Ajax timeout
$$.ajaxSetup({
	crossDomain: true, // don't know if it's working for CORS properly, on localhost - CORS failed during ajax form submit, regular submit ok
   timeout: 9000, // 5 seconds
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
    // domCache: true// Enable Dom Cache so we can use all inline pages
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


// Build tabs on home page
myApp.buildTabsHTML = function () {
    var html = '<p>Новости</p><p>Новость1</p><p>Новость2</p>';
    $$('.content-news').html(html);
	
	// var newsURL = 'http://www.moigorod.ru/m/news/';
	
	// $$.get(newsURL, null, function (data) {
		// console.log('Load was performed');
		// $$('.content-news').html(data);
	// });
	
};

// Update html and weather data on app load
myApp.buildTabsHTML();