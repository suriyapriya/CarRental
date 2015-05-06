/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    var offerInc = 0;
    function showOffer()
    {
        var str = [offers["15"] + "% off if duration of rental is more than "+ "15" +" days",
        offers["30"] + "% off if duration of rental is more than "+ "30" +" days"];
        $("#offers").fadeTo(1000, 0, function(){
            $("#offers").html((str[0] !== $("#offers").text())? str[0]: str[1]);
            $("#offers").fadeTo(1000, 1, showOffer);
        });
    }
    showOffer();
    initializeDate();
    showCity();
    checkDays();
});

var offers = {"15": 10, "30": 20};

function getDays(n1, n2)
{
    if(n1 === "" || n1 === null)
    {
        return -2;
    }
    if(n2 === "" || n2 === null)
    {
        return -3;
    }
    var d1 = Date.parse(n1);
    var d2 = Date.parse(n2);
    if(d1 >= d2)
    {
        return -1;
    }
    return Math.round((d2 - d1)/(1000*60*60*24));
}

function initializeDate()
{
    $('#sd').datepicker({
    format: 'mm/dd/yyyy',
    startDate: 'd'
    });
    var ret;
    var sd = $("#sd").on("change", function(){
        $("#error").html("");
        var val1 = $("#sd").val();
        var val2 = $("#ed").val();
        ret = getDays(val1, val2);
        if(ret === -1)
        {
            $("#error").html("Invalid date");
        }
        if(ret > 0)
        {
            $("#days").val(ret);
            $("#error").html("");
        }
        $(window).scrollTop(0);
    });

    $('#ed').datepicker({
    format: 'mm/dd/yyyy',
    startDate: '+0d'
    });
    var ed = $("#ed").on("change", function(){
        $("#error").html("");
        var val1 = $("#sd").val();
        var val2 = $("#ed").val();
        ret = getDays(val1, val2);
        if(ret === -2)
        {
            $("#error").html("choose start date");           
        }
        if(ret === -1)
        {
            $("#error").html("Invalid date");
        }
        if(ret > 0)
        {
            $("#days").val(ret);
            $("#error").html("");
        }
        $(window).scrollTop(0);

    });
}

function showCity()
{
    $(".dropdown-menu li a").click(function()
    {
        var selText = $(this).text();
        $("#dropdownMenu1").html(selText+' <span class="caret"></span>');
        $("#surcharge").html("Surcharge is " + surcharge[selText]);
        $(window).scrollTop(0);
    });
}

function checkDays()
{
    $("#days").change(function(){
        var val1 = $("#sd").val();
        var val2 = $("#ed").val();
        ret = getDays(val1, val2);
        if(ret === -2)
        {
            $("#error").html("choose start date");           
        }
        if(ret === -3)
        {
            $("#error").html("choose end date");           
        }
        if(ret === -1)
        {
            $("#error").html("Invalid date");
        }
        if(ret > 0)
            $(this).val(ret);
        $(window).scrollTop(0);

    });
}
