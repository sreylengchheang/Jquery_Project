function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(function () {
    getApi();
    $('#recipe').on('change', function () {
        var recipeId = $('#recipe').val();
        condition()
        eachRecipe(recipeId);
    });
    // condition()
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
            console.log(item);
            //showRecipe();
            showRecipe(item.name, item.iconUrl);
            //showIngredient
            showIngredient(item.ingredients);
            //showStep().....
            showStep(item.instructions);
        }
    })
}
// show name and image
function showRecipe(name, img) {
    var result = "";
    result += ` 
      <h4>${name} <img src ="${img}" class="img-fluid rounded-circle" width="150"></h4>
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
    var instruction ="";
    var i = 1;
    while (i<data.length) {
        instruction  += `
                <h4 class="text-primary">Step ${i} </h4> 
                <p>${data[i]}</p>
        `;

        i++;
    }
  
    $('#instruction').html(instruction);
}
function condition() {
    var input ="";
    input +=`
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <button class="btn btn-primary" type="button" id="minus">&minus;</button>
            </div>
                <input type="number" class="form-control text-center" value="0" disabled id="member" max="15" min="0">
            <div class="input-group-append">
                <button class="btn btn-success" type="button" id="add">&#x2b;</button>
            </div>
        </div>
    `
    $('#incraement').html(input);
}





