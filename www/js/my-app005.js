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
    // }, 3000);
    });
});

myApp.buildHomeHTML(); // Load content on startup
navigator.splashscreen.hide(); // Phonegap splashscreen plugin hide picture


















/** * Take picture with camera  */
function takePicture() {
	navigator.camera.getPicture(
		function(uri) {
			var img = document.getElementById('camera_image');
			img.style.visibility = "visible";
			img.style.display = "block";
			img.src = uri;
			document.getElementById('camera_status').innerHTML = "Успешно";
		},
		function(e) {
			console.log("Error getting picture: " + e);
			document.getElementById('camera_status').innerHTML = "Ошибка! Не удалось сделать фото.";
		},
		{ 
		quality: 50,
		saveToPhotoAlbum: true,
		destinationType: navigator.camera.DestinationType.FILE_URI
		}
	);
};

/**  * Select picture from library  
function selectPicture() {
	navigator.camera.getPicture(
		function(uri) {
			var img = document.getElementById('camera_image');
			img.style.visibility = "visible";
			img.style.display = "block";
			img.src = uri;
			document.getElementById('camera_status').innerHTML = "Все отлично, спасибо!";
		},
		function(e) {
			console.log("Error getting picture: " + e);
			document.getElementById('camera_status').innerHTML = "Ошибка, повторите.";
		},
		{ quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
};*/
 /**
     * Take picture with camera
     */
    function takePicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                document.getElementById('camera_status').innerHTML = "Success";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI});
    };

    /**
     * Select picture from library
     */
    function selectPicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                document.getElementById('camera_status').innerHTML = "Success";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
    };
    
    /**
     * Upload current picture
     */
    function uploadPicture() {
    	
    	// Get URI of picture to upload
        var img = document.getElementById('camera_image');
        var imageURI = img.src;
        if (!imageURI || (img.style.display == "none")) {
            document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
            return;
        }
        
        // Verify server has been entered
        server = document.getElementById('serverUrl').value;
        if (server) {
        	
            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                document.getElementById('camera_status').innerHTML = "Upload successful: "+r.bytesSent+" bytes uploaded.";            	
            }, function(error) {
                document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;            	
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
    

  