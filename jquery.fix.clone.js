// Textarea and select clone() bug workaround | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Motivation.
// jQuery's clone() method works in most cases, but it fails to copy the value of textareas and select elements. This patch replaces jQuery's clone() method with a wrapper that fills in the
// values after the fact.

// An interesting error case submitted by Piotr Przybył: If two <select> options had the same value, the clone() method would select the wrong one in the cloned box. The fix, suggested by Piotr
// and implemented here, is to use the selectedIndex property on the <select> box itself rather than relying on jQuery's value-based val().

(function (original) {
  jQuery.fn.clone = function () {
    var result            = original.apply(this, arguments),
        my_textareas      = this.find('textarea').add(this.filter('textarea')),
        result_textareas  = result.find('textarea').add(result.filter('textarea')),
        my_selects        = this.find('select').add(this.filter('select')),
        result_selects    = result.find('select').add(result.filter('select')),
        my_checkboxes     = this.find('input[type=checkbox]').add(this.filter('input[type=checkbox]')),
        result_checkboxes = result.find('input[type=checkbox]').add(result.filter('input[type=checkbox]'));

    for (var i = 0, l = my_textareas.length;  i < l; ++i) $(result_textareas[i]).val($(my_textareas[i]).val());
    for (var i = 0, l = my_selects.length;    i < l; ++i) result_selects[i].selectedIndex = my_selects[i].selectedIndex;
    for (var i = 0, l = my_checkboxes.length; i < l; ++i) $(result_checkboxes[i]).attr('checked', my_checkboxes[i].checked);

    return result;
  };
}) (jQuery.fn.clone);

// Generated by SDoc 
