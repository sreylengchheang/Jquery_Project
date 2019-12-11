function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(function () {
    getApi();
    $('#recipe').on('change', function () {
        var recipeId = $('#recipe').val();
        eachRecipe(recipeId);
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
            console.log(item);
            //showRecipe();
            showRecipe(item.name, item.iconUrl);
            //showIngredient
            showIngredient(item.ingredients);
            //showStep().....
        }
    })
}
// show name and image
function showRecipe(name, img) {
    var result = "";
    result += ` 
      <h3>${name} <img src ="${img}" class="img-fluid rounded-circle" width="150"></h3>
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
            <td><img src="${ele.iconUrl}" class="img-fluid" width="150"></td>
        </tr>
      `
    });
    $('#ingredient').html(ingre);
}





