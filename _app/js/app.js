(function(scope, $, _, Backbone) {
    // Define App Name Space on Window
    scope.localStorage.clear();
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
                title: 'Welcome to UW Husky Start!',
                blurb: 'New to the university and not sure where to start? UW Husky Start helps you figure out everything you need to get a head start in the school year.',
                landingIMG : {
                    title: 'img title',
                    alt: 'img alt',
                    src: 'img src'
                }
            },
            checklistPages : [
                {
                    title : 'Financial Aid',
                    slug : 'fin-aid',
                    blurb: 'Financial Aid is any grant or loan offered to help a student meet his/her college expenses. Such aid is usually provided by various sources such as federal and state agencies, colleges, and foundations.',
                    items : [
                        {
                            completed: true,
                            isRelevant : true,
                            title : 'FAFSA',
                            type : 'check',
                            linkText : 'FAFSA Homepage',
                            externalLink : 'https://fafsa.ed.gov/'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'FAFSA Status',
                            type : 'check',
                            linkText : 'Check your FASFA status',
                            externalLink : 'https://sdb.admin.uw.edu/sisStudents/uwnetid/finaidstatus.aspx'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Financial Aid Award Letter',
                            type : 'check',
                            linkText : 'Review your Financial Aid Award Letter',
                            externalLink : 'https://sdb.admin.uw.edu/sisStudents/uwnetid/finaidstatus.aspx'
                        }
                    ]
                },{
                    title : 'Housing',
                    slug : 'housing',
                    blurb: 'Here is a checklist that assists you in finding somewhere to live when you go to college.',
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
                },{
                    title : 'Registration and Orientation',
                    slug : 'registration',
                    blurb: 'Registration is the process of becoming a student at The University of Washington. Registration allows you to get a student ID number, enroll in classes, and go to orientation. Orientation is a guided session by current students and faculty to provide you with an opportunity to meet with an academic adviser, register for classes, be introduced to UW online resources and services, meet new and current students, and learn how to get involved at the UW.',
                    items : [
                        {
                            completed: true,
                            isRelevant : true,
                            title : 'Husky Card',
                            type : 'check',
                            linkText : 'Get your Husky Card today!',
                            externalLink : 'https://www.hfs.washington.edu/huskycard/#gsc.tab=0'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Dawg Daze',
                            type : 'check',
                            linkText : 'Going to Dog Daze? Find out more!',
                            externalLink : 'http://www.uwdawgdaze.com/'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'F.I.G.',
                            type : 'check',
                            linkText : 'Sign up for your First Year Interest Group',
                            externalLink : 'https://fyp.washington.edu/first-year-interest-groups/'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Registration',
                            type : 'check',
                            linkText : 'Register for your classes',
                            externalLink : 'https://sdb.admin.uw.edu/students/uwnetid/register.asp'
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
                this.initHomePage();
            } else {
                this.getPageSlug();
                this.initChecklistPage(this.pageSlug);
            }

        },



        initHomePage: function() {
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



        initChecklistPage: function (slug) {
            // Determine and Update Page Level Model
            var modelFromSlug = _.findWhere(scope.dLab.viewModel.checklistPages,{ slug : slug });
            if ( modelFromSlug === undefined) {
                return false;
            }
            this.model.set(modelFromSlug);
            this.render();

            // Init Page Specific List View
            scope.dLab.checkListPage = new CheckListPageView({
                el : $('#Content'),
                model: new CheckListPageModel(modelFromSlug)
            });
        },

        getPageSlug: function () {
            var pathName = scope.location.pathname;
            this.pageSlug = pathName.replace('/list/', '');
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

    // Init App

    scope.dLab.appView = scope.dLab.appView ||
        new AppView({
            el: $('#AppEl'),
            model: new AppModel( scope.dLab.viewModel.home )
        });

})(window, jQuery, _, Backbone);