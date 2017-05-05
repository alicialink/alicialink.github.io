// Reworked according to John Papa's Angular style guide
//
// https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md


/*** BEGIN isotopelist.model.js ***/
(function() {
  angular
    .module("isotopelist.model", [])
    .service("IsotopeListModel", IsotopeListModelFn)
  
  function IsotopeListModelFn() {
    var model = this;
    var isotopeList = NUCLIDES_ARRAY;
    model.getIsotopeList = function () {
      return isotopeList;
    };
  }
})();
/*** END isotopelist.model.js ***/


/*** BEGIN isotopelist.filter.js ***/
(function() {
  angular
    .module("isotopelist.filter", [])
    .filter("isotopeFilter", isotopeFilter)
  
  function isotopeFilter() {
    return function(isotopes, search) {
      var output = [];
      angular.forEach(isotopes, function(isotope) {
        if (cie(isotope.sym, search) || cie(isotope.name, search)) {
          output.push(isotope);
        }
      });
      
      function cie(expected, fragment) {
        return expected.toUpperCase().indexOf(fragment.toUpperCase()) !== -1;
      }

      return output;
    };
  }
})();
/*** END isotopelist.filter.js ***/


/*** BEGIN isotoplist.controller.js ***/
(function() {
  angular
  .module("isotopelist.controller", ["isotopelist.model"])
  .controller("IsotopeListController", IsotopeListControllerFn);
 
  function IsotopeListControllerFn(model) {
    var vm = this;
    vm.zElement = "";
    vm.isotopes = model.getIsotopeList();
    vm.resetSearch = resetSearch;
  
    function resetSearch() {
      console.log("Hello!");
      vm.zElement = "";
    }
  }
  
  IsotopeListControllerFn.$inject = ["IsotopeListModel"];
})();
/*** END isotoplist.controller.js ***/


/*** BEGIN isotoplist.app.js ***/
(function() {
  angular
    .module("isotopelist.app", [
      "isotopelist.model",
      "isotopelist.filter",
      "isotopelist.controller"
    ]);
})();
/*** END isotoplist.js ***/