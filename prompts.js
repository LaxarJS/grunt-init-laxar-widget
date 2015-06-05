/*global module */
/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
'use strict';

var path = require('path');

/**
 * Default prompts for Widgets/Activities.
 */
module.exports = function prompts( options, init ) {
   var type = options.type;
   var typeTitle = toTitleCase( type );

   var promptList = [
      extend( init.prompt( 'artifact' ), {
         message: typeTitle + ' artifact name (must be the directory name)',
         'default': function( value, props, done ) {
            done( null, path.basename( process.cwd() ) );
         }
      } ),
      extend( init.prompt( 'title' ), {
         message: typeTitle + ' title',
         'default': function( value, props, done ) {
            done( null, toCamelCase( props.artifact ) );
         }
      } ),
      init.prompt( 'description', 'My new LaxarJS ' + type ),
      extend( init.prompt( 'licenses' ), {
         validator: /^(?:[\w\-\.\d]+(?:\s+[\w\-\.\d]+)*)$/,
         default: 'none',
         sanitize: function( value, props, done ) {
            done( value && value !== 'none' ? value.split( /\s+/ ) : [] );
         }
      } ),
      init.prompt( 'homepage' ),
      init.prompt( 'author_name' ),
      init.prompt( 'version', '0.1.0-pre' )
   ];

   /**
    * Ask for the category first.
    */
   promptList.unshift( {
      name: 'category',
      message: typeTitle + ' category',
      default: function( value, props, done ) {
         var directoryParts = path.dirname( process.cwd() ).split( path.sep );
         done( null, directoryParts.pop() || 'misc' );
      }
   } );

   promptList.push( {
      name: 'laxar_integration_technology',
      message: 'Integration technology',
      default: 'angular',
      warning: 'Must be a valid LaxarJS widget integration technology (angular or plain).'
   } );

   return promptList;
};

function toCamelCase( string ) {
   return string.replace( /(^|_|-)([a-z])/g, function( x, y, initial ) {
      return initial.toUpperCase();
   } );
}

function toTitleCase( string ) {
   return string.replace( /(^|[_-]|([a-z]))([A-Za-z])/, function( x, y, last, initial ) {
      return ( last ? last + ' ' : '' ) + initial.toUpperCase();
   } );
}

function extend( object /*, source1, source2, ..., sourceN */ ) {
   return [].reduce.call( arguments, function( object, source ) {
      for( var key in source ) {
         if( source.hasOwnProperty( key ) ) {
            object[ key ] = source[ key ];
         }
      }
      return object;
   }, {} );
}
