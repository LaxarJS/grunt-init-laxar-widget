/**
 * Copyright {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}{% if( homepage ) { %}
 * {%= homepage %}{% } %}
 */
( function( global ) {
   'use strict';
   global.laxarSpec = {
      title: '{%= title %} Specification',
      tests: [
         '{%= artifact %}.spec'
      ]
   };
} )( this );
