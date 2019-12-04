$(document).ready(function(){
  $('#register').on('click', function(){
    $('#checkuser').hide();
    $('#checkage').hide();
    $('#checknickname').hide();
    $('#checkSuccess').hide();
   
    var name_error = false;
    var age_error = false;
    var nickname_error = false;

//make useranme validate form
    $('#name').focusout(function(){
        check_name();
    })
    function check_name(){
        var names = $('#name').val().length;
       if(names ==" "){
            $('#checkuser').html(".Error :- Name cannot black");
            $('#checkuser').show();
            $('#name').css('border','2px solid red');
            $('#checkuser').css('color', 'red');
            name_error = true;
        }else{
            $('#name').css('border','2px solid green');
        }
    }

    // check  conditon of age
    $('#age').focusout(function(){
        check_age();
    })
    function check_age(){
        var yourAge = $('#age').val();
        var num_age =parseInt(yourAge)
       if(yourAge == ""){
            $('#checkage').html("- Please enter your age");
            $('#checkage').show();
            $('#age').css('border','2px solid red');
            $('#checkage').css('color', 'red');
            age_error = true;
        }else if(yourAge != num_age){
            $('#checkage').html(" - Your age shall be positive number");
            $('#checkage').show();
            $('#age').css('border','2px solid red');
            $('#checkage').css('color', 'red');
            age_error = true;
        }else{
            $('#age').css('border','2px solid green');
        }
        
    }


    //check conditon of nickname
    $('#nickname').focusout(function(){
        check_nickname();
    })
    function check_nickname(){
        var nickname = $('#nickname').val();
       if(nickname  == ""){
            $('#checknickname').html("- Please enter your nickname");
            $('#checknickname').show();
            $('#nickname').css('border','2px solid red');
            $('#checknickname').css('color', 'red');
            nickname_error = true;
        }else if(nickname.length < 9){
            $('#checknickname').html("- Your nickname at least 9 character");
            $('#checknickname').show();
            $('#nickname').css('border','2px solid red');
            $('#checknickname').css('color', 'red');
            nickname_error = true;
        }
        else if(nickname != nickname.toUpperCase()){
            $('#checknickname').html("- Your nickname should have one uppercase letter");
            $('#checknickname').show();
            $('#nickname').css('border','2px solid red');
            $('#checknickname').css('color', 'red');  
        }else{
            $('#checkSuccess').css('border','2px solid green');
            $('#checkSuccess').html("success");
            $('#checkSuccess').show();
            $('#checkSuccess').fadeOut(1000);
        }
    }
    
    check_name();
    check_age();
    check_nickname();
    name_error ;
    age_error ;
    nickname_error;

//check condition false and return value true
    if(name_error == false && age_error == false && nickname_error== false){
        return true ;
    }else{
        return false;
    }






  })  
})