Drupal.theme.prototype.popupTemplate = function(popupId) {
    var template = '';
    template += '<div id="' + popupId + '" class="popups-box" role="dialog">';
    template += '  <div class="popups-title">';
    template += '    <div class="popups-close"><a href="javascript://"><span class="visually-hidden">' + Drupal.t('Close') + '</span></a></div>';
    template += '    <div class="title">%title</div>';
    template += '    <div class="clear-block"></div>';
    template += '  </div>';
    template += '  <div class="popups-body" tabindex="0">%body</div>';
    template += '  <div class="popups-buttons tabindex="0">%buttons</div>';
    template += '  <div class="popups-footer"></div>';
    template += '</div>';
    return template;
};