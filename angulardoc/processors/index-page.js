"use strict";

var _ = require('lodash');
var path = require('canonical-path');

/**
 * @dgProcessor generateIndexPagesProcessor
 * @description
 * This processor creates docs that will be rendered as the index page for the app
 */
module.exports = function generateIndexPagesProcessor() {
  return {
    deployments: [],
    $validate: {
      deployments: { presence: true },
      /**
       * todo: replace controller references with directives.
       * - testable: encapsulate specialized knowledge
       * - flexible: configurable via provider pattern
       * - cheaper: eat spaghettification / pay technical debt
       */
      ctrlNames: { }
    },
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: function(docs) {

      // Collect up all the areas in the docs
      var areas = {};
      docs.forEach(function(doc) {
        if ( doc.area ) {
          areas[doc.area] = doc.area;
        }
      });
      areas = _.keys(areas);

      var ctrlNames = _.defaults({
        DOCS: 'DocsController',
        SEARCH: 'DocsSearchCtrl',
        VERSIONS: 'DocsVersionsCtrl'
      }, this.ctrlNames);

      this.deployments.forEach(function(deployment) {

        var indexDoc = _.defaults({
          docType: 'indexPage',
          areas: areas,
          ctrlNames: ctrlNames
        }, deployment);

        indexDoc.id = 'index' + (deployment.name === 'default' ? '' : '-' + deployment.name);

        docs.push(indexDoc);
      });
    }
  };
};
