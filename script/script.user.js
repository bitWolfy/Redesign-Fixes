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

    // === Theme Switcher and Customizer ===
    $("header#top").prepend(`
        <div id="theme-switcher-container" style="float: right; position: relative; top: 3px; color: #999; margin: 3px 0;">
            <a href="" id="theme-switcher-toggle">► Theme</a>
            <div id="theme-switcher-box" style="display:none; position: absolute; right: 0; background: #25477b; padding: 10px; border: 1px solid #152f56; border-radius: 5px; color: white; width: 150px; margin-top: 4px; z-index: 15;">
                Theme:
                <select id="theme-switcher">
                    <option value="hexagon">Hexagon</option>
                    <option value="bloodlust">Bloodlust</option>
                    <option value="hotdog">Hotdog</option>
                </select>
                <br style="margin-top:10px;" />
                <input type="checkbox" id="theme-scaling" name="theme-scaling">
                <label for="theme-scaling" style="font-weight: 400;">Disable scaling</label>
            </div>
        </div>
    `);

    // Toggle the theme box
    $("#theme-switcher-toggle").click(function(e) {
        e.preventDefault();
        if($("#theme-switcher-box").css("display") == "none") {
            $("#theme-switcher-box").css("display", "block");
            $("#theme-switcher-toggle").text("▼ Theme");
        } else {
            $("#theme-switcher-box").css("display", "none");
            $("#theme-switcher-toggle").text("► Theme");
        }
    });

    // Handle the theme selector
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

    // Handle the scaling toggle
    $("#theme-scaling").click(function(e) {
        let disable_scaling = $(this).is(":checked");
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
