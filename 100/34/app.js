$(function() {
    var $faces = $(document).find('.face');
    //        $faces.on('click', function(){
    //            $(this).toggleClass('transform');
    //        });

    $(document).on('click', '#btn-centralize-toggle', function() {
        $faces.toggleClass('centralize');
        if ($faces.hasClass('centralize')) {
            $(this).text('散开')
        } else {
            $(this).text('重叠')
        }
    });
    $(document).on('click', '#btn-transform-toggle', function() {
        $faces.toggleClass('transform');
        if ($faces.hasClass('transform')) {
            $(this).text('还原')
        } else {
            $(this).text('旋转+平移')
        }
    });
});
