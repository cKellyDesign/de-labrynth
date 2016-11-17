(function(scope, $, _, Backbone) {
    // Define App Name Space on Window
    scope.dLab = scope.dLab || {};

    var MenuView = Backbone.View.extend({

    });

    var AppView = Backbone.View.extend({
        initialize: function () {
            console.log('AppView Initialized!');
        }
    });

    var CheckListPageView = Backbone.View.extend({

    });

    var ChecklistItemView = Backbone.View.extend({

    });

    var ChecklistItemModel = Backbone.View.extend({

    });

    scope.dLab.appView = scope.dLab.appView || new AppView();

})(window, jQuery, _, Backbone);