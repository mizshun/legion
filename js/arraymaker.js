$(function () {
  var createTypeElem      = $('#createType'),
      createOptionElem    = $('#createOption'),
      createStyleElem     = $('#createStyle'),
      prefixValElem       = $('#prefixVal'),
      prefixNumElem       = $('#prefixNum'),
      resultArrTextElem   = $('#resultArrText'),
      resultArrLengthElem = $('#resultArrLength'),
      createType = createTypeElem.find(':checked').val(),
      options = {
        quote: $('[name="createOptionQuote"]').filter(':checked').val(),
        space: $('[name="createOptionSpace"]').filter(':checked').val()
      },
      prefixTempVal = '',
      prefixNum = prefixNumElem.val();

  createTypeElem.on('change', changeCreateType).change();
  createOptionElem.on('change', changeOptions);
  createStyleElem.on('keyup change', createArray);

  // 作成方法を取得
  function changeCreateType(event) {
    var tgVal  = event.target.value || createType;
    $('#style' + tgVal).siblings('div').hide()
        .end().show();
    createType = tgVal;
  }

  // オプションを取得
  function changeOptions(event) {
    var target = event.target,
        tgVal  = target.value;
    if (target.name === 'createOptionQuote') {
      options.quote = tgVal;
    }
    if (target.name === 'createOptionSpace') {
      options.space = tgVal;
    }
    createStyleElem.keyup();
  }

  // 結果文字列を出力
  function createArray(event) {
    var target = event.target,
        targetText = '',
        quoteType = '',
        resultArrText = '',
        resultArr  = [];

    // 文字列から処理
    if (createType === 'Text') {
      targetText = trim($('#textVal').val(), ' ');
      resultArr  = targetText.split(' ');
    }

    // プレフィックスから処理
    if (createType === 'Prefix') {
      // 長さ(値の数)
      if (target.id === 'prefixNum') {
        prefixNum = $.isNumeric(prefixNumElem.val()) ? Math.abs(prefixNumElem.val()) : 5;
      }
      // プレフィックス文字列
      if (target.id === 'prefixVal') {
        prefixTempVal = trim(prefixValElem.val(), '');
      }

      // プレフィックス共通処理
      targetText = '';
      for (var i = 0; i < prefixNum; i++) {
        targetText += prefixTempVal + i + ' ';
      }
      targetText = targetText.slice(0, -1);
      resultArr  = targetText.split(' ');
    }
    // 共通処理
    quoteType = options.quote === 's' ? "'" : '"';
    resultArrText = "[" + quoteType + resultArr.join(quoteType + ',' + options.space + quoteType) + quoteType + "]";
    setTimeout(function () {
      resultArrTextElem.val(resultArrText);
      resultArrLengthElem.text(resultArr.length);
    }, 100);
  }

  // 文字列の整形
  function trim(str, replaceChar) {
    return $.trim(str.replace(/\s+/g, replaceChar));
  }
});
