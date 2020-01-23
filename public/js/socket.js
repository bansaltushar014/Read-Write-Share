var socket = io();

    $(document).ready(function () {

      $('.btn-chat').on('click', function (event) {
        var data = {
          nama: $('#nama').val(),
          message: $('.text-chat').val()
        }
        if ($('#nama').val() == '') {
          $('#nama').css('border', '1px solid red');
        } else {
          $('#nama').css('border', '1px solid #ccc;');
          kirim_pesan(data);
          $('.text-chat').val('');
        }
      });

      $(".text-chat").keypress(function (event) {
        if (event.which == 13) {
          var data = {
            nama: $('#nama').val(),
            message: $('.text-chat').val()
          }
          if ($('#nama').val() == '') {
            $('#nama').css('border', '1px solid red');
          } else {
            $('#nama').css('border', '1px solid #ccc;');
            kirim_pesan(data);
            $('.text-chat').val('');
          }
        }
      });

    });