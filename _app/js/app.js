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
            checklistPages : [{
                    title : 'Financial Aid',
                    slug : 'fin-aid',
                    blurb: 'Financial Aid is any grant or loan offered to help a student meet his/her college expenses. Such aid is usually provided by various sources such as federal and state agencies, colleges, and foundations.',
                    checklist_title : null,
                    sidebar_panel : {},
                    conditionals: {},
                    items : [
                        {
                            completed: true,
                            isRelevant : true,
                            title : 'FAFSA',
                            type : 'check',
                            linkText : 'FAFSA Homepage',
                            externalLink : 'https://fafsa.ed.gov/',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'FAFSA Status',
                            type : 'check',
                            linkText : 'Check your FASFA status',
                            externalLink : 'https://sdb.admin.uw.edu/sisStudents/uwnetid/finaidstatus.aspx',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Financial Aid Award Letter',
                            type : 'check',
                            linkText : 'Review your Financial Aid Award Letter',
                            externalLink : 'https://sdb.admin.uw.edu/sisStudents/uwnetid/finaidstatus.aspx',
                            condition: null
                        }
                    ]
                },{
                    title : 'Housing',
                    slug : 'housing',
                    blurb: 'Need help with finding housing options? There are on-campus housing available for UW students, for those who don\'t want to live on-campus, there are several off-campus options available as well.',
                    checklist_title: null,
                    sidebar_panel : {},
                    conditionals: {
                        hasHousing : {
                            text: 'I already found housing.',
                            checklist_title: '',
                            state: false,
                            slug: 'hasHousing'
                        },
                        wantsOnCampus: {
                            text: 'I want to live on-campus.',
                            checklist_title: 'On-Campus Checklist',
                            state: true,
                            slug: 'wantsOnCampus'
                        },
                        wantsOffCampus : {
                            text: 'I want to live off-campus.',
                            checklist_title: 'Off-Campus Checklist',
                            state: false,
                            slug: 'wantsOffCampus'
                        }
                    },
                    items : [{
                            completed: true,
                            isRelevant : true,
                            condition: 'hasHousing',
                            type: 'html',
                            html:   '<div class="section_complete_box">' +
                                        '<img class="section_complete_check" src="">' +
                                        '<h4 class="section_complete_title">Congrats, you are set for housing for the school year!</h4>' +
                                    '</div>',
                            title: 'Congrats, you are set for housing for the school year!'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Apply for on-campus housing online.',
                            type : 'check',
                            linkText : 'On-campus housing application',
                            externalLink : 'https://ucharm.hfs.washington.edu/ucharm/',
                            condition: 'wantsOnCampus'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Submit by Aug 30th for the 2016-2017 school year',
                            type : 'check',
                            linkText : '',
                            externalLink : '',
                            condition: 'wantsOnCampus'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Confirm housing once assignment is received',
                            type : 'check',
                            linkText : '',
                            externalLink : '',
                            condition: 'wantsOnCampus'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Contact your new roommates',
                            type : 'check',
                            linkText : '',
                            externalLink : '',
                            condition: 'wantsOnCampus'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Check out a list of off-campus housing resources',
                            type : 'check',
                            linkText : 'Check Online!',
                            externalLink : 'https://seattle.craigslist.org/search/apa',
                            condition: 'wantsOffCampus'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Contact landlords or roommates',
                            type : 'check',
                            linkText : '',
                            externalLink : '',
                            condition: 'wantsOffCampus'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Apply for lease',
                            type : 'check',
                            linkText : '',
                            externalLink : '',
                            condition: 'wantsOffCampus'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Wait for a response from the landlord',
                            type : 'check',
                            linkText : '',
                            externalLink : '',
                            condition: 'wantsOffCampus'
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Sign your lease',
                            type : 'check',
                            linkText : '',
                            externalLink : '',
                            condition: 'wantsOffCampus'
                        }
                    ]
                },{
                    title : 'Registration & Orientation',
                    slug : 'registration',
                    blurb: 'Registration is the process of becoming a student at The University of Washington. Registration allows you to get a student ID number, enroll in classes, and go to orientation. Orientation is a guided session by current students and faculty to provide you with an opportunity to meet with an academic adviser, register for classes, be introduced to UW online resources and services, meet new and current students, and learn how to get involved at the UW.',
                    checklist_title : null,
                    sidebar_panel : {},
                    conditionals: {},
                    items : [
                        {
                            completed: true,
                            isRelevant : true,
                            title : 'Husky Card',
                            type : 'check',
                            linkText : 'Get your Husky Card today!',
                            externalLink : 'https://www.hfs.washington.edu/huskycard/#gsc.tab=0',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Dawg Daze',
                            type : 'check',
                            linkText : 'Going to Dog Daze? Find out more!',
                            externalLink : 'http://www.uwdawgdaze.com/',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'F.I.G.',
                            type : 'check',
                            linkText : 'Sign up for your First Year Interest Group',
                            externalLink : 'https://fyp.washington.edu/first-year-interest-groups/',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Registration',
                            type : 'check',
                            linkText : 'Register for your classes',
                            externalLink : 'https://sdb.admin.uw.edu/students/uwnetid/register.asp',
                            condition: null
                        }
                    ]
                },{
                    title : 'Academic Advising',
                    slug : 'advising',
                    blurb: 'Academic Advisers help students understand the UW\'s academic systems, choose a major, and discover campus resources. The career and Internship Center helps students with resumes, internships, job searching, and interviewing.',
                    checklist_title: 'My Academic Checklist',
                    sidebar_panel : {},
                    conditionals: {},
                    items : [
                        {
                            completed: false,
                            isRelevant : true,
                            title : 'Review what advising options are available to me',
                            type : 'check',
                            linkText : 'Checkout the advising website',
                            externalLink : 'https://www.washington.edu/uaa/advising/',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Talk to an advisor to get help',
                            type : 'check',
                            linkText : 'Set up appointment with adviser for the best way to receive advice.',
                            externalLink : 'https://www.washington.edu/uaa/advising/appointments/',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Review what kind of help I can get from the Career Center',
                            type : 'check',
                            linkText : 'Investigate their services',
                            externalLink : 'https://careers.uw.edu/',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Talk to an advisor about my future career',
                            type : 'check',
                            linkText : 'Set up an appointment with a Career Center advisor',
                            externalLink : 'https://sdb.admin.uw.edu/students/uwnetid/register.asp',
                            condition: null
                        }
                    ]
                },{
                    title : 'Health Services',
                    slug : 'health',
                    blurb: 'Hall Health Center is an comprehensive clinic that provides health care to University of Washington students, alumni, and faculty.',
                    checklist_title : null,
                    sidebar_panel : {
                        panel_title: 'General Contact Info for Health Services',
                        items: [{
                            type: 'title',
                            text: 'Hall Health',
                            icon: ''
                        },{
                            type: 'item',
                            text: '(206) 685-1011',
                            icon: ''
                        },{
                            type: 'item',
                            text: '4060 E. Stevens Way NE Seattle, WA 98195',
                            icon: ''
                        },{
                            type: 'title',
                            text: 'Mental Health Clinic',
                            icon: ''
                        },{
                            type: 'item',
                            text: '(206) 543-5030',
                            icon: ''
                        },{
                            type: 'item',
                            text: 'Box 354410',
                            icon: ''
                        },{
                            type: 'item',
                            text: 'University of Washington',
                            icon: ''
                        },{
                            type: 'item',
                            text: 'Seattle, WA 98195-4410',
                            icon: ''
                        },{
                            type: 'title',
                            text: 'SAFECAMPUS',
                            icon: ''
                        },{
                            type: 'item',
                            text: '(206) 685-SAFE (7233) (24/7)',
                            icon: ''
                        }]
                    },
                    conditionals: {},
                    items : [
                        {
                            completed: false,
                            isRelevant : true,
                            title : 'Make sure you have health insurance',
                            type : 'check',
                            linkText : 'Learn more about the Washington State Health Exchange',
                            externalLink : 'https://www.washington.edu/ship/international-student-insurance-health-plan/',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Find a Primary Doctor',
                            type : 'check',
                            linkText : 'Contact Hall Health for a Doctor',
                            externalLink : 'http://depts.washington.edu/hhpccweb/contact-us/',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Connect with a specialist for your needs',
                            type : 'check',
                            linkText : 'Contact Hall Health for a Specialist',
                            externalLink : 'http://depts.washington.edu/hhpccweb/contact-us/',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Connect with a mental health professional',
                            type : 'check',
                            linkText : 'Learn more about the Mental Health Clinic',
                            externalLink : 'http://depts.washington.edu/hhpccweb/project/mental-health-clinic/',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : 'Help keep the campus and its students safe',
                            type : 'check',
                            linkText : 'Learn more about the SafeCampus initiative',
                            externalLink : 'http://depts.washington.edu/safecamp/',
                            condition: null
                        }
                    ]
                },{
                    title : 'Other',
                    slug : 'other',
                    blurb: 'Here is a checklist that assists you in finding somewhere to live when you go to college.',
                    checklist_title : null,
                    sidebar_panel : {},
                    conditionals: {},
                    items : [
                        {
                            completed: false,
                            isRelevant : true,
                            title : '',
                            type : 'check',
                            linkText : '',
                            externalLink : '',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : '',
                            type : 'check',
                            linkText : '',
                            externalLink : '',
                            condition: null
                        },{
                            completed: false,
                            isRelevant : true,
                            title : '',
                            type : 'check',
                            linkText : '',
                            externalLink : '',
                            condition: null
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
        conditionalTemplate: _.template($('#ChecklistPageConditionalTemplate').html()),

        initialize : function() {
            this.$el.html(this.pageTemplate(this.model.attributes));
            this.$conditionalEl = $('#page_conditional_section');

            if (this.model.attributes.conditionals !== {}) {
                this.activeCondition = _.findWhere(this.model.attributes.conditionals, {state: true});
            }
            // debugger;
            this.render();

        },

        handleConditionalItemClick : function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $targetItem = $(e.target);
            var $itemParent = $targetItem.hasClass('conditional_item') ? $targetItem : $targetItem.parent();
            var conditionalSlug = $itemParent.attr('data-cond-slug');

            if (this.model.attributes.conditionals[conditionalSlug] && !this.model.attributes.conditionals[conditionalSlug].state ) {
                _.each(this.model.attributes.conditionals, function (cond) {
                    cond.state = false;
                });

                this.model.attributes.conditionals[conditionalSlug].state = true;
                this.render(conditionalSlug);

                scope.dLab.updateViewModel(this.model.attributes.slug, this.model.attributes);
            }

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

            scope.dLab.updateViewModel(this.model.attributes.slug, this.model.attributes);
        },

        stopListeningToItems: function () {
            $('.check_box_link').off('click');
            $('.conditional_item').off('click');
        },

        startListeningToItems: function () {
            $('.check_box_link').on('click', _.bind(this.handleListItemClick, this));
            $('.conditional_item').on('click', _.bind(this.handleConditionalItemClick, this));
        },

        render: function(conditionalSlug) {
            this.stopListeningToItems();

            this.renderTodo();
            this.renderComplete();
            this.renderDismissed();
            this.renderConditionals(conditionalSlug);
            this.startListeningToItems();
            return this;
        },

        renderConditionals : function (conditionalSlug) {
            conditionalSlug = conditionalSlug || this.activeCondition.slug;
            this.$conditionalEl.html(this.conditionalTemplate(this.model.attributes));
            $('.checklist_title').addClass('hide');
            $('.checklist_title.' + conditionalSlug).removeClass('hide');
        },

        renderTodo: function () {
            var todoItems = [];
            $.each(this.model.attributes.items, function (i, item) {
                if ( !item.completed && item.isRelevant) {
                    todoItems.push(item);
                }
            });
            // console.log(todoItems);
            $('#checklistContainer > ul', this.$el).html(this.checkListTemplate({ items : todoItems, conditionals: this.model.attributes.conditionals }));
        },

        renderComplete: function () {
            var completeItems = [];
            var self = this;
            $.each(this.model.attributes.items, function (i, item) {
                if (  item.completed && item.isRelevant) {
                    if ( item.condition && self.model.attributes.conditionals[item.condition].state ) {
                        completeItems.push(item);
                    }
                }
            });

            if ( completeItems.length) {
                $('.completed_items_title').removeClass('hide');
            } else {
                $('.completed_items_title').addClass('hide');
            }
            
            $('#completedItems > ul', this.$el).html(this.checkListTemplate({ items : completeItems, conditionals: this.model.attributes.conditionals }));
        },

        renderDismissed: function () {
            var dismissedItems = [];
            $.each(this.model.attributes.items, function (i, item) {
                if ( !item.isRelevant) {
                    dismissedItems.push(item);
                }
            });
            $('#notRelevantItems > ul', this.$el).html(this.checkListTemplate({ items : dismissedItems, conditionals: this.model.attributes.conditionals }));
        }

    });

    // Init App
    scope.dLab.appView = scope.dLab.appView ||
        new AppView({
            el: $('#AppEl'),
            model: new AppModel( scope.dLab.viewModel.home )
        });

})(window, jQuery, _, Backbone);