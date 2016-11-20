(function(scope, $, _, Backbone) {
    // Define App Name Space on Window
    scope.dLab = scope.dLab || {
        getViewModel : function () {
            return JSON.parse(scope.localStorage.getItem('viewModel'));
        },
        setViewModel : function (data) {
            scope.localStorage.setItem('viewModel', JSON.stringify(data));
        },
        baseViewModel :{
            nav : {
                items: [
                    {
                        title: 'Home',
                        url: '/'
                    },{
                        title: 'Profile',
                        url: '/#'
                    },{
                        title: 'Help',
                        url: '/#'
                    },{
                        title: 'Log Out',
                        url: '/#'
                    }
                ]
            },
            home : {
                blurb: 'site level summary / blurb can go here',
                    landingIMG : {
                    title: 'img title',
                        alt: 'img alt',
                        src: 'img src'
                }
            },
            checklistPages : [
                {
                    title : 'Test 1',
                    slug : 'test1',
                    blurb: 'this is a blurb for test 1',
                    items : [
                        {
                            completed: true,
                            isRelevant : true,
                            title : 'Test Item 1',
                            type : 'check',
                            linkText : 'This is a link',
                            externalLink : 'http://www.google.com'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Test Item 2',
                            type : 'check',
                            linkText : 'This is a link',
                            externalLink : 'http://www.google.com'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Test Item 3',
                            type : 'check',
                            linkText : 'This is a link',
                            externalLink : 'http://www.google.com'
                        }
                    ]
                },{
                    title : 'Test 2',
                    slug : 'test2',
                    blurb: 'this is a blurb for test 2',
                    items : [
                        {
                            completed: false,
                            isRelevant : true,
                            title : 'Test Item 1',
                            type : 'check',
                            linkText : 'This is a link',
                            externalLink : 'http://www.google.com'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Test Item 2',
                            type : 'check',
                            linkText : 'This is a link',
                            externalLink : 'http://www.google.com'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Test Item 3',
                            type : 'check',
                            linkText : 'This is a link',
                            externalLink : 'http://www.google.com'
                        }
                    ]
                }
            ]
        }
    };

    if ( !scope.dLab.getViewModel() ) {
        scope.dLab.setViewModel(scope.dLab.baseViewModel);
    }
    scope.dLab.viewModel = scope.dLab.getViewModel();
    

    // What will render the menu
    var MenuView = Backbone.View.extend({

    });

    // Root App View
    var AppModel = Backbone.Model.extend();
    var AppView = Backbone.View.extend({

        template: _.template($('#AppTemplate').html()),
        isHome: $('body').hasClass('home'),
        isChecklist: $('body').hasClass('checklist'),
        pageSlug: undefined,

        initialize: function () {
            console.log(this.model.attributes);
            this.render();

            if ( this.isHome ) {
                this.initChecklistPanelPages();
            } else {
                this.getPageSlug();
                this.initChecklistPage(this.pageSlug);
            }

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

        getPageSlug: function () {
            var pathName = scope.location.pathname;
            this.pageSlug = pathName.replace('/list/', '');
        },

        initChecklistPage: function (slug) {
            var modelFromSlug = _.findWhere(scope.dLab.viewModel.checklistPages,{ slug : slug });
            if ( modelFromSlug === undefined) {
                return false;
            }

            scope.dLab.checkListPage = new CheckListPageView({
                el : $('#Content'),
                // viewModel: modelFromSlug,
                model: new CheckListPageModel(modelFromSlug)
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


    var CheckListPageModel = Backbone.Model.extend();
    var CheckListPageView = Backbone.View.extend({
        
        pageTemplate: _.template($('#ChecklistPageContainer').html()),
        checkListTemplate:  _.template($('#ChecklistPageItems').html()),

        initialize : function() {
            console.log('Checklist page init');
            this.$el.html(this.pageTemplate(this.model.attributes));
            this.render();
        },

        render: function() { 
            
        
            this.renderTodo();
            this.renderComplete();
            this.renderDismissed();
            return this;
        },

        renderTodo: function () {
            var todoItems = [];
            $.each(this.model.attributes.items, function (i, item) {
                if ( !item.completed && item.isRelevant) {
                    todoItems.push(item);
                }
            });
            console.log(todoItems);
            $('#checklistContainer > ul', this.$el).html(this.checkListTemplate({ items : todoItems }));
        },

        renderComplete: function () {
            var completeItems = [];
            $.each(this.model.attributes.items, function (i, item) {
                if ( item.completed && item.isRelevant) {
                    completeItems.push(item);
                }
            });
            $('#completedItems > ul', this.$el).html(this.checkListTemplate({ items : completeItems }));
        },

        renderDismissed: function () {
            var dismissedItems = [];
            $.each(this.model.attributes.items, function (i, item) {
                if ( !item.isRelevant) {
                    dismissedItems.push(item);
                }
            });
            $('#notRelevantItems > ul', this.$el).html(this.checkListTemplate({ items : dismissedItems }));
        }

    });

    var ChecklistItemView = Backbone.View.extend({

    });

    var ChecklistItemModel = Backbone.View.extend({

    });

    // scope.baseViewModel = ;
    scope.dLab.appView = scope.dLab.appView ||
        new AppView({
            el: $('#AppEl'),
            model: new AppModel(scope.dLab.viewModel.home)
        });

})(window, jQuery, _, Backbone);