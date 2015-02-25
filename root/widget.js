/**
 * Copyright {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}{% if( homepage ) { %}
 * {%= homepage %}{% } %}
 */
define( [
   'angular'
], function( ng ) {
   'use strict';

   var moduleName = '{%= angularModuleName %}';
   var module     = ng.module( moduleName, [] );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   Controller.$inject = [ '$scope' ];

   function Controller( $scope ) {
      /* :) */
   }

   module.controller( '{%= angularControllerName %}', Controller );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return module;

} );
