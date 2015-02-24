/**
 * Copyright 2014 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
'use strict';

var artifactType = 'widget';

// Basic template description.
exports.description = 'Create a LaxarJS ' + artifactType + ', including Jasmine specs';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'For more information about LaxarJS artifacts, ' +
   'please see the docs at ' +
   'https://github.com/LaxarJS/laxar/blob/master/docs/concepts.md#laxarjs-concepts';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You can now start developing your widget! For more information ' +
   'about developing widgets with LaxarJS, please refer to the manuals:' +
   '\n\n' +
   'https://github.com/LaxarJS/laxar/blob/master/docs/manuals/index.md#manuals';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function( grunt, init, done ) {

   var options = { type: artifactType };
   var prompts = require( './prompts' )( options, init );

   init.process( options, prompts, function( err, props ) {

      props.name = stripType( props.artifact, props.type );

      // Files to copy (and process).
      var files = init.filesToCopy( props );

      if( props.licenses[ 0 ] !== 'MIT' ) {
         init.addLicenseFiles( files, props.licenses );
      }

      // Actually copy (and process) files.
      init.copyAndProcess( files, props );

      // All done!
      done();

   });

};

function stripType( string, type ) {
   return string.replace( new RegExp( '[-_]' + type + '$', 'i' ), '' );
}
