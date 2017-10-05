$(document).ready(function(){

var topics = ["Prince", "Beyonce", "Michael Jackson", "Britney Spears", "Aerosmith", "Queen", "Shakira"];	
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + addMusician + "&api_key=dc6zaTOxFJmzC&limit=10";



// Loop to dynamically create buttons in topics array
function createButtons(){
	for (var i = 0; i < topics.length; i++) {

	    var buttons = $('<button>').text(topics[i]).addClass('topicsBtn').attr({'data-name': topics[i]});

	    $('#musicianbuttons').append(buttons);


	};

};




// Add click event to all buttons
   function displayGifs() {


    	$('#musicians').empty();

    var thisMusician = $(this).data('name');
    var number = Math.floor(Math.random()*101);
    var urlSearch = "https://api.giphy.com/v1/gifs/search?q=" + thisMusician + "&api_key=dc6zaTOxFJmzC&limit=10&offset=" + number;


    $.ajax({
          url: urlSearch,
          method: "GET"
        })

    // // / After the data comes back from the API
        .done(function(response) {

        	// console.log("This Musician" + thisMusician);

         //  	console.log(response);

              var gifDiv = $("#musicians");

              var data = response.data;
                // console.log("Data:" + data);

                for (var i = 0; i < data.length; i++){

                	console.log(data[i].rating);

                	 // Storing the result item's rating
	              var rating = data[i].rating;

	              // Creating a paragraph tag with the result item's rating
	              var p = $("<p>").text("Rating: " + rating);

	              gifDiv.append(p);


              // Creating an image tag
              var gifImage = $("<img>");

              // Giving the image tag an src attribute to use in data state function
              gifImage.attr("data-still", data[i].images.original_still.url);
              gifImage.attr("data-animate", data[i].images.original.url);
              gifImage.attr("data-state", "still");

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              
              gifDiv.append(gifImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#musicians").prepend(gifDiv);

                }


             

            });


          };


         

    //sets a button from input by pushing it into topics array
$('#addMusician').on('click', function(){
	event.preventDefault();
	var userChoice = $('#musicianinput').val().trim();
	topics.push(userChoice);
	$('#musicianbuttons').empty();
	createButtons();
	return false;

	// console.log(userChoice);
});

createButtons();

 function animateGifs() {

            var state = $(this).attr("data-state");

            // console.log("This" + this);

                
                if(state === "still"){
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }

         
          };


$(document).on("click", ".topicsBtn", displayGifs);
$(document).on("click", "img", animateGifs);

});
