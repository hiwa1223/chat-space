$(function(){
  function buildHTML(data){
    if ( data ) {
    var html =`<div class="message">
                <div class="upper-message">
                <div class="upper-message__user-name">
                  ${data.name}
                </div>
                <div class="upper-message__date">
                  ${data.created_at}
                </div>
                </div>
                <div class="lower-message">
                <p class="lower-message__content">
                  ${data.content}
                </p>

                </div>
                </div>`
    return html;
  } else {
    var html = `<div class="message">
                <div class="upper-message">
                <div class="upper-message__user-name">
                  ${data.name}
                </div>
                <div class="upper-message__date">
                  ${data.created_at}
                </div>
                </div>
                <div class="lower-message">
                <p class="lower-message__content">
                  ${data.content}
                </p>
                <img class="lower-message__image" src="/uploads/message/image/9/%E3%82%82%E3%81%A3%E3%81%A8%E3%83%9B%E3%83%A1%E3%81%A6%E3%81%8F%E3%82%8C.jpg" alt="%e3%82%82%e3%81%a3%e3%81%a8%e3%83%9b%e3%83%a1%e3%81%a6%e3%81%8f%e3%82%8c">
                </div>
                </div>`
      return html;
    };
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault() 
    let formdata = new FormData(this);
    let url = $(this).attr("action");
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formdata,  
      dataType: 'json',
      processData: false,
      contentType: false,
   })
    .done(function(data) {
      let html = buildHTML(data);
      $('.messages').append(html); 
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    return false; 
  })

  
});
