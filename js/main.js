$(document).ready(function() {

	var myFacebookToken = 'EAACEdEose0cBANZBMSH3TF5RLJO8jfXyirpfnZBhEb5fFlTUTe4z1ZCw7pzwJZAD6OYVO8ayagkgAjQFvvItQsve56MkPqtIOc0csHcvl6azHZBLDKbVqpZCSN1dA8rmZAXwuNxNiM3HXBfPPRRGgK9XdcqBNQqqZA1TkjkfqE8sZC99lqG6WIXs7AZBv9IFKSZCcsug1g2hLZCeiQZDZD';
    
    function getProfilePic_name() {
    	
    	$.ajax('https://graph.facebook.com/v2.10/me?access_token='+myFacebookToken,{

    		success : function(response){
    			$("#profilePicture").html('<img src="https://graph.facebook.com/'+response.id+'/picture?&type=large&return_ssl_resources=1" alt="" class="reponsive-img card-image hoverable">');
    			$("#profileName").html('<h3 class="centre-align">'+response.name+'</h3>');
    		}

    	  }
    	);
    }

    function getCoverPic() {
    	$.ajax('https://graph.facebook.com/v2.10/me?fields=cover&access_token='+myFacebookToken,{

    		success : function(response){
    			$("#cover").html('<img src='+response.cover.source+' class="responsive-img">');

    		}
    	  }
    	);


    }

    function getHometown() {
    	$.ajax('https://graph.facebook.com/v2.10/me?fields=hometown&access_token='+myFacebookToken,{

    		success : function(response) {
    			$("#hometown").text(response.hometown.name);
    		}
    	})
    }

    function getGender() {
    	$.ajax('https://graph.facebook.com/v2.10/me?fields=gender&access_token='+myFacebookToken,{

    		success : function(response) {
    			$("#gender").text(response.gender);
    		}
    	})
    }


    getProfilePic_name();
    getCoverPic();
    getHometown();
    getGender();
});