// ==UserScript==
// @name         e621 Redesign Scripts
// @namespace    bitwolfy.com
// @version      2.0.7
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
                box-shadow: 0 2px 10px -5px #000;
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
                    <select id="th-main-switcher">
                        <option value="hexagon">Hexagon</option>
                        <option value="pony">Pony</option>
                        <option value="bloodlust">Bloodlust</option>
                        <option value="serpent">Serpent</option>
                        <option value="hotdog">Hotdog</option>
                    </select>
                </div>
                <div class="customizer-label">Look:</div>
                <div class="customizer-controls">
                    <select id="th-look-switcher">
                        <option value="classic">Classic</option>
                        <option value="modern">Modern</option>
                    </select>
                </div>
                <div class="customizer-label">Extras:</div>
                <div class="customizer-controls">
                    <select id="th-extra-switcher">
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
                <div class="customizer-controls" style="grid-column: 1 / 3;">
                    <input type="checkbox" id="theme-scaling" name="theme-scaling">
                    <label for="theme-scaling" style="float: right; font-weight: 400;">Disable scaling</label>
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

    $(document).click(function(e) {
        var $target = $(e.target);
        if($target.is("#customizer-container") || 
           $("#customizer-container").has($target).length > 0) { return; }
        
        if($("#customizer-popup-box").css("display") != "none") {
            $("#customizer-popup-box").css("display", "none");
            $("#customizer-toggle").text("► Theme");
        }
    });

    handleThemeSwitcher("th-main",  "hexagon");
    handleThemeSwitcher("th-look",  "classic");
    handleThemeSwitcher("th-extra", "hexagons");

    function handleThemeSwitcher(selector, def_option) {
        (async () => {
            let theme = await GM_getValue("e621-" + selector, def_option);
            $("body").attr("data-" + selector, theme);
            $("#" + selector + "-switcher").val(theme);
        })();

        $("#" + selector + "-switcher").change(function(e) {
            let theme = $(this).val();
            GM_setValue("e621-" + selector, theme);
            $("body").attr("data-" + selector, theme);
        });
    }

    // Handle the scaling toggle
    $("#theme-scaling").change(function(e) {
        let disable_scaling = $(this).is(":checked");
        console.log(disable_scaling);
        GM_setValue("e621-scaling", disable_scaling);
        if(disable_scaling) { $("body").css("max-width", "unset"); }
        else { $("body").css("max-width", ""); }
    });
    (async () => {
        let disable_scaling = await GM_getValue("e621-scaling", "false");
        if(disable_scaling) { $("body").css("max-width", "unset"); }
        $("#theme-scaling").prop("checked", disable_scaling);
    })();



    // === Simple blacklist collapsable ===
    $("#blacklist-box h1").html(`<a href="" id="blacklist-toggle">► Blacklisted</a>`);

    // Disable e6NG Helper's blacklist toggle
    $("#blacklist-box > div").first().css("display", "none");

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
