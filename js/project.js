function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(function () {
    getApi();
    $('#recipe').on('change', function () {
        var recipeId = $('#recipe').val();
        // formInput()
        eachRecipe(recipeId);
        $('#minus').on('chick',function(){
            var minimux = $('#number').val();
            console.log(minimux);
            decreasment(minimux);
          
        });
        $('#add').on('click',function(){
            var maximux = $('#number').val();
            console.log(maximux);
            increasment(maximux);
        })
    });
   

});
//get data from api
function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot request data"),
    });
}

var allData = [];
// display data in select form
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    
    recipe.forEach(element => {
        option += `
            <option value="${element.id}">${element.name}</option>
        
        `
       
    });
   
    $('#recipe').append(option);
}
// select each recipe
function eachRecipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
         
            //showRecipe();
            showRecipe(item.name, item.iconUrl,item.nbGuests);
            //showIngredient
            showIngredient(item.ingredients);
            //showStep().....
            showStep(item.instructions);
            //shownbGuests()
            // shwoNbGuests(item.nbGuests);
        }
    })
}
// show name and image
function showRecipe(name, img,nbGuests) {
    var result = "";

    result += ` 
      <h4>${name} <img src ="${img}" class="img-fluid rounded-circle" width="150"></h4>
      <div class="input-group mb-3">
            <div class="input-group-prepend">
                <button class="btn btn-primary" type="button" id="minus">&minus;</button>
            </div>
                <input type="number" class="form-control text-center" value="${nbGuests}" disabled id="number" max="15" min="0">
            <div class="input-group-append">
                <button class="btn btn-success" type="button" id="add">&#x2b;</button>
            </div>
        </div>
      
    `
   
    $('#result').html(result);
}
//get ingredient
function showIngredient(ing) {
    var ingre = "";
    ing.forEach(ele => {
        ingre += `
        <tr>
            <td>${ele.name}</td>
            <td>${ele.quantity}</td>
            <td>${ele.unit[0]}</td>
            <td><img src="${ele.iconUrl}" class="img-fluid" width="100"></td>
        </tr>
      `
    });
    $('#ingredient').html(ingre);
}
//get step from api 
function showStep(step) {
    var data = step.split('<step>');
    var instruction = "";
    var i = 1;
    while (i < data.length) {
        instruction += `
                <h4 class="text-primary">Step ${i} </h4> 
                <p>${data[i]}</p>
        `;

        i++;
    }

    $('#instruction').html(instruction);
}

//for decreasment number
function decreasment(mini){
    var numbers = parseInt(mini) -1;
    if(numbers >=0){
        $('#number').val(numbers);
    }
}
//for increasment number
function increasment(max){
    var num = parseInt(max) +1;
    if(num <=15){
        $('#number').val(num);
    }
}





