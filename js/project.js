// get url 
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(function () {
    //display data in application
    getApi();
    $('#recipe').on('change', function () {
        var recipeId = $('#recipe').val();
        eachRecipe(recipeId);

        //increas and decrease number
        $('#minus').on('click', function () {
            var minimux = $('#number').val();
            decreasment(minimux);

        });
        $('#add').on('click', function () {
            var maximux = $('#number').val();
            increasment(maximux);
        })
    });
});
//request data from json file
function getApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot request data"),
    });
}
var allData = [];
//this function select the recipe name and change recipe information
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(element => {
        option += `
            <option value="${element.id}">${element.name}</option>
        `;
    });
    $('#recipe').append(option);
}
//this variable array for get old nbGuest
var dataQuanlity = [];
var oldNbGeusts = 0;
// select each recipe
function eachRecipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
            //showRecipe();
            showRecipe(item.name, item.iconUrl);
            nbGuest(item.nbGuests);
            //showIngredient
            showIngredient(item.ingredients);
            //showStep().....
            showStep(item.instructions);
            //ingredant quality
            dataQuanlity = item;
            //get oldNbGeusts
            oldNbGeusts = item.nbGuests;
        }
    })
}
// show name and image
function showRecipe(name, img) {
    var result = "";
    result += ` 
    <div class="card shadow-lg">
        <div class="card-header"><h4>${name}</h4></div>
        <div class="card-body"><img src ="${img}" class="img-fluid " width="350" ></div>
    </div>
    `;
    $('#result').html(result);
}
$('#hide').hide();

//get ingredient and display unit with signle letter
function showIngredient(ing) {
    var ingre = "";
    var text = "";
    text += `
    <h3 class="text-center">Ingredients</h3><br>
    `;
    ing.forEach(ele => {
        ingre += `
        <tr>
            <td>${ele.name}</td>
            <td>${ele.quantity}</td>
            <td>${ele.unit[0]}</td>
            <td><img src="${ele.iconUrl}" class="img-fluid" width="100"></td>
        </tr>
      `;
    });
    $('#text').html(text);
    $('#ingredient').html(ingre);
    $('#hide').show();
}
//display instructions to step
function showStep(step) {
    var letter = "";
    letter += `
        <h3 class="text-center">Instruction</h3><br>
    `;
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
    $('#texts').html(letter);
    $('#instruction').html(instruction);
}
//for decreasment number
function decreasment(mini) {
    var numbers = parseInt(mini) - 1;
    if (numbers >= 0) {
        $('#number').val(numbers);
        getGuests($('#number').val());
    }
}
//for increasment number
function increasment(max) {
    var num = parseInt(max) + 1;
    if (num <= 15) {
        $('#number').val(num);
        getGuests($('#number').val());
    }
}
// get id of nbGuests put into input box
function nbGuest(nbGuests) {
    var guests = "";
    guests += `
    <div class="input-group mb-3">
    <div class="input-group-prepend">
    <button class="btn btn-primary" type="button" id="minus">&minus;</button>
    </div>
    <input type="number" class="form-control text-center" value="${nbGuests}" disabled id="number" max="15" min="0">
    
    <div class="input-group-append">
    <button class="btn btn-success" type="button" id="add">&#x2b;</button>
    </div>
   
    </div>
    <h5 class="text-center">Number of people</h5>
    `;
    $('#incraement').html(guests);
}
//function for loop get new data old data 
function getGuests(guests) {
    var oldQuanlity = "";
    var newQuanlity = "";
    var validQuanlity = "";
    dataQuanlity.ingredients.forEach(item => {
        const { name, quantity, unit, iconUrl } = item;
        oldQuanlity = quantity / oldNbGeusts;
        newQuanlity = oldQuanlity * guests;
        validQuanlity += `
        <tr>
        <td>${name}</td>
        <td>${newQuanlity}</td>
        <td>${unit[0]}</td>
        <td><img src="${iconUrl}" class="img-fluid" width="100"></td>
    </tr>
        `;
    });
    $('#ingredient').html(validQuanlity);
}


