"use strict";

// Theme Use
var dog, simformBg;
var nextBg = ['#FFD96C', '#7EE88B', '#5282FF', '#E83F88', '#FFC445', '#3F51B5'];
// Tip Use
var isTipShow, $tipWrap, $mapWrap;
// Cookie Use
var COOKIE_NAME = "step";

// Theme stuff
function initTheme() {
  dog = document.getElementById('dog');
  simformBg = document.getElementById('theForm');
}

function setTheme(currentStep) {
  dog.src = 'images/main0' + currentStep + '.png';
  simformBg.style.backgroundColor = nextBg[currentStep];
  var tipElements = $('.tips');
  tipElements.removeClass('active');
  $(tipElements[currentStep]).addClass('active');
}

// Map Stuff
function addMapScript() {
  addScriptToHtml("js/map.js");
  addScriptToHtml("https://maps.googleapis.com/maps/api/js?v=3&signed_in=true&callback=initMap");
}

function addScriptToHtml(srcPath) {
  var scriptElement = document.createElement("script");
  scriptElement.src = srcPath;
  scriptElement.async = true;
  var firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(scriptElement, firstScript);
}

// Get request param
function getRequestParam(name){
  if(name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}

// Cookie Stuff
function setStepCookie(currentStep, expiryHours) {
  setCookie(COOKIE_NAME, currentStep, expiryHours/24);
}

function getStepCookieValue() {
  return getCookie(COOKIE_NAME);
}

function deleteStepCookie() {
  if(getRequestParam("env")) {
    setCookie(COOKIE_NAME, 0, -1);
    location.reload();
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

// API Stuff
function parseAPI(method, classes, data) {
  var dataPrefix = "";
  if(method === "get") {
    dataPrefix = "where=";
  }
  return $.ajax({
    url: "https://api.parse.com/1/classes/" + classes,
    method: method,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function(request) {
      request.setRequestHeader("X-Parse-Application-Id", '7OIk98BkPkgNcZWRIlzaRkz3VPVBjDzkYJ4UGg6p');
      request.setRequestHeader("X-Parse-REST-API-Key", 'GI4UKLbxWB6blOjORDDl9ukV6Nt53nHfCMloqgmP');
    },
    data: dataPrefix + JSON.stringify(data)
  });
}

function queryParseAPI(classes, where) {
  return parseAPI("get", classes, where);
}

function createParseAPI(classes, data) {
  parseAPI("post", classes, data);
}

function getHatStepData() {
  return queryParseAPI("Checkin", {stepEvent: "hat"});
}

function getBedStepData() {
  return queryParseAPI("Checkin", {stepEvent: "sleepAtBed"});
}

function setStepAnswerData(step, question, answer) {
  var object = {
    step: step,
    question: question,
    answer: answer
  };
  return createParseAPI("Answer", object);
}

// Tip Stuff
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

