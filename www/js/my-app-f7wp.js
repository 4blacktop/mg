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


// Templates using Template7 template engine
// myApp.homeTemplate = Template7.compile($$('#home-page').html()); // home page loads by default and looks like static
myApp.categoryTemplate = Template7.compile($$('#category-page').html());
myApp.postTemplate = Template7.compile($$('#post-page').html());


// Add main View
var mainView = myApp.addView('.view-main', {
    // domCache: true// Enable Dom Cache so we can use all inline pages
});


// Call onDeviceReady when PhoneGap is loaded.
// At this point, the document has loaded but phonegap-1.0.0.js has not.
// When PhoneGap is loaded and talking with the native device,
// it will call the event deviceready.
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() { // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
	document.addEventListener("backbutton", onBackKeyDown, false); // Register the event listener backButton
}

function onBackKeyDown() { // Handle the back button
	if(mainView.activePage.name == "home"){ navigator.app.exitApp(); }
	else { mainView.router.back(); }
}


// alert code 1st home  ====================================
$$('.alert-text-title').on('click', function () {
    myApp.alert(mainView.activePage.name, 'Home!');
});

/* $$('.demo-progressbar-infinite-multi-overlay .button').on('click', function () {
    var container = $$('body');
    if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
    myApp.showProgressbar(container, 'multi');
    setTimeout(function () {
        myApp.hideProgressbar();
    }, 5000);
}); */







// Click event 1st home on link to Category List Page
$$('.load-dynamic-page-category').on('click', function(){
	var catid = $$(this).attr('data-catid');
	var categoryUrl = 'http://27biletov.ru/wp-json/wp/v2/posts?filter[cat]='+catid;
	console.log( "catid:" + catid + "; carURL: " + categoryUrl);
	
	var container = $$('body');
    if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
    myApp.showProgressbar(container, 'multi');
	
	$$.getJSON(categoryUrl, function (json) {
	console.log( json );
	var pageContent = myApp.categoryTemplate(json);
	
	myApp.hideProgressbar();
	
	mainView.loadContent(pageContent);
	});
});

