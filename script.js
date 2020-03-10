// ==UserScript==
// @name         e621 Redesign Scripts
// @namespace    bitwolfy.com
// @version      1.0.0
// @description  Scripting portion of the e621 Redesign Fixes project
// @author       bitWolfy
// @homepage     https://github.com/bitWolfy/e621-Redesign-Fixes
// @match        https://e621.net/*
// @match        https://e926.net/*
// ==/UserScript==

$(function() {

    // === Simple blacklist collapsable ===
    $("#blacklist-box h1").html(`<a href="" onclick="" id="blacklist-toggle">? Blacklisted</a>`);

    // Hide the filters by default, unless they are all disabled
    if($("a#re-enable-all-blacklists").css("display") == "none") {
        $("#blacklist-list").css("display", "none");
    } else {
        $("#blacklist-toggle").html("? Blacklisted");
    }

    // Toggle the filter list when clicking the header
    $("a#blacklist-toggle").on("click", function(e) {
        e.preventDefault();
        if($("#blacklist-list").css("display") == "none") {
            $("#blacklist-toggle").html("? Blacklisted");
            $("#blacklist-list").css("display", "block");
        } else {
            $("#blacklist-toggle").html("? Blacklisted");
            $("#blacklist-list").css("display", "none");
        }
    });

    // Toggle the filter list when clicking on "disable all filters"
    $("a#disable-all-blacklists").on("click", function(e) {
        if($("#blacklist-list").css("display") == "none") {
            $("a#blacklist-toggle").click();
        }
    });

});
