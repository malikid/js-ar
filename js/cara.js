"use strict";

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
  // return $.ajax({
  //   url: "https://api.parse.com/1/classes/Checkin",
  //   dataType: 'json',
  //   contentType: 'application/json',
  //   beforeSend: function(request) {
  //     request.setRequestHeader("X-Parse-Application-Id", '7OIk98BkPkgNcZWRIlzaRkz3VPVBjDzkYJ4UGg6p');
  //     request.setRequestHeader("X-Parse-REST-API-Key", 'GI4UKLbxWB6blOjORDDl9ukV6Nt53nHfCMloqgmP');
  //   },
  //   data: "where=" + JSON.stringify({
  //     stepEvent: "hat"
  //   })
  // });
  return queryParseAPI("Checkin", {stepEvent: "hat"});
}


$(function() {

  var windowH = $(window).height();
  var $tipWrap = $('.tip-wrap');
  var $btnTipIcon = $('.btn.tip-icon');
  var isTipShow = false;

  var initTip = function() {

    $tipWrap.css('height', windowH);
    $('body').css('height', windowH);
  };

  var addevenTip = function() {

    $btnTipIcon.on('click', function() {

      if(!isTipShow) {

        isTipShow = true;

        $tipWrap.removeClass('tip-hide').addClass('tip-show');
      } else {
        isTipShow = false;

        $tipWrap.removeClass('tip-show').addClass('tip-hide');
      }
    });
  };

  initTip();
  addevenTip();
});





