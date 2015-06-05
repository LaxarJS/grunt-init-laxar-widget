/**
 * Copyright {%= grunt.template.today('yyyy') %} {%= author_name %}{% if( licenses.length ) { %}
 * Released under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}{% if( homepage ) { %}
 * {%= homepage %}{% } %}
 */
define( [
   '../{%= artifact %}',
   'laxar/laxar_testing'
], function( widgetModule, ax ) {
   'use strict';

   describe( 'A {%= title %}', function() {

      var testBed;

      beforeEach( function setup() {
         testBed = ax.testing.portalMocksAngular.createControllerTestBed( '{%= category %}/{%= artifact %}' );
         testBed.featuresMock = {};
         testBed.setup();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      afterEach( function() {
         testBed.tearDown();
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      it( 'still needs some tests.' );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

   } );

} );
