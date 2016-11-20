(function(scope, $, _, Backbone) {
    // Define App Name Space on Window
    // scope.localStorage.clear();
    scope.dLab = scope.dLab || {
        getViewModel : function () {
            return JSON.parse(scope.localStorage.getItem('viewModel'));
        },
        setViewModel : function (data) {
            scope.localStorage.setItem('viewModel', JSON.stringify(data));
        },
        updateViewModel : function (pageSlug, newData) {
            var rootModel = this.getViewModel();

            var checklistPagesIndex = _.findIndex(rootModel.checklistPages, { slug : pageSlug });
            rootModel.checklistPages[checklistPagesIndex] = newData;

            this.setViewModel(rootModel);
            return true;
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
                slug: 'home',
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
                    checklist_title : null,
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
                    blurb: 'Need help with finding housing options? There are on-campus housing available for UW students, for those who don\'t want to live on-campus, there are several off-campus options available as well.',
                    // checklist_title : [
                    //     'Congrats, you are all set for housing this school year',
                    //     'On-Campus Checklist',
                    //     'Off-Campus Checklist'
                    // ],
                    checklist_title: null,
                    items : [
                        {
                            completed: false,
                            isRelevant : true,
                            title : '',
                            type : 'check',
                            linkText : '',
                            externalLink : ''
                        },{
                            completed: false,
                            isRelevant : true,
                            title : '',
                            type : 'check',
                            linkText : '',
                            externalLink : ''
                        },{
                            completed: false,
                            isRelevant : true,
                            title : '',
                            type : 'check',
                            linkText : '',
                            externalLink : ''
                        }
                    ]
                },{
                    title : 'Registration & Orientation',
                    slug : 'registration',
                    blurb: 'Registration is the process of becoming a student at The University of Washington. Registration allows you to get a student ID number, enroll in classes, and go to orientation. Orientation is a guided session by current students and faculty to provide you with an opportunity to meet with an academic adviser, register for classes, be introduced to UW online resources and services, meet new and current students, and learn how to get involved at the UW.',
                    checklist_title : null,
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
                },{
                    title : 'Academic Advising',
                    slug : 'advising',
                    blurb: 'Academic Advisers help students understand the UW\'s academic systems, choose a major, and discover campus resources. The career and Internship Center helps students with resumes, internships, job searching, and interviewing.',
                    checklist_title: 'My Academic Checklist',
                    items : [
                        {
                            completed: false,
                            isRelevant : true,
                            title : 'Review what advising options are available to me',
                            type : 'check',
                            linkText : 'Checkout the advising website',
                            externalLink : 'https://www.washington.edu/uaa/advising/'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Talk to an advisor to get help',
                            type : 'check',
                            linkText : 'Set up appointment with adviser for the best way to receive advice.',
                            externalLink : 'https://www.washington.edu/uaa/advising/appointments/'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Review what kind of help I can get from the Career Center',
                            type : 'check',
                            linkText : 'Investigate their services',
                            externalLink : 'https://careers.uw.edu/'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Talk to an advisor about my future career',
                            type : 'check',
                            linkText : 'Set up an appointment with a Career Center advisor',
                            externalLink : 'https://sdb.admin.uw.edu/students/uwnetid/register.asp'
                        }
                    ]
                },{
                    title : 'Health Services',
                    slug : 'health',
                    blurb: 'Hall Health Center is an comprehensive clinic that provides health care to University of Washington students, alumni, and faculty.',
                    checklist_title : null,
                    items : [
                        {
                            completed: false,
                            isRelevant : true,
                            title : 'Make sure you have health insurance',
                            type : 'check',
                            linkText : 'Learn more about the Washington State Health Exchange',
                            externalLink : 'https://www.washington.edu/ship/international-student-insurance-health-plan/'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Find a Primary Doctor',
                            type : 'check',
                            linkText : 'Contact Hall Health for a Doctor',
                            externalLink : 'http://depts.washington.edu/hhpccweb/contact-us/'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Connect with a specialist for your needs',
                            type : 'check',
                            linkText : 'Contact Hall Health for a Specialist',
                            externalLink : 'http://depts.washington.edu/hhpccweb/contact-us/'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Connect with a mental health professional',
                            type : 'check',
                            linkText : 'Learn more about the Mental Health Clinic',
                            externalLink : 'http://depts.washington.edu/hhpccweb/project/mental-health-clinic/'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Help keep the campus and its students safe',
                            type : 'check',
                            linkText : 'Learn more about the SafeCampus initiative',
                            externalLink : 'http://depts.washington.edu/safecamp/'
                        }
                    ]
                },{
                    title : 'Other',
                    slug : 'other',
                    blurb: 'Here is a checklist that assists you in finding somewhere to live when you go to college.',
                    checklist_title : null,
                    items : [
                        {
                            completed: false,
                            isRelevant : true,
                            title : '',
                            type : 'check',
                            linkText : '',
                            externalLink : ''
                        },{
                            completed: false,
                            isRelevant : true,
                            title : '',
                            type : 'check',
                            linkText : '',
                            externalLink : ''
                        },{
                            completed: false,
                            isRelevant : true,
                            title : '',
                            type : 'check',
                            linkText : '',
                            externalLink : ''
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
            var $content = $('#Content');

            $content.html('<h3 class="home_page_callout">Choose a category to learn more.</h3>');
            $content.append('<ul id="home_page_panel_list"></ul>');
            var $panel_list = $('#home_page_panel_list');

            $.each(scope.dLab.viewModel.checklistPages, function(i, panelData) {
                var classStr = 'col-md-3';
                if (i === 0 || i === 3) { // if first or fourth
                    classStr = classStr + ' col-md-offset-1';
                }
                var el = $('<li class="' + classStr + '"></li>');
                var pagePanel= new ChecklistPageLinkPanelView({
                    el: el,
                    model: new ChecklistPageLinkPanelModel(panelData)
                });
                $panel_list.append(el);
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

        handleListItemClick : function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $targetItem = $(e.target);
            var $itemParent = $targetItem.parents('.checklist_page_item');
            
            var titleToMatch = $itemParent.data('title');
            var itemModelIndex = _.findIndex(this.model.attributes.items, {title : titleToMatch});

            this.model.attributes.items[itemModelIndex].completed = !this.model.attributes.items[itemModelIndex].completed;
            this.render();
            // console.log(scope.dLab.appView.model.attributes);
            scope.dLab.updateViewModel(this.model.attributes.slug, this.model.attributes);
        },

        stopListeningToItems: function () {
            $('.check_box_link').off('click');
        },

        startListeningToItems: function () {
            $('.check_box_link').on('click', _.bind(this.handleListItemClick, this));
        },

        render: function() {
            this.stopListeningToItems();
            this.renderTodo();
            this.renderComplete();
            this.renderDismissed();
            this.startListeningToItems();
            return this;
        },

        renderTodo: function () {
            var todoItems = [];
            $.each(this.model.attributes.items, function (i, item) {
                if ( !item.completed && item.isRelevant) {
                    todoItems.push(item);
                }
            });
            // console.log(todoItems);
            $('#checklistContainer > ul', this.$el).html(this.checkListTemplate({ items : todoItems }));
        },

        renderComplete: function () {
            var completeItems = [];
            $.each(this.model.attributes.items, function (i, item) {
                if ( item.completed && item.isRelevant) {
                    completeItems.push(item);
                }
            });

            if ( completeItems.length) {
                $('.completed_items_title').removeClass('hide');
            } else {
                $('.completed_items_title').addClass('hide');
            }
            
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

    // Init App
    scope.dLab.appView = scope.dLab.appView ||
        new AppView({
            el: $('#AppEl'),
            model: new AppModel( scope.dLab.viewModel.home )
        });

})(window, jQuery, _, Backbone);