// Click event on link to Post Page 
$$('.load-dynamic-page-post').on('click', function(){
	var postid = $$(this).attr('data-postid');
	var postUrl = 'http://27biletov.ru/wp-json/wp/v2/posts/'+postid;
	console.log( "postid:" + postid + "; postURL: " + postUrl);
	
	var container = $$('body');
    if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
    myApp.showProgressbar(container, 'multi');
	
	// $$.getJSON(postUrl, function (json) {
	// console.log( json );
	// var pageContent = myApp.postTemplate(json);
	
	
	$$.getJSON(postUrl, function (json) {
	var stringified = JSON.stringify(json).replace( /<div role=\\\"form\\\"[\s\S]*wpcf7-display-none\\\"><\/div><\/form><\/div>/gm, "" );
	var noform = JSON.parse(stringified);
	var pageContent = myApp.postTemplate(noform);
	
	myApp.hideProgressbar();
	
	mainView.loadContent(pageContent);
	});
});


// Initializing Home Page ====================================
myApp.onPageInit('home',function(page){
	$$(page.container).on('click','.alert-text-title',function(){
		myApp.alert(mainView.activePage.name, 'Home!');
	});
	
	
	
	// Click event 1st home on link to Category List Page
	$$('.load-dynamic-page-category').on('click', function(){
		var catid = $$(this).attr('data-catid');
		var categoryUrl = 'http://27biletov.ru/wp-json/wp/v2/posts?filter[cat]='+catid;
		console.log( "catid:" + catid + "; carURL: " + categoryUrl);
		
		var container = $$('body');
		if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
		myApp.showProgressbar(container, 'multi');
		
		$$.getJSON(categoryUrl, function (json) {
		console.log( json );
		var pageContent = myApp.categoryTemplate(json);
		
		myApp.hideProgressbar();
		
		mainView.loadContent(pageContent);
		});
	});


	// Click event on link to Post Page 
	$$('.load-dynamic-page-post').on('click', function(){
		var postid = $$(this).attr('data-postid');
		var postUrl = 'http://27biletov.ru/wp-json/wp/v2/posts/'+postid;
		console.log( "postid:" + postid + "; postURL: " + postUrl);
		
		var container = $$('body');
		if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
		myApp.showProgressbar(container, 'multi');
		
		// removing contact form 7 code from content
		$$.getJSON(postUrl, function (json) {
		var stringified = JSON.stringify(json).replace( /<div role=\\\"form\\\"[\s\S]*wpcf7-display-none\\\"><\/div><\/form><\/div>/gm, "" );
		var noform = JSON.parse(stringified);
		var pageContent = myApp.postTemplate(noform);
		
		myApp.hideProgressbar();
		
		mainView.loadContent(pageContent);
		});
	});
});













// Initializing Category Page ====================================
myApp.onPageInit('category',function(page){
	$$(page.container).on('click','.alert-text-title',function(){
		myApp.alert(mainView.activePage.name, 'Category!');
	});
	
	
	// Click event on link to Post Page 
	$$('.load-dynamic-page-post').on('click', function(){
		var postid = $$(this).attr('data-postid');
		var postUrl = 'http://27biletov.ru/wp-json/wp/v2/posts/'+postid;
		console.log( "postid:" + postid + "; postURL: " + postUrl);
		
		var container = $$('body');
		if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
		myApp.showProgressbar(container, 'multi');
		
	$$.getJSON(postUrl, function (json) {
	var stringified = JSON.stringify(json).replace( /<div role=\\\"form\\\"[\s\S]*wpcf7-display-none\\\"><\/div><\/form><\/div>/gm, "" );
	var noform = JSON.parse(stringified);
	var pageContent = myApp.postTemplate(noform);
		
		myApp.hideProgressbar();
		
		mainView.loadContent(pageContent);
		});
	});
	
});






// Initializing Post Page ====================================
myApp.onPageInit('post',function(page){
	// console.log( $$(page));
	// console.log( page);
	
	$$(page.container).on('click','.alert-text-title',function(){
		myApp.alert(mainView.activePage.name, 'Post!');
	});
	
/* 	window.onscroll = function(ev) {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			// you're at the bottom of the page
			alert("you're at the bottom of the page");
		}
	}; */
});




// Initializing Buyform Page ====================================
myApp.onPageInit('buyform',function(page){
	var linkurl = page.query.linkurl;
	var linktitle = page.query.linktitle;
	document.getElementById("inputurl").value = linkurl;
	document.getElementById("inputtitle").value = linktitle;
	console.log( 'linkurl: ' + linkurl);
	console.log( 'linktitle: ' + linktitle);
	
	
// initial settings for toggle and submit button
$$('div.rowsubmit').show();
$$('input[type="checkbox"]').prop('checked', true);
// $$('input.name').focus(); // don't work
// document.getElementById("name").focus(); // input gets focus, but soft keyboard don't open

/* // this whole thing didn't work, only detects keyCode = 13. Project suspended
// http://stackoverflow.com/questions/23887544/how-to-trigger-a-tab-when-user-presses-enter
$$('input[type="text"]').on("keydown",function(event){
   if (event.keyCode == 9) {
	   // myApp.alert('keyCode == 9! you got tab i.e "NEXT" Btn.');
	   //you got tab i.e "NEXT" Btn
   }
   if (event.keyCode == 13) {
	   //you got enter i.e "GO" Btn
	   myApp.alert('keyCode == 13! you got enter i.e "GO" Btn.');
			var inputs = $(this).parents("form").eq(0).find(":input:visible:not(:disabled):not([readonly])");
			var idx = inputs.index(this);
			if (idx == inputs.length - 1) {
				idx = -1;
			} else {
				inputs[idx + 1].focus(); // handles submit buttons
			}
			try {
				inputs[idx + 1].select();
			}
			catch (err) {
				// handle objects not offering select
			}
   } 

});*/


// onchange event processing
$$('input[type="checkbox"]').on('keyup keydown change', function (e) { 
	var isChecked = $$('input[type="checkbox"]').prop('checked');
	if(isChecked) {
		$$('div.rowsubmit').show();
	}
	else {
		$$('div.rowsubmit').hide();
	}
	});
				
	//=====================================================================================================================================================			
	//=====================================================================================================================================================			
	//=====================================================================================================================================================	
	/* 
	// 1st variant
	//confirm dialog on buyform page
	$$('.confirm-title-ok-cancel').on('click', function () {
		var idName = document.getElementById('name').value;
		var idTel = document.getElementById('tel').value;
		myApp.confirm(idTel, idName + ',<br />Вы правильно ввели телефон?', 
			function () {	
			//stackoverflow solution: var form = document.getElementById("form-id"); document.getElementById("your-id").addEventListener("click", function () { form.submit(); });  
				document.getElementById("buyformid").submit();
				
			},
			function () {
				myApp.alert('Введите правильный номер телефона, пожалуйста.');
			}
		);
	});   
	 */			
				
	//=====================================================================================================================================================			
	//=====================================================================================================================================================			
	//=====================================================================================================================================================	


	// ajax form submit error processing
	$$('form.ajax-submit').on('submitted', function (e) {
	 myApp.alert('Спасибо! Ваша заявка уже обрабатывается операторами.');
	 // mainView.router.loadPage("thanks.html"); // redirect to Thanks page
	 mainView.router.back({url: 'index.html', force: true});
	 // console.log(e.detail.data);
	});
			
	$$('form.ajax-submit').on('submitError', function (e) {
	 myApp.alert('Ошибка отправки формы. Сообщите, пожалуйста, нажав иконку телефона на главной странице. Спасибо.');
	 mainView.router.back({url: 'index.html', force: true});
	 // console.log(e.detail.data);
	});

	//confirm dialog on buyform page
	$$('.confirm-title-ok-cancel').on('click', function () {
		var idName = document.getElementById('name').value;
		var idTel = document.getElementById('tel').value;
		myApp.confirm(idTel, idName + ',<br />Вы правильно ввели телефон?', 
			function () {
				$$('form.ajax-submit').trigger('submit'); // form sends via old button, but ajax timeout problem!!!
			},
			function () {
				// myApp.alert('Введите правильный номер телефона, пожалуйста.');
			}
		);
	});   	
	
});


