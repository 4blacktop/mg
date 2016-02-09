// Initialize your app
var myApp = new Framework7({
	template7Pages: true,
	material: true, //enable Material theme
	modalTitle: 'MG',
	pushstate: true,
	modalButtonOk: 'Да',
	modalButtonCancel: 'Нет',
	// allowDuplicateUrls: true, // allow loading of new pages that have same url as currently "active" page in View
});
	
// Export selectors engine
var $$ = Dom7;
// var jsonURL = 'http://scr.ru/mg/www/php/json680000.txt';
var jsonURL = 'http://27podarkov.ru/mg/json680000.txt';

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
		
	});
	myApp.pullToRefreshDone();// When loading done, we need to reset it
};


// Pull to refresh content
var ptrContent = $$('.pull-to-refresh-content');
ptrContent.on('refresh', function (e) { // Add 'refresh' listener on it
	// myApp.alert('buildHomeHTML', 'Home!');
	setTimeout(function () {
		// console.log('buildHomeHTML');
		myApp.buildHomeHTML();
        myApp.pullToRefreshDone();
    // }, 1000);
    });
});


myApp.buildHomeHTML(); // Load content on startup
// navigator.splashscreen.hide(); // Phonegap splashscreen plugin hide picture

myApp.onPageInit('sendnews',function(page){
	document.getElementById("imageurl").value = null; // erasing any saved value due to autosave form
	// myApp.alert(document.getElementById("imageurl").value,'imageurl');
	// myApp.alert('imageurl');
});

/* 
myApp.onPageInit('about',function(page){
	// myApp.alert(document.getElementById("imageurl").value,'imageurl');
	// document.getElementById("imageurl").value = ''; // erasing any saved value due to autosave form
	myApp.alert('about');
}); */

// Initializing Buyform Page ====================================
/* myApp.onPageInit('sendnews',function(page){
	var imgUrl = page.query.linktitle;
	document.getElementById("imageurl").value = linkurl;
	// console.log( 'linkurl: ' + linkurl);
	// console.log( 'linktitle: ' + linktitle);
	
	
// initial settings for toggle and submit button
// $$('div.rowsubmit').show();
// $$('input[type="checkbox"]').prop('checked', true);


	// ajax form submit error processing
	$$('form.ajax-submit').on('submitted', function (e) {
		myApp.alert('Спасибо! Ваша заявка уже обрабатывается операторами.');
		mainView.router.back({url: 'index.html', force: true});
	});
			
	$$('form.ajax-submit').on('submitError', function (e) {
		myApp.alert('Ошибка отправки формы. Сообщите, пожалуйста, нажав иконку телефона на главной странице. Спасибо.');
		mainView.router.back({url: 'index.html', force: true});
		// console.log(e.detail.data);
	});

}); */


/**  * Take picture with camera  */
function takePicture() {
	navigator.camera.getPicture(
		function(uri) {
			var img = document.getElementById('camera_image');
			img.style.visibility = "visible";
			img.style.display = "block";
			img.src = uri;
			// document.getElementById('camera_status').innerHTML = "Success";
		},
		function(e) {
			myApp.alert('Не удалось сделать фото<br />Попробуйте снова, пожалуйста.' + e);
			// console.log("Error getting picture: " + e);
			// document.getElementById('camera_status').innerHTML = "Error getting picture.";
		},
		{ quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI});
};



/**  * BEST Select picture from album  */
function selectPicture() {
	
	navigator.camera.getPicture(
		function(uri) {
			if (uri.substring(0,21)=="content://com.android") {
				photo_split=uri.split("%3A");
				uri="content://media/external/images/media/"+photo_split[1];
			}
			myApp.alert('url SAVEDPHOTOALBUM:<br />' + uri);
			var img = document.getElementById('camera_image');
			img.style.visibility = "visible";
			img.style.display = "block";
			img.src = uri;
			// document.getElementById('camera_status').innerHTML = "Success";

		},
		function(e) {
			// console.log("Error getting picture: " + e);
			// document.getElementById('camera_status').innerHTML = "Error getting picture.";
			myApp.alert('Не удалось сделать фото<br />Попробуйте снова, пожалуйста.<br />' + e);
		},
		{ destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM});
};





