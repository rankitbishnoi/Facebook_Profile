// to get the facebok token
var myFacebookToken = prompt("please input your acces token... make sure that you have selected all the user data permisions.");


$(document).ready(function() {

	// variable to get the link for accessing more posts and use it in ajax
	var next;

    function getProfilePic_name() {
    	
    	$.ajax('https://graph.facebook.com/v2.10/me?access_token='+myFacebookToken,{

    		success : function(response){
    			$("#profilePicture").html('<img src="https://graph.facebook.com/'+response.id+'/picture?&type=large&return_ssl_resources=1" alt="" class="responsive-img card-image hoverable">');
    			$("#profileName").html('<h3 class="centre-align">'+response.name+'</h3>');
    		},

            error : function(request,errorType,errorMessage){
                console.log(request);
                console.log(errorType);
                alert(errorMessage);
            }

    	  }
    	);
    }

    function getCoverPic() {
    	$.ajax('https://graph.facebook.com/v2.10/me?fields=cover&access_token='+myFacebookToken,{

    		success : function(response){
    			$("#cover").html('<img src='+response.cover.source+' class="responsive-img">');

    		},

            error : function(request,errorType,errorMessage){
                console.log(request);
                console.log(errorType);
                alert(errorMessage);
                }
    	  }
    	);


    }

    function getHometown() {
    	$.ajax('https://graph.facebook.com/v2.10/me?fields=hometown&access_token='+myFacebookToken,{

    		success : function(response) {
    			$("#hometown").text(response.hometown.name);
    		},

            error : function(request,errorType,errorMessage){
                console.log(request);
                console.log(errorType);
                alert(errorMessage);
            }
    	})
    }

    function getGender() {
    	$.ajax('https://graph.facebook.com/v2.10/me?fields=gender&access_token='+myFacebookToken,{

    		success : function(response) {
    			$("#gender").text(response.gender);
    		},

            error : function(request,errorType,errorMessage){
                console.log(request);
                console.log(errorType);
                alert(errorMessage);
            },
    	})
    }

    function getWork() {
    	$.ajax('https://graph.facebook.com/v2.10/me?fields=work&access_token='+myFacebookToken,{

    		success : function(response) {
    			$("#work").text(response.work["0"].employer.name);
    		},

            error : function(request,errorType,errorMessage){
                console.log(request);
                console.log(errorType);
                alert(errorMessage);
            }
    	})
    }

    function getEducation() {
    	$.ajax('https://graph.facebook.com/v2.10/me?fields=education&access_token='+myFacebookToken,{

    		success : function(response) {
    			var j= response["education"].length;
    			for(var i=0; i<j; i++){
    			  $("#education").append(" "+(i+1)+". "+response.education[i].school.name);
    			  if (i<j-1) {
    			    $("#education").append(",");
    			  }
    			}
    		},

            error : function(request,errorType,errorMessage){
                console.log(request);
                console.log(errorType);
                alert(errorMessage);
            }
    	})
    }

    function getEmail() {
    	$.ajax('https://graph.facebook.com/v2.10/me?fields=email&access_token='+myFacebookToken,{

    		success : function(response) {
    			$("#email").text(response.email);
    		},

            error : function(request,errorType,errorMessage){
                console.log(request);
                console.log(errorType);
                alert(errorMessage);
            }
    	})
    }

    function getDob() {
    	$.ajax('https://graph.facebook.com/v2.10/me?fields=birthday&access_token='+myFacebookToken,{

    		success : function(response) {
    			$("#dob").text(response.birthday);
    		},

            error : function(request,errorType,errorMessage){

                console.log(request);
                console.log(errorType);
                alert(errorMessage);
            }
    	})
    }

    function getImagePosts(object_id, response1) {

    	$.ajax('https://graph.facebook.com/v2.10/'+object_id+'?fields=images&access_token='+myFacebookToken,{

    		success : function(response) {

    			if (response1.message == undefined) {
    				$("#posts").append('<div class="hoverable card-panel grey lighten-4"> <h5>'+(response1.story || "Picture Update")+'</h5><p>'+response1.created_time+'</p><div class="card"><div class="card-image"><img src="'+response.images[0].source+'"></div></div>');

    			}else {
    			     $("#posts").append('<div class="hoverable card-panel grey lighten-4"> <h5>'+(response1.story || "Picture Update")+'</h5><p>'+response1.created_time+'</p><div class="card"><div class="card-image"><img src="'+response.images[0].source+'"></div><div class="card-content"><p>'+response1.message+'</p></div></div>');
    		    }
    		},

            error : function(request,errorType,errorMessage){
                console.log(request);
                console.log(errorType);
                alert(errorMessage);
            }
    	});

    }

    function getMessagePosts(response) {

    	if (response.message == undefined) {
    		return 0;
    	}else{
    	    $("#posts").append('<div class="hoverable card-panel grey lighten-4"> <h5>'+(response.story || "Status Update")+'</h5><p>'+response.created_time+'</p> <blockquote> '+response.message+'</blockquote>' );
        }
    }

    function getPosts() {
    	$.ajax('https://graph.facebook.com/v2.10/me?fields=posts{type,object_id,message,story,created_time}&access_token='+myFacebookToken,{

    		success : function(response) {
    			var j= response.posts.data.length;
    			for(let i =0; i < j; i++){
    			  if (response.posts.data[i].type === "status") {
    			  	getMessagePosts(response.posts.data[i]);
    			  }else if (response.posts.data[i].type === "photo") {
    			  	getImagePosts(response.posts.data[i].object_id, response.posts.data[i]);
    			  }
    			}
    			next = response.posts.paging.next;
    		},

            error : function(request,errorType,errorMessage){
                console.log(request);
                console.log(errorType);
                alert(errorMessage);
            },

            beforeSend : function(){

                $('.progress').show();

            },

            complete : function(){

                $('.progress').hide();

            }
    	});
    }

    getProfilePic_name();
    getCoverPic();
    getGender();
    getHometown();
    getPosts();
    
    $("#aboutbtn").click(function() {
    	getWork();
        getEducation();
        getEmail();
        getDob();
    });
    

    // to get the more posts data after user clicks on see more
    $("#seeMoreBtn").click(function() {

    	$.ajax(next,{

    		success : function(response) {
    			var j= response.data.length;
    			for(let i =0; i < j; i++){
    			  if (response.data[i].type === "status") {
    			  	getMessagePosts(response.data[i]);
    			  }else if (response.data[i].type === "photo") {
    			  	getImagePosts(response.data[i].object_id, response.data[i]);
    			  }
    			}
    			next = response.paging.next;
    		},

            error : function(request,errorType,errorMessage){
                console.log(request);
                console.log(errorType);
                alert(errorMessage);
            },

            beforeSend : function(){

                $('.progress').show();

            },

            complete : function(){

                $('.progress').hide();

            }
    	});

    })

    
});