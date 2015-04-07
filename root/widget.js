/**
 * Copyright {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}{% if( homepage ) { %}
 * {%= homepage %}{% } %}
 */
define( [
   'angular'
], function( ng ) {
   'use strict';

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   Controller.$inject = [ '$scope' ];

   function Controller( $scope ) {
      /* :) */
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( '{%= angularModuleName %}', [] ).controller( '{%= angularControllerName %}', Controller );

} );
