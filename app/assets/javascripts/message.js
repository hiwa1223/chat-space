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
      console.log(data)
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
})


// 自動更新
$(function(){
  function buildHTML2(message){
    if (message.content && message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>`
        `<div class="upper-message">`
          `<div class="upper-message__user-name">`
            message.user_name
          `</div>`
          `<div class="upper-message__date">`
            message.created_at
          `</div>`
        `</div>`
        `<div class="lower-message">`
          `<p class="lower-message__content">`
            message.content
          `</p>`
          `<img src="` + message.image + `" class="lower-message__image" >`
        `</div>`
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>`
        `<div class="upper-message">`
          `<div class="upper-message__user-name">`
            message.user_name
          `</div>`
          `<div class="upper-message__date">`
            message.created_at
          `</div>`
        `</div>`
        `<div class="lower-message">`
          `<p class="lower-message__content">`
            message.content
          `</p>`
        `</div>`
      `</div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id=` + message.id + `>`
        `<div class="upper-message">`
          `<div class="upper-message__user-name">`
            message.user_name
          `</div>`
          `<div class="upper-message__date">`
            message.created_at
          `</div>`
        `</div>`
        `<div class="lower-message">`
          `<img src="` + message.image + `" class="lower-message__image" >`
        `</div>`
      `</div>`
    };
    return html;
  }
  });







  var reloadMessages = function() {
    last_message_id = $(".message").last().data("messageId");
    if(window.location.href.match(/\/groups\/\d+\/messages/))
    $.ajax({
      url: `/groups/${httpId}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
        // let html = buildHTML(data);
        // $('.messages').append(html); 
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML2(message)
   
      $('.messages').append(insertHTML);
    });
  });

    // .fail(function() {
    //   alert('自動更新に失敗しました');
    // })

  setInterval(reloadMessages, 7000);

  };
