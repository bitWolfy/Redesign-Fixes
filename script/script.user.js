// ==UserScript==
// @name         e621 Redesign Scripts
// @namespace    bitwolfy.com
// @version      2.0.5
// @description  Scripting portion of the e621 Redesign Fixes project
// @author       bitWolfy
// @homepage     https://github.com/bitWolfy/e621-Redesign-Fixes
// @match        https://e621.net/*
// @match        https://e926.net/*
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

$(function() {

    $("head").append(`
        <style type="text/css">
            #customizer-container {
                float: right;
                position: relative;
                color: #999;
                padding: 0.5rem 0;
            }
            #customizer-popup-box {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-row-gap: 1rem;
                grid-column-gap: 0.5rem;

                position: absolute;
                right: 0;
                z-index: 15;
                padding: 1rem;

                border-radius: 5px;
            }
            .customizer-controls select {
                width: -webkit-fill-available;
                width: -moz-available;
            }
        </style>
    `);

    // === Theme Switcher and Customizer ===
    $("header#top").prepend(`
        <div id="customizer-container">
            <a href="" id="customizer-toggle">► Theme</a>
            <div id="customizer-popup-box" class="bg-section border-foreground color-text" style="display: none;">
                <div class="customizer-label">Theme:</div>
                <div class="customizer-controls">
                    <select id="theme-switcher">
                        <option value="hexagon">Hexagon</option>
                        <option value="pony">Pony</option>
                        <option value="bloodlust">Bloodlust</option>
                        <option value="serpent">Serpent</option>
                        <option value="hotdog">Hotdog</option>
                    </select>
                </div>
                <div class="customizer-label">Extras:</div>
                <div class="customizer-controls">
                    <select id="extras-switcher">
                        <option value="none">None</option>
                        <option value="autumn">Autumn</option>
                        <option value="winter">Winter</option>
                        <option value="spring">Spring</option>
                        <option value="aurora">Aurora</option>
                        <option value="hexagons">Hexagons</option>
                        <option value="space">Space</option>
                        <option value="stars">Stars</option>
                    </select>
                </div>
            </div>
        </div>
    `);

    // Toggle the theme box
    $("#customizer-toggle").click(function(e) {
        e.preventDefault();
        if($("#customizer-popup-box").css("display") == "none") {
            $("#customizer-popup-box").css("display", "");
            $("#customizer-toggle").text("▼ Theme");
        } else {
            $("#customizer-popup-box").css("display", "none");
            $("#customizer-toggle").text("► Theme");
        }
    });

    // Handle the theme selector
    $("#theme-switcher").change(function(e) {
        let theme = $(this).val();
        GM_setValue("e621-theme", theme);
        $("body").attr("data-theme", theme);
    });

    (async () => {
        let theme = await GM_getValue("e621-theme", "hexagon");
        $("body").attr("data-theme", theme);
        $("#theme-switcher").val(theme);
    })();

    // Handle the extras selector
    $("#extras-switcher").change(function(e) {
        let extras = $(this).val();
        GM_setValue("e621-extras", extras);
        $("body").attr("data-extras", extras);
    });

    (async () => {
        let extras = await GM_getValue("e621-extras", "hexagons");
        $("body").attr("data-extras", extras);
        $("#extras-switcher").val(extras);
    })();



    // === Simple blacklist collapsable ===
    $("#blacklist-box h1").html(`<a href="" id="blacklist-toggle">► Blacklisted</a>`);

    $("#blacklist-box div").css("display", "none");

    // Hide the filters by default, unless they are all disabled
    if($("a#re-enable-all-blacklists").css("display") == "none") {
        $("#blacklist-list").css("display", "none");
    } else {
        $("#blacklist-toggle").text("▼ Blacklisted");
    }

    // Toggle the filter list when clicking the header
    $("a#blacklist-toggle").on("click", function(e) {
        e.preventDefault();
        if($("#blacklist-list").css("display") == "none") {
            $("#blacklist-toggle").html("▼ Blacklisted");
            $("#blacklist-list").css("display", "block");
        } else {
            $("#blacklist-toggle").html("► Blacklisted");
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