/**  * Upload current picture  */
function uploadPicture() {
	
	// Get URI of picture to upload
	var img = document.getElementById('camera_image');
	var imageURI = img.src;
	var newstext = document.getElementById('newstext').value;
	
	if (!newstext) {
		myApp.alert('Пожалуйста, введите текст новости.','Ошибка!');
		// document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
		return;
	}
	
	// Check if photo is made, if text news only is allowed, skip this check
	if (!imageURI || (img.style.display == "none")) {
		myApp.alert('imageURI BEFORE:<br />' + imageURI);
		
		if (uri.substring(0,21)=="content://com.android") {
				photo_split=uri.split("%3A");
				uri="content://media/external/images/media/"+photo_split[1];
			}
		
		myApp.alert('imageURI AFTER:<br />' + imageURI);
		
	// if (!imageURI) {
		// myApp.alert('Вы забыли сделать фото!<br />А ведь так новость читать гораздо интереснее.');
		// document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
		// document.getElementById("imageurl").value = options.fileName;
		
		var idName = document.getElementById('name').value;
		// myApp.confirm('К этой новости нет изображения.<br />Хотите сделать или выбрать фото?'){
		myApp.confirm(idName, 'К этой новости нет изображения.<br />Хотите сделать или выбрать фото?', 
			function () {
				return;
			},
			function () {
				$$('form.ajax-submit').trigger('submit'); 
				myApp.alert('Новость отправлена!<br />Благодарим Вас!','Спасибо!');
				document.getElementById("imageurl").value = null;
				return;
			}
		);
		
		
		return;
	}
	
	
	
	// Verify server has been entered
	// server = document.getElementById('serverUrl').value;
	server = 'http://27podarkov.ru/mg/upload.php';
	if (server) {
		
		// Preloader indicator with timeout
		myApp.showIndicator();
			setTimeout(function () {
				myApp.hideIndicator();
			}, 2000);
		
		// Specify transfer options
		var options = new FileUploadOptions();
		options.fileKey="file";
		options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
		options.mimeType="image/jpeg";
		options.chunkedMode = false;
		
		myApp.alert('options.fileName:<br />' + options.fileName);

		// Transfer picture to server
		var ft = new FileTransfer();
		ft.upload(imageURI, server, function(r) {
			// myApp.showPreloader('Отправляю новость');
			// document.getElementById('camera_status').innerHTML = "Upload successful: "+r.bytesSent+" bytes uploaded.";  
			document.getElementById("imageurl").value = options.fileName;
			$$('form.ajax-submit').trigger('submit');
			// myApp.hidePreloader();
			myApp.alert('Новость отправлена!<br />Благодарим Вас!<br />filename: '+options.fileName, r.bytesSent);
			document.getElementById("imageurl").value = null;
          	
		}, function(error) {
			// document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;            	
			myApp.hidePreloader();
			myApp.alert('Произошла неизвестная ошибка. Пожалуйста, попробуйте снова.<br />'+error.code);
		}, options);
	}
}

/**
 * View pictures uploaded to the server
 */
function viewUploadedPictures() {
	
	// Get server URL
	server = document.getElementById('serverUrl').value;
	if (server) {
		
		// Get HTML that lists all pictures on server using XHR	
		var xmlhttp = new XMLHttpRequest();

		// Callback function when XMLHttpRequest is ready
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState === 4){

				// HTML is returned, which has pictures to display
				if (xmlhttp.status === 200) {
					document.getElementById('server_images').innerHTML = xmlhttp.responseText;
				}

				// If error
				else {
					document.getElementById('server_images').innerHTML = "Error retrieving pictures from server.";
				}
			}
		};
		xmlhttp.open("GET", server , true);
		xmlhttp.send();       	
	}	
}
    



