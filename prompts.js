/**
 * Copyright 2014 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
'use strict';

var path = require('path');
var semver = require('./semver');

/**
 * Default prompts for Widgets, Activities, etc.
 */
module.exports = function prompts( options, init, callback ) {
   var type = options.type;
   var typeTitle = toTitleCase( type );

   var isApp = /application$/.test(type);
   var isWidget = /(widget|activity)$/.test(type);

   var promptList = [
      extend( init.prompt( 'artifact' ), {
         message: typeTitle + ' artifact name (must be the directory name)',
         default: function( value, props, done ) {
            done( null, path.basename( process.cwd() ) );
         }
      } ),
      extend( init.prompt( 'title' ), {
         message: typeTitle + ' title',
         default: function( value, props, done ) {
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
      init.prompt( 'version' ),
      {
         name: 'laxar_version',
         message: 'LaxarJS major version (0.x should be ok, but make sure laxar is 0.23.x or newer)',
         default: '0.x',
         validator: function( range ) {
            /* grunt-init tests validator.length */
            return semver.validRange( range );
         },
         warning: 'Must be a valid semantic version range descriptor.'
      }
   ];

   if( isApp ) {
      promptList.push( {
         name: 'laxar_port',
         message: 'Development server port',
         default: 8000,
         validator: /\d+/,
         warning: 'Must be a valid HTTP port number'
      } );
   }
   else if( isWidget ) {
      /**
       * Ask for the widget namespace first.
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
   }

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
