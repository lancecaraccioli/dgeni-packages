"use strict";

var _ = require('lodash');

/**
 * @dgProcessor generateBrandingDocProcessor
 * @description
 * This processor will create a new doc that will be rendered as a JavaScript file
 * containing meta information about the system branding
 */
module.exports = function generateBrandingDocProcessor() {
  return {
    $validate: {
      brand: {presence: true}
    },
    $runAfter: ['generatePagesDataProcessor'],
    $runBefore: ['rendering-docs'],
    $process: function(docs) {

      var brandingDoc = {
        docType: 'branding-data',
        id: 'branding-data',
        template: 'branding-data.template.js',
        outputPath: 'js/branding-data.js',
        brand: this.brand
      };

      docs.push(brandingDoc);
    }
  };
};
