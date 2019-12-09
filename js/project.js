
var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
$(document).ready(function () {
    API(url);
    $('#minus').on('click',function(){
        var min = $('#numbers').val();
        descreasNumber(min);
       });

       $('#add').on('click',function(){
        var max = $('#numbers');
        increasNumber(max);
    });
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
                $('#text').html(letter);
                ingrediants(item);
            });
        }
    })
}
//get name and icon url 
function getValueApi(recipse) {
    //distructuring
    const { name, iconUrl, nbGuests, instructions } = recipse;
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
    `;
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
            
                <input type="text" class="form-control" value ="0" id="numbers">
                

            <div class="input-group-append">
                <button class="btn btn-success" type="butdton" id="add">&plus;</button>
            </div>
         </div>
         <h3 class="text-center">Numbers of people</h3>
            `;
    $('#increasment').html(input);
    var text = "";
    text +=`
    <h3 class="text-center">Instruction</h3>
    `;
    $('#textes').html(text);
}

//descreasment

function descreasNumber(minimux) {
    var minNumber = parseInt(minimux) -1;
    if(minNumber >= 0){
        $('#numbers').val(minNumber);
    }
}
//increasment
function increasNumber(maximux) {
    var maxNumber = parseInt(maximux) + 1;
    if(maxNumber <=15){
        $('#numbers').val(maxNumber);
    }
}








