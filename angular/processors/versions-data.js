"use strict";

var _ = require('lodash');

/**
 * @dgProcessor generateVersionDocProcessor
 * @description
 * This processor will create a new doc that will be rendered as a JavaScript file
 * containing meta information about all system versions and the current system version
 */
module.exports = function generateVersionDocProcessor() {
  return {
    $validate: {
      versions: {presence: true},
      currentVersion: {presence: true}
    },
    $runAfter: ['generatePagesDataProcessor'],
    $runBefore: ['rendering-docs'],
    $process: function(docs) {

      var versionDoc = {
        docType: 'versions-data',
        id: 'versions-data',
        template: 'versions-data.template.js',
        outputPath: 'js/versions-data.js',
        currentVersion: this.currentVersion
      };

      versionDoc.versions = _(this.versions)
        .filter(function(version) { return version.major > 0; })
        .push(this.currentVersion)
        .reverse()
        .value();

      docs.push(versionDoc);
    }
  };
};
