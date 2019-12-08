
var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
$(document).ready(function () {
    API(url);
});
//request data from api using arrow fucntion
var API = (api) => {
    $.ajax({
        dataType: 'json',
        url: url,
        success: (data) => getDataRecipe(data),
        error: () => console.error("Cannot request data"),
    })
}
//get data from api
function getDataRecipe(datas) {
    datas.recipes.forEach(element => {
        getValueSelection(element);
    });
}
// get value from html select
function getValueSelection(element) {
    $("#choose_my_option").on('change', function () {
        selection = $("#choose_my_option").val();
        if (element.id == selection) {
            getValueApi(element);
            element.ingredients.forEach(item => {
                increasAndDescreasment(item);
                var letter = "";
                letter += `
                    <h3 class="text-center">Ingrediants</h3>
                `
                ingrediants(item);
                $('#text').html(letter);
            });
        }
    })
}
//get name and icon url 
function getValueApi(recipse) {
    //distructuring
    const { name, iconUrl, nbGuests, instructions } = recipse;
    console.log(name);
    var recipes = "";
    recipes += `
        <div class="card shadow-lg">
            <div class="card-header">${name}</div>
            <div class="card-body"><img src="${iconUrl}" class="img-fluid"></div>
           
        </div>
    `
    $('#result').html(recipes);
}
//get ingrediants
function ingrediants(item) {
    const { name, quantity, unit, iconUrl } = item;
    var table = "";
    table += `
        <tr>
            <td>${name}</td>
            <td>${quantity}</td>
            <td>${unit[0]}</td>
            <td><img src="${iconUrl}" class="img-fluid" width="100"></td>
        </tr>
    `
    $('#ingredient').append(table);
}
//for increasment
function increasAndDescreasment(increas) {
    var input = "";
    input += `
         <div class="input-group mb-3">
            <div class="input-group-append">
                <button class="btn btn-danger" type="butdton" id="minus">&minus;</button>
            </div>
            
                <input type="text" class="form-control" value ="0" id="value">

            <div class="input-group-append">
                <button class="btn btn-success" type="butdton" id="add">&plus;</button>
            </div>
         </div>
                `

    $('#increasment').html(input);
   
}

// function minus(number) {
//    $('#minus').on('click',function(){
//     var min = $('#minus').val();
//     descreas(min);
//    });
// }
// function descreas(descreasment){
//     var numbers = parseInt(descreasment)-1;
//         return numbers;
// }
// function add(number) {
//    $('#add').on('click',function(){
//     var max = $('#minus').val();
//     increas(max);
//    });
// }
// function increas(increasment){
//     var addNumber = parseInt(descreasment)+1;
//         return addNumber;
// }






