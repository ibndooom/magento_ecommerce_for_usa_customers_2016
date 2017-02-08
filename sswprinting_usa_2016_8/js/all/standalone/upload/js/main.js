/*
 * jQuery File Upload Plugin JS Example 8.9.1
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global $, window */

$j(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $j('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: '/uploader/'
    });

    // Enable iframe cross-domain access via redirect option:
    $j('#fileupload').fileupload(
        'option',
        {
        	maxFileSize: 100000000,
        	disableImagePreview: false,
        	previewMaxWidth: 800,
            previewMaxHeight: 800,
            previewCrop: true,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png|psd|ai|cdr|pdf|eps|tiff|svg|doc|zip|ps|docx|pub)$/i,
            autoUpload: true
        },
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/uploader/cors/result.html?%s'
        )
    );

//    if (window.location.hostname === 'pixopa.localhost.com') {
//        // Demo settings:
//        $('#fileupload').fileupload('option', {
//            url: '//jquery-file-upload.appspot.com/',
            // Enable image resizing, except for Android and Opera,
            // which actually support image resizing, but fail to
            // send Blob objects via XHR requests:
//            disableImageResize: /Android(?!.*Chrome)|Opera/
//                .test(window.navigator.userAgent),
//            maxFileSize: 5000000,
//            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
//        });
        // Upload server status check for browsers with CORS support:
//        if ($.support.cors) {
//            $.ajax({
//                url: '//jquery-file-upload.appspot.com/',
//                type: 'HEAD'
//            }).fail(function () {
//                $('<div class="alert alert-danger"/>')
//                    .text('Upload server currently unavailable - ' +
//                            new Date())
//                    .appendTo('#fileupload');
//            });
//        }
//    } else {
        // Load existing files:
        $j('#fileupload').addClass('fileupload-processing');
        $j.ajax({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            url: $j('#fileupload').fileupload('option', 'url'),
            dataType: 'json',
            context: $j('#fileupload')[0]
        }).always(function () {
            $j(this).removeClass('fileupload-processing');
        }).done(function (result) {
            $j(this).fileupload('option', 'done')
                .call(this, $j.Event('done'), {result: result});
        });
//    }

});
