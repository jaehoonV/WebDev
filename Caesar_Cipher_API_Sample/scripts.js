$('#execute').click(function(){
    let _type = $('#select_type').val();
    let _text = $('#input_text').val();
    let _shift = $('#shift').val();
    let _spe_num = $('#spe_num').val();

    $.ajax({
        url : "https://port-0-node-express-for-deploy-3sojxk2ilby9mu8p.gksl2.cloudtype.app/caesar/result",
        type : "POST",
        dataType : "JSON",
        data: {
            "type" : _type,
            "text" : _text,
            "shift" : _shift,
            "spe_num" : _spe_num
        }
    })
    .done(function (json){
        let json_data = JSON.parse(JSON.stringify(json));
        let result = `${json_data.result}`
        after_create_key(result, _type, _text, _shift, _spe_num);
    })
    .fail(function (xhr, status, errorThrown){
        alert("Ajax failed!");
    })
})

function after_create_key(result, type, text, shift, spe_num){
    $('#result').text(result);

    let create_div = `<div class='result_div'>
                        <div><span>result : ${result}</span></div>
                        <div><span>text : ${text}</span></div>
                        <div><span>type : ${type}</span></div>
                        <div><span>shift : ${shift}</span></div>
                        <div><span>spe_num : ${spe_num}</span></div>
                    </div>`;

    $('#result_div').append(create_div);

}

$('#show_code').click(function(){
    if($(this).hasClass('show') === true){
        $('#code_pre').animate({opacity : 0}, 'slow');
        $(this).removeClass('show');
        $(this).text('show');
    }else{
        $('#code_pre').animate({opacity : 1}, 'slow');
        $(this).addClass('show');
        $(this).text('hide');
    }
})

