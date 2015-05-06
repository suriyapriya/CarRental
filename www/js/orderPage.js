/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var prepaidGiftCard = 100;
var surcharge = {"San Francisco":15, "Los Angeles":15, "Yosemite":20};
var insurance;

$(document).ready(function() {
    showCity();
    calculateRent();
    $("#result").hide();
});

var compact = {
    "insurance": 17,
    "price": 29.99
};

var midsize = {
    "insurance": 22,
    "price": 39.99
};

var luxury = {
    "insurance": 28,
    "price": 49.99,
    "carwash": 50
};

function showPrepaidCard()
{
    $("#prepaid").append('<input type="checkbox" id="prepaidcard"/> ' + "Prepaid gift card for gas stations - $" + prepaidGiftCard + '<br />');
}


function showCompactOptions()
{
    console.log("insurance");
    $("#rent").html("$"+compact["price"]);
    $("#insurance").append('<input type="checkbox" id="insur"/> ' + "Collision Insurance for Compact - $" + compact["insurance"] + '<br />');
    insurance = compact["insurance"];    
}

function showMidsizeOptions()
{
    console.log("insurance");
    $("#rent").html("$"+midsize["price"]);
    $("#insurance").append('<input type="checkbox" id="insur"/> ' + "Collision Insurance for MidSize - $" + midsize["insurance"] + '<br />');
    insurance = midsize["insurance"];    

}

function showLuxuryOptions()
{
    console.log("insurance");
    $("#rent").html("$"+luxury["price"]);
    $("#insurance").append('<input type="checkbox"  id="insur"/> ' + "Collision Insurance for Luxury - $" + luxury["insurance"] + '<br />');
    insurance = luxury["insurance"];    
    showCarwash();
}

function showCarwash()
{
    $("#carwash").append('<input type="checkbox" id="wash"/> ' + "Daily car wash for Luxury - $" + luxury["carwash"] + '<br />');   
}

$(function () {
    if (window.location.search.split('?').length > 1) {
        var params = window.location.search.split('?')[1];
        var key = params.split('=')[0];
        var value = params.split('=')[1];
        console.log(value);
        if(value === "compact")
        {
            showCompactOptions();
        }
        if(value === "midsize")
        {
            showMidsizeOptions();
        }
        if(value === "luxury")
        {
            showLuxuryOptions();
        }
    }
    showPrepaidCard();
});

function showCity()
{
    $(".dropdown-menu li a").click(function()
    {
        $("#error").html("");
        var selText = $(this).text();
        $("#dropdownMenu1").html(selText+' <span class="caret"></span>');
        $("#surcharge").html("Surcharge is " + surcharge[selText] + "%");
    });
}

function checkRequiredOptions()
{
   console.log($("#dropdownMenu1").text());
    $("#error").html("");
    if($.trim($("#dropdownMenu1").text()) === "Select a city")
    {
        $("#error").html("choose a city");
        return false;
    }
    if($('#sd').val() === "" || $('#sd').val() === null)
    {
        $("#error").html("choose start date");
        return false;
    }
    if($('#ed').val() === "" || $('#ed').val() === null)
    {
        $("#error").html("choose end date");
        return false;
    }
    var d1 = Date.parse($('#sd').val());
    var d2 = Date.parse($('#ed').val());
    if($('#days').val() <= 0 || d1 >= d2)
    {
        $("#error").html("Invalid date");
        return false;
    }
    return true;
}

function calculateRent()
{    
    $("#submit").click(function() {
       if(checkRequiredOptions())
       {
            $("#result").show();
            var n2 = $("#days").val();
            var surcge = surcharge[$.trim($('#dropdownMenu1').text())];
            var strtable = "<caption><b>Confirm Order</b></caption>";
            strtable += "<tbody>";
            strtable += "<tr><td>No of days </td><td>:" + n2 + "</td></tr>";            
            var price = $("#rent").text().replace("$", "");
            price = parseFloat(price);
            if(n2 > 15 && n2 <= 30)
            {                
                price = price - (price * (offers["15"]*.01));
                strtable += "<tr><td>After including offer " + offers["15"] + "% </td><td>:$"+ price.toFixed(2)+"</td></tr>";
                console.log("rent: "+ price);
            }
            if(n2 > 30)
            {
                price = price - (price * (offers["30"]*.01));
                strtable += "<tr><td>After including offer " + offers["30"] + "% </td><td>:$"+ price.toFixed(2)+"</td></tr>";
                console.log("rent: "+ price);
            }
            console.log((surcge*0.01));
            price = price + (price * (surcge*0.01));
            console.log(price);
            strtable += "<tr><td>After Surcharge " + surcge + "% added</td><td>:$"+ price.toFixed(2)+"</td></tr>";
            price = price * parseInt(n2);
            strtable += "<tr><td>Rent for " + n2 + " days</td><td>:$"+ price.toFixed(2)+"</td></tr>";
            
            
            if($("#insur").is(':checked'))
            {
                price = price + insurance;
                strtable += "<tr><td>Collision Insurance ($"+ insurance.toFixed(2)+" per-day)</td><td>:$" + price.toFixed(2)+"</td></tr>";

                console.log(price);
            }
            if($("#prepaidcard").is(':checked'))
            {
                price = price + prepaidGiftCard;
                strtable += "<tr><td>Pre-paid Gas card </td><td>:$" + price.toFixed(2)+ "</td></tr>";
                console.log(price);
            }
            if($("#wash").is(':checked'))
            {
                price = price + luxury["carwash"];
                strtable += "<tr><td>Daily car wash </td><td>:$" + price.toFixed(2)+ "</td></tr>";
                console.log(price);
            }

            strtable += "<tr><td>----------------------</td><td>-------------</td></tr>"
            strtable += "<tr><td>Total </td><td>:$" + price.toFixed(2)+ "</td></tr>";
            strtable += "</tbody>";
            $("#result").html(strtable);
            $('#error').html("");
            $(window).scrollTop($(document).height());
       }
       else
            $(window).scrollTop(0);
    });
}

