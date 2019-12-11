$(function(){
  function buildHTML(data){
    if ( data.image ) {
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
      <img class="lower-message__image" src=${data.image}>
      </div>
      </div>`
    return html;
  } else { 
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

// 自動更新
// if(window.location.href.match(/\/groups\/\d+\/messages/))