/**  * Select picture from library  */
/* function selectPictureLibrary() {
	navigator.camera.getPicture(
		function(uri) {
			myApp.alert('url PHOTOLIBRARY:<br />' + uri);
			var img = document.getElementById('camera_image');
			img.style.visibility = "visible";
			img.style.display = "block";
			img.src = uri;
			// document.getElementById('camera_status').innerHTML = "Success";
		},
		function(e) {
			// console.log("Error getting picture: " + e);
			// document.getElementById('camera_status').innerHTML = "Error getting picture.";
			myApp.alert('Не удалось сделать фото<br />Попробуйте снова, пожалуйста.<br />' + e);
		},
		{ destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
}; */

/**  * Select picture from album  */
/* function selectPictureAlbum() {
	
	navigator.camera.getPicture(
		function(uri) {
			myApp.alert('url SAVEDPHOTOALBUM:<br />' + uri);
			var img = document.getElementById('camera_image');
			img.style.visibility = "visible";
			img.style.display = "block";
			img.src = uri;
			// document.getElementById('camera_status').innerHTML = "Success";

		},
		function(e) {
			// console.log("Error getting picture: " + e);
			// document.getElementById('camera_status').innerHTML = "Error getting picture.";
			myApp.alert('Не удалось сделать фото<br />Попробуйте снова, пожалуйста.<br />' + e);
		},
		{ destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM});
}; */


/**  * NEW2 Select picture from album  */
/* function selectPictureAlbum() {
	
	navigator.camera.getPicture(
		function(uri) {
			if (uri.substring(0,21)=="content://com.android") {
				photo_split=uri.split("%3A");
				uri="content://media/external/images/media/"+photo_split[1];
			}
			myApp.alert('url SAVEDPHOTOALBUM:<br />' + uri);
			var img = document.getElementById('camera_image');
			img.style.visibility = "visible";
			img.style.display = "block";
			img.src = uri;
			// document.getElementById('camera_status').innerHTML = "Success";

		},
		function(e) {
			// console.log("Error getting picture: " + e);
			// document.getElementById('camera_status').innerHTML = "Error getting picture.";
			myApp.alert('Не удалось сделать фото<br />Попробуйте снова, пожалуйста.<br />' + e);
		},
		{ destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM});
}; */


/**  * NEW Select picture from album  */
/* function selectPictureAlbum() {
	navigator.camera.getPicture(
		function (uri) {

		window.resolveLocalFileSystemURI(uri, 
			function( fileEntry){
				// alert("got image file entry: " + fileEntry.fullPath);
				myApp.alert('url SAVEDPHOTOALBUM:<br />' + fileEntry.fullPath);
				var img = document.getElementById('camera_image');
				img.style.visibility = "visible";
				img.style.display = "block";
				img.src = fileEntry.fullPath;
			},
			function() {
				//error
			}
			);
		},
	function(e) {
		myApp.alert('Не удалось сделать фото<br />Попробуйте снова, пожалуйста.<br />' + e);
	},
	{ destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM});
}; */




/* navigator.camera.getPicture(function (fileURI) {

    window.resolveLocalFileSystemURI(fileURI, 
        function( fileEntry){
            alert("got image file entry: " + fileEntry.fullPath);
        },
        function(){//error}
    );

}, function (){
// handle errors
}, {
    destinationType: window.Camera.DestinationType.FILE_URI,
    sourceType: window.Camera.PictureSourceType.PHOTOLIBRARY,
    mediaType: window.Camera.MediaType.ALLMEDIA
}); */








	// navigator.camera.getPicture(
		// function(imageData) {
		// window.resolveLocalFileSystemURI(imageData, function(fileEntry) {
		// fileEntry.file(function(fileObj) {
		// },
	
	// onFail, 
		
	// { quality : 50,destinationType : Camera.DestinationType.FILE_URI }); 








