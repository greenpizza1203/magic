Drupal.behaviors.sEnrollmentSwitcher = function(context) {

    $('#enrollment-selector-sa:not(.sAssessment-processed)', context).addClass('sAssessment-processed').each(function() {
        $(this).selectmenu({
            style: 'dropdown',
            maxHeight: 400
        });
        $(this).change(function() {
            window.location.href = $(this).val();
        });
    });

    $('#submission-selector-sa:not(.sAssessment-processed)', context).addClass('sAssessment-processed').each(function() {
        $(this).selectmenu({
            style: 'dropdown',
            maxHeight: 400
        });
        $(this).change(function() {
            window.location.href = $(this).val();
        });
    });

}