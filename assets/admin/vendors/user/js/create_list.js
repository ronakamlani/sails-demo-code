$(document).ready(function () {
    var queryString = $('#queryString').val();
    var count = $('#count').val();  
    var totalPages=((count%3)==0)?count/3:count/3+1;

    $('#pagination-demo').twbsPagination({
      totalPages: totalPages,
      visiblePages: 5,
      href: '?page={{number}}&'+queryString
        
    });  
  $('#datepickerFrom').datepicker({
      autoclose: true
    });
  $('#datepickerTo').datepicker({
      autoclose: true
    });
  $('#btnValidate').click(function() {
        var from = $('#datepickerFrom').val();
        var  to= $('#datepickerTo').val();     
        if($.trim(from).length == 0 && $.trim(to).length != 0){        
          alert('To Date cannot be without From Date');
          return false;
        } 
        if($.trim(from).length != 0 && $.trim(to).length == 0){        
          alert('From Date cannot be without To Date');
          return false;
        }       
        if($.trim(from).length != 0 && $.trim(to).length != 0 && to<=from){
          alert("To Date should be greater than From Date");
          return false;
        } 
    });
  $("#myTable").tablesorter({widgets: ['zebra'],
    // pass the headers argument and assing a object
    headers: {
      // assign the secound column (we start counting zero)
      0: {
        // disable it by setting the property sorter to false
        sorter: false
      },
      // assign the third column (we start counting zero)
      7: {
        // disable it by setting the property sorter to false
        sorter: false
      },
      8: {
        // disable it by setting the property sorter to false
        sorter: false
      },
      9: {
        // disable it by setting the property sorter to false
        sorter: false
      },
      10:{
        sorter: false
      }
    }
  });

	var checkboxes = document.getElementsByClassName("checkbox");
        for (var i = 0; i < checkboxes.length ; i++) {
          checkboxes[i].checked=false;
        }  
        $("#check-all").click(function() {
          if($(this).is(':checked')){
            var checkboxes = document.getElementsByClassName("checkbox");
            for (var i = 0; i < checkboxes.length ; i++) {
              checkboxes[i].checked = true;
            }  
          }
          else{
            var checkboxes = document.getElementsByClassName("checkbox");
            for (var i = 0; i < checkboxes.length ; i++) {
              checkboxes[i].checked=false;
            }  
          }
        });  
        $(".sendID").click(function() {
        var id = [];
        var checkboxes = document.getElementsByClassName("checkbox");
        for (var i = checkboxes.length -1 ; i>= 0; i--) {
            if (checkboxes[i].type === "checkbox" && checkboxes[i].checked) {
              id.push(checkboxes[i].value);
            }
        }
        var link = "/admin/user/delete_all?";
        for(var i = 0; i < id.length; i++){
          link += "id=" + id[i] + "&";
        } 
        $(this).attr("href", link);
      });
    });