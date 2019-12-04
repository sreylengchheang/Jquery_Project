$(function () {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (data) {
            error: () => console.error("Cannot request data");
            data.recipes.forEach(element => {
                var nomPom = "";
                nomPom += `
                <div class="card">
                <div class="card-header">${element.name}</div>
                <div class="card-body">${element.iconUrl}</div>
                </div>
                `
                $('#choose_my_option').on('change', function () {
                    var recipe = $('#choose_my_option').val();
              
                })
                $('#result').append(nomPom);
            });

        }
    })
    // var chooseRecipe = (myRecipe)
});