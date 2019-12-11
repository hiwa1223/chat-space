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
$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $(".message").last().data("messageId");
    if(window.location.href.match(/\/groups\/\d+\/messages/))
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: `/groups/${httpId}/api/messages`,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
        let html = buildHTML(data);
        $('.messages').append(html); 
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').append(insertHTML);
    })
    .fail(function() {
      console.log('error');
    })
  }
  setInterval(reloadMessages, 7000);
})
