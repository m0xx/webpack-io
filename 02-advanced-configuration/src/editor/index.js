// import libs
var $ = jQuery = require('jquery');
require('bootstrap');

// import styles
require('./../../styles/index.less')

// import templates
var welcomeHtml = require('./templates/welcome.md');
var contentHtml = require('./templates/content.html');
var modalHtml = require('./templates/modal.html');

// tinymce instance loaded on demand
var tinymce = null;

// domready
$(function() {

    // render page
    var $body = $("body");
    $body.append(contentHtml);
    $body.append(modalHtml);

    // cache element
    var $htmlMessage = $("#html-message");
    var $btnEdit = $("#btn-edit");
    var $modal = $("#modal-editor");
    var $btnSave = $("#btn-save");

    // internals methods
    var internals = {
        updateMessage: function(html) {
            $htmlMessage.html(html);
        },
        getDisplayedMessage: function() {
            return $htmlMessage.html();
        },
        initEditor: function(cb) {
            if(!tinymce) {
                // define split point
                require.ensure(['vendors/tinymce'], function(require) {
                    // set current tinymce instance
                    tinymce = require('vendors/tinymce');

                    tinymce.init({
                        selector: 'textarea',
                        height: 500,
                        menubar: false,
                        skin: false,
                        toolbar: 'undo redo | insert | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    });

                    cb(null, tinymce);
                })
            }
            else {
                cb(null, tinymce)
            }
        },
        openModal: function() {
            $modal.modal('show');
        },
        closeModal: function() {
            $modal.modal('hide');
        },
        edit: function(html, cb) {
            $modal.on('shown.bs.modal', internals.initEditor(function() {
                // set editor content
                tinymce.activeEditor.setContent(html, {format: 'raw'});
            }))

            internals.openModal();
        },
    }

    // edit button click handler
    $btnEdit.click(function() {
        var html = internals.getDisplayedMessage();

        internals.edit(html, function(err, message) {
            if(err) {
                return;
            }

            internals.updateMessage(message);
        })
    });


    // modal save button click handler
    $btnSave.click(function() {
        var html = tinymce.activeEditor.getContent(html, {format: 'raw'});
        internals.updateMessage(html)
        internals.closeModal()
    })

    // set initial message
    internals.updateMessage(welcomeHtml);
})

// enable hot replacement
if(module.hot) {
    module.hot.accept()

    module.hot.dispose(function() {

        // remove side effect
        $(".container:last").remove();
        $("#btn-edit:last").remove();
    })
}
