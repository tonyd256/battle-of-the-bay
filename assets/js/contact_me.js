---
---
$(function() {

  $("#submissionForm input,#submissionForm select").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      grecaptcha.ready(function() {
        grecaptcha.execute('6LeKhrYZAAAAAEQYC7lAT4nnFKP1SMRetWWvR_Gb', {action: 'submit'}).then(function(token) {
          var url = "https://script.google.com/macros/s/AKfycbx3LUU2ujby8cfkc45GyrxHwYJUX2-Ol14Kjtk9NaygVFM57RPO/exec";
          $this = $("#submitFormButton");
          $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
          const data = new FormData($form[0]);
          data.append('token', token);

          $.ajax({
            url: url,
            type: "POST",
            data: data,
            enctype: 'multipart/form-data',
            contentType: false,
            processData: false,
            cache: false,

            success: function() {
              // Success message
              $('#success').html("<div class='alert alert-success'>");
              $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
              $('#success > .alert-success')
                .append("<strong>Your time has been submitted.</strong>");
              $('#success > .alert-success')
                .append('</div>');
              //clear all fields
              $('#submissionForm').trigger("reset");
            },

            error: function() {
              // Fail message
              $('#success').html("<div class='alert alert-danger'>");
              $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
              $('#success > .alert-danger').append($("<strong>").text("Something is wrong. Please try again later!"));
              $('#success > .alert-danger').append('</div>');
              //clear all fields
              $('#submissionForm').trigger("reset");
            },

            complete: function() {
              setTimeout(function() {
                $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
              }, 1000);
            }
          });

        });
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
