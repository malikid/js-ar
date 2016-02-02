"use strict";

var isTipShow, $tipWrap, $mapWrap;

function addMapScript() {
  addScriptToHtml("js/map.js");
  addScriptToHtml("https://maps.googleapis.com/maps/api/js?v=3&signed_in=true&callback=initMap");
}

function addScriptToHtml(srcPath) {
  var scriptElement = document.createElement("script");
  scriptElement.src = srcPath;
  var firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(scriptElement, firstScript);
}

function queryParseAPI(classes, where) {
  return $.ajax({
    url: "https://api.parse.com/1/classes/" + classes,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function(request) {
      request.setRequestHeader("X-Parse-Application-Id", '7OIk98BkPkgNcZWRIlzaRkz3VPVBjDzkYJ4UGg6p');
      request.setRequestHeader("X-Parse-REST-API-Key", 'GI4UKLbxWB6blOjORDDl9ukV6Nt53nHfCMloqgmP');
    },
    data: "where=" + JSON.stringify(where)
  });
}

function getHatStepData() {
  return queryParseAPI("Checkin", {stepEvent: "hat"});
}

function getBedStepData() {
  return queryParseAPI("Checkin", {stepEvent: "sleepAtBed"});
}

function toggleTip() {

  if(!isTipShow) {

    isTipShow = true;

    $tipWrap.removeClass('tip-hide').addClass('tip-show');
    $mapWrap.css('visibility', 'visible');

  } else {

    isTipShow = false;

    $tipWrap.removeClass('tip-show').addClass('tip-hide');
  }
}

$(function() {

  var windowH = $(window).height();
  var $btnTipIcon = $('.btn.tip-icon');
  isTipShow = false;
  $tipWrap = $('.tip-wrap');
  $mapWrap = $('.map-wrap');
  $mapWrap.css('visible', 'hidden');

  var initTip = function() {

    $tipWrap.css('height', windowH);
    $('body').css('height', windowH);
  };

  var addevenTip = function() {
    $btnTipIcon.on('click', function() {
      toggleTip();
    });
  };

  initTip();
  addevenTip();
});
