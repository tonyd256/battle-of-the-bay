---
---
$(function() {
  $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbx3LUU2ujby8cfkc45GyrxHwYJUX2-Ol14Kjtk9NaygVFM57RPO/exec',
    dataType: 'json',
    cache: false,
    success: function (data) {
      console.log(data);
    },
    error: function (req, status, e) {
      console.error(e);
    }
  });
