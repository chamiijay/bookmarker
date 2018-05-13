// Listen for form submit
  document.getElementById('myForm').addEventListener('submit', saveBookmark);


//save bookmark
 function saveBookmark(e) {

    //Get from values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    var bookmark = {
    	name: siteName,
    	url: siteURL
    }
     
     if(!validateForm(siteName,siteURL)) {

     	return false

     }
  
   //Test if bookmarks are null

 	if(localStorage.getItem('bookmarks') === null) {
        
        //init array
 		var bookmarks = [];

 		// Add to array
 		bookmarks.push(bookmark);

 		// set to localStorage
 		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

 	}  else {
 		// get bookmarks from local storage
 		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

 		//add bookmark to array
 		bookmarks.push(bookmark);

 		//re-set back to local storage
 		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
 	}

 	   //clear form
        document.getElementById('myForm').reset();


 	    fetchBookmarks();
 
    //prevent form from submitting
    e.preventDefault();
 }

    //delete bookmark
    function deleteBookmark(url) {
    	//get bookmarks from localStorage
    	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    	//loop through bookmarks

    	for(var i=0; i < bookmarks.length; i++){
    		if(bookmarks[i].url == url) {
    			//remove from array
    			bookmarks.splice(i,1);
    		}
    	}
    	//re-set back to local storage
 		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

 		//re-fetch bookmarks
 		fetchBookmarks();
    }

   //fetch bookmarks

   function fetchBookmarks() {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        //get output id

        var bookmarksResults = document.getElementById('bookmarkResults');

        //build output

        bookmarksResults.innerHTML = ' ';

        for(var i = 0; i < bookmarks.length; i++) {
             
             var name = bookmarks[i].name;
             var url = bookmarks[i].url;

             console.log(url);
            
             bookmarksResults.innerHTML += '<div class="well">' + 
                                           '<h3>' +name+
                                           ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit </a> ' + 
                                           ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete </a> ' + 
                                           '</h3>'+
                                           '</div>';

        }

   }

  // validate inputs
  function validateForm(siteName,siteURL) {
  	   if(!siteName || !siteURL) {
    	alert("please fill in the form!");

    	return false;

    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    


    if(!siteURL.match(regex)) {
           alert("Plaese use a valid url");
           return false;
    }

    return true;
  }
