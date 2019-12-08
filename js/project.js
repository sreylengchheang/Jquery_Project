
var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
$(document).ready(function () {
    API(url);
});
var API = (api) => {
    $.ajax({
        dataType: 'json',
        url: url,
        success: (data) => getRecipse(data),
        error: () => console.error("Cannot request data"),
    })
}
function getRecipse(datas) {
    datas.recipes.forEach(element => {
        getElents(element);
    });
}
var getElents = (element) => {
    getIdFromSelection(element);
}
function getIdFromSelection(element) {
    $("#choose_my_option").on('change', function () {
        selection = $("#choose_my_option").val();
        if (element.id == selection) {
            getElementById(element);
            element.ingredients.forEach(item => {
                ingradiants(item);
            });
        }
    })
}
function getElementById(recipse) {
    const { name, iconUrl, nbGuests, instructions } = recipse;
    console.log(name);
    //do
}
function ingradiants(item) {
   console.log(item.name);
   //do
}






