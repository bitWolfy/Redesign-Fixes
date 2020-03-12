// ==UserScript==
// @name         e621 Redesign Scripts
// @namespace    bitwolfy.com
// @version      2.0.4
// @description  Scripting portion of the e621 Redesign Fixes project
// @author       bitWolfy
// @homepage     https://github.com/bitWolfy/e621-Redesign-Fixes
// @match        https://e621.net/*
// @match        https://e926.net/*
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

$(function() {

    // Theme Switcher
    $("header#top").prepend(`
        <div id="theme-switcher-container" style="float: right; position: relative; top: 3px; color: #999;">
            Theme:
            <select id="theme-switcher">
                <option value="hexagon">Hexagon</option>
                <option value="bloodlust">Bloodlust</option>
                <option value="hotdog">Hotdog</option>
            </select>
        </div>
    `);

    $("#theme-switcher").change(function(e) {
        $(this).children().each(function(index, option) {
            $("body").removeClass("theme-" + $(option).val());
        });
        let theme = $(this).val();
        GM_setValue("e621-theme", theme);
        $("body").addClass("theme-" + theme);
    });

    (async () => {
        let theme = await GM_getValue("e621-theme", "hexagon");
        $("body").addClass("theme-" + theme);
        $("#theme-switcher").val(theme);
    })();

    // === Simple blacklist collapsable ===
    $("#blacklist-box h1").html(`<a href="" onclick="" id="blacklist-toggle">► Blacklisted</a>`);

    $("#blacklist-box div").css("display", "none");

    // Hide the filters by default, unless they are all disabled
    if($("a#re-enable-all-blacklists").css("display") == "none") {
        $("#blacklist-list").css("display", "none");
    } else {
        $("#blacklist-toggle").html("▼ Blacklisted");
    }

    // Toggle the filter list when clicking the header
    $("a#blacklist-toggle").on("click", function(e) {
        e.preventDefault();
        if($("#blacklist-list").css("display") == "none") {
            $("#blacklist-toggle").html("► Blacklisted");
            $("#blacklist-list").css("display", "block");
        } else {
            $("#blacklist-toggle").html("▼ Blacklisted");
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
