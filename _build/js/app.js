(function(scope, $, _, Backbone) {
    // Define App Name Space on Window
    scope.dLab = scope.dLab || {};

    // What will render the menu
    var MenuView = Backbone.View.extend({

    });

    // Page Level App View
    var AppModel = Backbone.Model.extend();
    var AppView = Backbone.View.extend({
        template: _.template($('#AppTemplate').html()),

        initialize: function () {
            console.log(this.model.attributes);
            this.render();
            this.initChecklistPanelPages();
        },

        initChecklistPanelPages: function() {
            if ( !scope.dLab.viewModel.checklistPages || !scope.dLab.viewModel.checklistPages.length ) {
                return false;
            }

            var self = this;

            $.each(scope.dLab.viewModel.checklistPages, function(i, panelData) {
                var el = $('<div class="col-md-3"></div>');
                var pagePanel= new ChecklistPageLinkPanelView({
                    el: el,
                    model: new ChecklistPageLinkPanelModel(panelData)
                });
                $('#Content').append(el);
            });
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });


    // Item level View for Checklist Page Link Panels on the Homepage
    var ChecklistPageLinkPanelModel = Backbone.Model.extend();
    var ChecklistPageLinkPanelView = Backbone.View.extend({
        template: _.template($('#ChecklistPageLinkPanel').html()),

        initialize : function() {
            this.render();
        },
        
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });


    
    var CheckListPageView = Backbone.View.extend({

    });

    var ChecklistItemView = Backbone.View.extend({

    });

    var ChecklistItemModel = Backbone.View.extend({

    });

    scope.dLab.appView = scope.dLab.appView || new AppView({ el: $('#AppEl'), model: new AppModel(scope.dLab.viewModel.home) });

})(window, jQuery, _, Backbone);