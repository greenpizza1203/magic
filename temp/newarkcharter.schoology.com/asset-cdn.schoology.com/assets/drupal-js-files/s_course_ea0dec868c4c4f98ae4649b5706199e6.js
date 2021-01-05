Drupal.behaviors.sCourse = function(context) {
    var settingsCourse = Drupal.settings.s_course;
    var DEFER_LOADING = 'defer';
    var DISABLE_LOADING = 'disable';

    if ($('body').hasClass('s-enable-mathml')) {
        s_renderMath();
    }

    $('.assignments-container:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        setupAssignmentPaging(this);
    });

    // Reordering for subtrees and planner view right column
    $('.subtree-folder-contents-table:not(.sCourse-processed), .planner-right-contents-table:not(.sCourse-processed), #folder-contents-table:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        var table = $(this);
        sCourseEnableContentReorder($('>tbody', table));
    });

    $('.access-code:not(.sCourse-processed)').addClass('sCourse-processed').each(function() {
        var acContext = this;
        $('.access-delete', acContext).click(function() {
            var path = window.location.pathname.substring(1);
            var courseID = path.split('/')[1];
            $.ajaxSecure({
                url: '/enrollment/code/visibility/course/' + courseID + '/hide',
                dataType: 'json',
                type: 'GET',
                success: function(response, status) {
                    $(acContext).hide();
                }
            });
        });
    });

    $('#course-reminders:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        var $rightColumn = $(this);
        var reminders = settingsCourse && settingsCourse.reminders;
        var $remindersWrapper = $('.reminders-wrapper', $rightColumn);
        switch (reminders) {
            case DEFER_LOADING:
                $remindersWrapper.show();
                var $refreshWrapper = $remindersWrapper.find('.reminders-content .refresh-wrapper');
                $refreshWrapper.find('.refresh-button').on('click', function() {
                    $refreshWrapper.find('> p').each(function() {
                        var $element = $(this);
                        if (!$element.hasClass('more-loading')) {
                            $element.hide();
                        }
                    });
                    getCourseReminders($remindersWrapper, 0);
                });
                break;
            case DISABLE_LOADING:
                $remindersWrapper.show();
                break;
            default:
                getCourseReminders($remindersWrapper, 0, true);
                break;
        }
    });

    /**
     * Fetches and attaches the course reminders block (ungraded submissions, resubmissions, etc.)
     *
     * @param {jQuery} $remindersWrapper
     * @param {number} [retry] - The number of times to retry the request.
     * @param {boolean} [removeIfEmpty] - Whether the reminders block should be removed if empty.
     */
    function getCourseReminders($remindersWrapper, retry, removeIfEmpty) {
        var $loading = $remindersWrapper.find('.more-loading');
        $loading.show();

        var path = window.location.pathname.substring(1);
        var courseId = path.split('/')[1];

        $.ajax({
            url: '/course/' + courseId + '/course_reminders_ajax' + (retry ? '?retry=' + retry : ''),
            dataType: 'json',
            type: 'GET',
            success: function(response) {
                $loading.hide();

                if (response.retry_in) {
                    // after the specified retry time, retry getting the course reminders
                    setTimeout(function() {
                        getCourseReminders($remindersWrapper, retry + 1, removeIfEmpty);
                    }, response.retry_in);
                } else if (response.html) {
                    $remindersWrapper.html(response.html);
                    $remindersWrapper.show();
                    Drupal.attachBehaviors($remindersWrapper);
                    sCourseSetupTodoList($remindersWrapper);
                } else {
                    if (removeIfEmpty) {
                        $remindersWrapper.remove();
                    } else {
                        $remindersWrapper.show();
                        $remindersWrapper.find('.reminders-content').html('<div class="empty">' + Drupal.t('No current reminders') + '</div>');
                    }
                }
            }
        });
    }

    /**
     * Loads upcoming events.
     *
     * @param {jQuery} $courseUpcoming - The "Upcoming" element.
     */
    function loadUpcomingEvents($courseUpcoming) {
        var path = window.location.pathname.substring(1);
        var courseId = path.split('/')[1];
        $.ajax({
            // pass the current path so that the calendar nav uses the right link (the current page)
            // and also be sure to pass any ?mini arguments for changing the date in the cal
            url: '/course/' + courseId + '/calendar_ajax' + (window.location.search.length ? window.location.search + '&' : '?') + 'original_q=' + path,
            dataType: 'json',
            type: 'GET',
            success: function(response) {
                $courseUpcoming.find('.upcoming-list').html($(response).children());
                if (window.location.search.match('mini=')) {
                    $('#event-calendar', selector).click();
                }
                // ie 8 is complaining about too much js on the course materials page, skip using attachBehaviors here
                // to cut down on executed javascript on this page
                sAttachBehavior('sCourse', $courseUpcoming);
                sAttachBehavior('sCommonInfotip', $courseUpcoming);
                sAttachBehavior('sEventUpcoming', $courseUpcoming);
                $courseUpcoming.show();
            }
        });
    }

    $('#course-events:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        var $courseUpcoming = $(this);
        $courseUpcoming.show();

        var upcoming = settingsCourse && settingsCourse.upcoming;
        switch (upcoming) {
            case DEFER_LOADING:
                var $refreshWrapper = $courseUpcoming.find('.upcoming-list .refresh-wrapper');
                $refreshWrapper.find('.refresh-button').on('click', function() {
                    $refreshWrapper.find('> p').each(function() {
                        var $element = $(this);
                        if (!$element.hasClass('more-loading')) {
                            $element.hide();
                        }
                    });
                    $courseUpcoming.find('.upcoming-list .more-loading').show();
                    loadUpcomingEvents($courseUpcoming);
                });
                break;
            case DISABLE_LOADING:
                break;
            default:
                $courseUpcoming.find('.upcoming-list .more-loading').show();
                loadUpcomingEvents($courseUpcoming);
                break;
        }

        $('#event-calendar', $courseUpcoming).click(function() {
            var popup = new Popups.Popup();
            var body = '<div id="fcalendar" style="width: 800px;"></div>';
            var buttons = {
                'popup_cancel': {
                    title: Drupal.t('Close'),
                    func: function() {
                        popup.close();
                    }
                }
            };

            popup.extraClass = 'popups-extra-large calendar-popup-mini';
            var activePopup = popup.open(Drupal.t('Calendar'), body, buttons);
            Drupal.attachBehaviors($('#' + String(activePopup.id) + ''));
            Drupal.behaviors.sCommonMediaFileIframeUseRelativeUrl($('#' + String(activePopup.id) + ''));
            $("#share-calendar-option-containter .share-calendar-option").insertAfter("#fcalendar");
            sPopupsResizeCenter();
        });
    });

    $('div#course-profile-selector:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        var selectorWrapper = $(this);
        $('li', selectorWrapper).click(function() {
            var selector = $(this);
            if (selector.attr('id') == 'selector-materials') {
                $("#course-profile-materials").show();
                $("#course-profile-updates").hide();
            }
            if (selector.attr('id') == 'selector-updates') {
                $("#course-profile-updates").show();
                $("#course-profile-materials").hide();
            }
            $('li.active', selectorWrapper).removeClass('active');
            selector.addClass('active');
        });
    });

    $('div#important-post:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        var importantPostContainer = $(this);
        $("a.important-remove-hidden", importantPostContainer).bind("click", function() {
            $(this).parent().parent().find("form").submit();
            return false;
        });
    });


    $('.course-info-wrapper:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        var wrapper = $(this);
        var moreInfo = $('.course-info-full', wrapper);
        var lessInfo = $('.course-info-less', wrapper);
        $('.more-link', wrapper).click(function() {
            lessInfo.hide();
            moreInfo.show();
        });
        $('.less-link', wrapper).click(function() {
            lessInfo.show();
            moreInfo.hide();
        });

    });

    $('.notification-settings:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        sUserSetupRealmNotifButton($(this));
    });

    $('.profile-picture-wrapper:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        var wrapper = $(this);
        var link = $('.edit-profile-picture-hover', wrapper);
        var pic = $('.profile-picture', wrapper);
        var uploader = $('#profile-picture-uploader-wrapper', wrapper);

        link.bind('click', function() {
            if (uploader.is(':visible')) {
                uploader.hide();
            } else {
                uploader.show();
            }
        });

        $('body').bind('click', function(e) {
            var target = $(e.target);
            if (!target.hasClass('profile-picture-wrapper') && target.parents('.profile-picture-wrapper').length == 0) {
                uploader.hide();
            }
        });

        pic.bind('s_profile_picture_uploaded', function(e, path) {
            $('img', $(this)).attr('src', path).removeAttr('height');
            uploader.hide();
        });
    });

    $('li.assignment .action-links-wrapper:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        $(this).sActionLinks({
            hidden: false,
            wrapper: '.action-links-wrapper'
        });
    });

    $('#link-sections-wrapper:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        $(this).sActionLinks({
            hidden: false,
            wrapper: '#link-sections-wrapper'
        });
    });

    $('#s-course-settings:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        $(this).sActionLinks({
            hidden: false,
            wrapper: '.action-links-wrapper'
        });
    });

    // Materials index toolbar (add materials, options)
    $('#course-profile-materials .materials-top:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        var wrapperObj = $(this);

        // Options -> Print behavior
        $('#print-view', wrapperObj).bind('click', function() {
            // Add a body class and a button to return to previous view
            $('body').addClass('print-view');
            var returnBtn = $('<div id="print-return"><span>' + Drupal.t('Return to previous page') + '</span></div>');
            returnBtn.click(function() {
                location.reload();
            });
            $('body').prepend(returnBtn);
            $('#course-profile-materials .ui-sortable').sortable('destroy')
            window.print();
        });

        $('#toolbar-options-wrapper', wrapperObj).addClass('sCourse-processed').each(function() {
            $(this).sActionLinks({
                hidden: false,
                wrapper: '#toolbar-options-wrapper'
            });
        });

        $('.course-content-action-links', wrapperObj).each(function() {
            // initialze add materials drop down menu
            $(this).sActionLinks({
                hidden: false,
                wrapper: '.action-links-wrapper'
            });

            // register click handler for app canvas pop
            $('.action-links.has-material-apps', this).on('click', '.action-lti-app', function(e) {
                e.preventDefault();
                // @see s_tinymce_resources_insert_app_popup()
                var url = '/tinymceinsertresourcesapp?r=' + String($(this).data('realm')) +
                    '&id=' + String($(this).data('realm_id')) +
                    '&a=' + String($(this).data('app_nid')) +
                    '&context=materials';
                /*
                   we need to extract folder_id and inline weight from url since this information is dynamically
                   updated for the inline course materials add popup menu
                 */
                var qParams = getQueryParams($('a', this).prop('href'));
                if (qParams && typeof qParams.f != 'undefined') {
                    url += '&f=' + String(qParams.f);
                }

                if (qParams && typeof qParams.fweight != 'undefined') {
                    url += '&fweight=' + String(qParams.fweight);
                }

                Popups.saveSettings();
                // The parent of the new popup is the currently active popup.
                var parentPopup = Popups.activePopup();
                var popupOptions = Popups.options({
                    ajaxForm: false,
                    extraClass: 'popups-extra-large popups-insert-library',
                    updateMethod: 'none',
                    href: url,
                    hijackDestination: false,
                    disableCursorMod: true,
                    disableAttachBehaviors: false
                });
                // Launch the cookie preload popup first, then launch app
                var cookiePreloadUrl = sCommonGetSetting('s_app', 'cookie_preload_urls', $(this).data('app_nid'));
                if (cookiePreloadUrl) {
                    sAppMenuCookiePreloadRun($(this).data('app_nid'), cookiePreloadUrl, function() {
                        // clear cached launch data since we store cookie preload attempts in session
                        sAppLauncherClearCache($(this).data('app_nid'));
                        sAppMenuCookiePreloadDelete($(this).data('app_nid'));
                        Popups.openPath(this, popupOptions, parentPopup);
                    });
                }
                // launch app popup
                else {
                    Popups.openPath(this, popupOptions, parentPopup);
                }
            });
        });
    });

    $('.past-assignments-grading-period .clickable:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        $(this).click(function() {
            var periodAssignments = $('>ul', $(this).parent());
            if (periodAssignments.css('display') == 'none') {
                $(this).parent().removeClass('assignments-hidden');
                periodAssignments.show();
            } else {
                $(this).parent().addClass('assignments-hidden');
                periodAssignments.hide();
            }
        });
    });

    $('.s-course-editor-wrapper .save-and-continue-btn:not(.sCourse-processed)', context).addClass('sCourse-processed').bind('click', function() {
        var wrapper = $(this).parents('.s-course-editor-wrapper');
        var form = wrapper.find('form');
        form.submit();
        return false;
    });

    // materials shortcut
    $('#menu-s-main a.course-materials-left-menu:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        var menuLink = $(this),
            menuLinkArrow = $('.materials-dropdown-arrow', menuLink),
            menuDropdown = $("#course-materials-dropdown"),
            menuDropdownHasContent = menuDropdown.find('.item-list ul').length > 0;
        menuLink.after(menuDropdown);

        // check if the associated menu dropdown has content before showing the menu link arrow
        // the arrow is rendered in a title callback so it doesn't have any knowledge of whether there should be content or
        // not in the backend
        if (menuDropdownHasContent) {
            menuLinkArrow.removeClass('hidden').click(function() {
                var arrow = $(this);
                var hidden = menuDropdown.is(':hidden');
                if (hidden) {
                    $('body').bind('click.sCourseMaterialsHandle', function(e) {
                        var target = $(e.target);
                        var hidden = menuDropdown.is(':hidden');
                        if (!hidden && target != menuDropdown && target.parents('#course-materials-dropdown').length == 0) {
                            $('.materials-dropdown-arrow', menuLink).click();
                        }
                    });

                    menuDropdown.show()
                    $(this).addClass('active');
                } else {
                    menuDropdown.hide();
                    $(this).removeClass('active');
                    $('body').unbind('click.sCourseMaterialsHandle');
                }
                return false;
            });
        } else {
            menuLinkArrow.hide();
        }
    });

    $('#right-column .reminders-wrapper:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        sCourseSetupTodoList($(this));
    });

    /**
     * TRACK ANY COURSE SPECIFIC GENERIC POST VIEWS. THIS BEHAVIOR ONLY NEEDS TO BE ATTACHED
     * ONCE SO PUT IT OUTSIDE OF DRUPAL.ATTACHBEHAVIORS()
     */
    if (!$('body').hasClass('anonymous')) {
        $('.gen-post-link:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
            var genPostLink = $(this);
            // .one() adds a single-use binding, allowing a .click() on a successful ajax request to trigger the link properly
            genPostLink.one('click', function(e) {
                if (!genPostLink.hasClass('embed-cover') && !genPostLink.hasClass('media-player-popup')) {
                    e.preventDefault();
                }
                sCourseTrackGenericPostView($(this));
            });
        });
    }

    // associated with theme('s_course_area_switcher')
    $('.s-js-course-area-switcher .action-links-wrapper:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
        $(this).sActionLinks({
            hidden: false,
            wrapper: '.badge-action-links'
        });
    });

    /**
     * This block processes the handling of materials filter views.
     *
     * Behaviors include:
     *   Handle updating of the content body when filters are changed and AJAX'ed in
     *   Handle the binding of popups behaviors on gear/action links menus
     *   Handle the "more link" and its infinite scrolling behavior for pagination
     *
     * @param object context
     */
    (function(context) {
        // this is the main body of the full view of the course materials listing
        $('.s-js-course-materials-full:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
            var wrapperObj = $(this),
                actionLinksWrapper = wrapperObj.find('.s-js-materials-filter-wrapper .action-links-wrapper'),
                actionLinksLabel = actionLinksWrapper.find('.action-links-unfold-text'),
                optionsMenu = wrapperObj.find('.s-js-options-action-links-outer'),
                selectedFilterItem = null;

            /**
             * Update the option menu based on the provided current
             * Show only the option specified by the filter argument
             *
             * @param string filter
             */
            function updateOptionMenu(filter) {
                optionsMenu.find('.s-js-content-option').hide().addClass('content-option--hidden');
                optionsMenu.find('.s-js-content-option-' + filter).show().removeClass('content-option--hidden');

                if (optionsMenu.find('li:not(.content-option--hidden)').length) {
                    optionsMenu.show();
                } else {
                    optionsMenu.hide();
                }
            }

            /**
             * Change the selected filter to provided filter.
             * This only updates the UI of the actual filter controls and not the content of the page.
             *
             * @param string filter
             */
            function changeSelectedFilter(filter) {
                selectedFilterItem = actionLinksWrapper.find('.s-js-material-filter-' + filter.replace(/_/g, '-'));
                var currentFilter = actionLinksWrapper.data('filter'),
                    newFilter = selectedFilterItem.data('filter');

                if (currentFilter != newFilter) {
                    actionLinksWrapper.data('filter', newFilter);
                    actionLinksWrapper.find('.selected').removeClass('selected');
                    selectedFilterItem.closest('li').addClass('selected');
                    actionLinksLabel.text(selectedFilterItem.text());
                }
            }

            /**
             * Refresh the content of the current filter stored in currentFilterInfo.
             *
             * Events called:
             * sCourseMaterialsFilterChanged({filter: newFilter, url: newUrl})
             *   called when a different filter is selected and page content should be updated
             */
            function refreshContent() {
                if (selectedFilterItem && selectedFilterItem.length) {
                    var filter = getHashFilter(),
                        oldFilter = selectedFilterItem.data('filter');
                    if (filter != oldFilter) {
                        changeSelectedFilter(filter);
                    }
                    sAngular.trigger('sCourseMaterialsFilterChanged', {
                        filter: selectedFilterItem.data('filter'),
                        url: selectedFilterItem.attr('href')
                    });
                }
            }

            /**
             * Fetch the content from the url of the provided filter
             *
             * Events called:
             * sCourseMaterialsFilterContentRefreshed(filter)
             *
             * @param string url
             * @param string filter
             */
            function getContent(url, filter) {
                var activeLoaderKey = 's-js-course-materials-full';

                url += (url.indexOf('?') ? '&' : '?') + 'ajax=1&style=full';
                sToggleActiveLoader(activeLoaderKey, wrapperObj);
                $.ajax({
                    url: url,
                    success: function(data) {
                        var contentObj = $(data),
                            currentMaterialsBody = wrapperObj.find('.s-js-materials-body'),
                            newMaterialsBody = contentObj.find('.s-js-materials-body');
                        if (currentMaterialsBody.length) {
                            currentMaterialsBody.replaceWith(newMaterialsBody);
                        } else {
                            wrapperObj.append(newMaterialsBody);
                        }

                        Drupal.attachBehaviors(wrapperObj.find('.s-js-materials-body'));

                        sAngular.trigger('sCourseMaterialsFilterContentRefreshed', filter);
                    },
                    complete: function() {
                        sToggleActiveLoader(activeLoaderKey);
                    }
                });
            }

            /**
             * Parse the filter from the current hash state
             *
             * @return string
             */
            function getHashFilter() {
                var filter = 'all',
                    matches = /filter_type=(\w+)/.exec(window.location.hash);
                if (matches) {
                    filter = matches[1];
                }
                return filter;
            }

            /**
             * Update the current hash state to the provided filter
             *
             * @param string filter
             */
            function setHashFilter(filter) {
                window.location.hash = '!filter_type=' + filter;
            }

            $(window).on('hashchange', function(e) {
                refreshContent();
            });

            // listen for the sCourseMaterialsFilterChanged event (called when filter change and new content should be loaded)
            // and update the contents of the view based on the filter selected.
            sAngular.on('sCourseMaterialsFilterChanged', function(data) {
                var filter = data.filter,
                    url = data.url;

                getContent(url, filter);
            });

            // keep track of which filters have already bound the popups configs so it doesn't get called again
            var popupsConfigBound = {};

            // these options are common to all of the above popup options
            var defaultPopupsOpts = {
                updateMethod: 'callback',
                onUpdate: function(data, popupOptions, popupElement) {
                    // on updating, cause the content of the materials to refresh instead of the entire page for a better experience
                    refreshContent();
                    Popups.close();
                    return false;
                }
            };

            // these popups config are used in many of the material type filters
            var commonPopupsConf = {
                '.materials-item-actions .action-publish a': {
                    extraClass: 'popups-small popups-publish'
                },
                '.materials-item-actions .action-unpublish a': {
                    extraClass: 'popups-small popups-unpublish'
                },
                '.materials-item-actions .action-delete a': {
                    extraClass: 'popups-small popups-action-item'
                },
                '.materials-item-actions .action-move a': {
                    extraClass: 'popups-small popups-action-item'
                },
                '.materials-item-actions .action-copy a': {
                    extraClass: 'popups-large popups-copy popups-action-item'
                },
                '.materials-item-actions .action-distribute a': {
                    extraClass: 'popups-large popups-copy popups-action-item'
                },
                '.materials-item-actions .action-library-save a': {
                    extraClass: 'popups-large'
                },
                '.materials-item-actions .action-edit-properties a': {
                    extraClass: 'popups-large'
                },
                '.materials-item-actions .s-js-locked-resource-link-diff': {
                    extraClass: 'popups-extra-large linked-content-diff-view'
                },
                '.materials-item-actions .s-js-unlink-node': {
                    extraClass: 'popups-small unlink-popup'
                },
                '.materials-item-actions .action-edit-link a': {
                    extraClass: 'popups-large popups-action-item popups-add-link'
                }
            };

            // For CSM Common Assessment materials (only) we want to show an extra large popup
            var isCSM = !!sCommonGetSetting('s_realm_info', 'csm_realm_id');
            if (isCSM) {

                // SGY-22549
                // We want to conditionally show a larger popup for Managed Assessments edit
                // For Non-MA we need direct child ops '>' in order to prevent both selectors from being applied to the case where a MA is in a folder
                //   (because the folder also has a .dr element)
                commonPopupsConf['.dr:not(.type-common-assessment) > * > .materials-item-actions .action-edit a'] = {
                    extraClass: 'popups-large popups-action-item'
                };
                commonPopupsConf['.type-common-assessment .materials-item-actions .action-edit a'] = {
                    extraClass: 'popups-extra-large popups-action-item'
                };
            } else {
                commonPopupsConf['.materials-item-actions .action-edit a'] = {
                    extraClass: 'popups-large popups-action-item'
                };
            }

            // these popups config are folder-specific, and should only be used when folders are available
            var folderPopupsConf = {
                '.materials-folder-actions .action-edit a': {
                    extraClass: 'popups-large popups-action-item',
                    targetSelectors: ['#s-course-materials-folder-contents-form']
                },
                '.materials-folder-actions .action-publish a': {
                    extraClass: 'popups-small popups-action-item',
                    targetSelectors: ['#s-course-materials-folder-contents-form']
                },
                '.materials-folder-actions .action-unpublish a': {
                    extraClass: 'popups-small popups-action-item',
                    targetSelectors: ['#s-course-materials-folder-contents-form']
                },
                '.materials-folder-actions .action-delete a': {
                    extraClass: 'popups-small popups-action-item',
                    updateMethod: 'reload'
                },
                '.materials-folder-actions .action-copy a': {
                    extraClass: 'popups-large popups-action-item popups-copy',
                    disableInputFocus: true,
                    doneTest: 'course/.+?/materials($|[^\/].*)',
                    updateMethod: 'reload'
                },
                '.materials-folder-actions .action-distribute a': {
                    extraClass: 'popups-large popups-copy popups-action-item'
                },
                '.materials-folder-actions .action-move a': {
                    extraClass: 'popups-small popups-action-item',
                    targetSelectors: ['#course-profile-materials-folders'],
                    updateMethod: 'reload',
                    doneTest: '.+'
                },
                '.materials-folder-actions .action-library-save a': {
                    extraClass: 'popups-large popups-action-item',
                    hijackDestination: true,
                    updateSource: 'final',
                    doneTest: 'course/.+?/materials.*',
                    updateMethod: 'reload',
                },
                '.materials-folder-actions .action-completion a': {
                    extraClass: 'popups-large popups-action-item student-completion-popup'
                }
            };

            // called when new content is loaded based on a filter change
            // bind popup events to the provided context
            // since the wrapperObj never gets removed from the DOM, the event is bound once per filter type and delegated from it
            sAngular.on('sCourseMaterialsFilterContentRefreshed', function(filter) {
                updateOptionMenu(filter);

                if (typeof popupsConfigBound[filter] == 'undefined') {
                    popupsConfigBound[filter] = null;

                    var popupsConf = {};

                    switch (filter) {
                        case 'all':
                            popupsConf = $.extend({}, folderPopupsConf, commonPopupsConf, {
                                '.materials-item-actions .action-convert a': {
                                    extraClass: 'popups-small'
                                },
                                '.materials-item-actions .action-edit-xlarge a': {
                                    extraClass: 'popups-extra-large popups-action-item'
                                },
                                '.materials-item-actions .action-rename a': {
                                    extraClass: 'popups-small popups-action-item'
                                },
                                '.materials-item-actions .action-remove a': {
                                    extraClass: 'popups-small popups-action-item'
                                },
                                '.materials-item-actions .action-package-delete a': {
                                    extraClass: 'popups-small popups-package-delete'
                                },
                                '.materials-item-actions .action-edit-package-props a': {
                                    extraClass: 'popups-extra-large popups-package-edit-props'
                                },
                                '.materials-item-actions .action-edit-launch-props a': {
                                    extraClass: 'popups-small popups-package-edit-launch-props'
                                },
                                '.materials-item-actions .action-view-progress a': {
                                    extraClass: 'popups-extra-large popups-package-progress'
                                },
                                '.materials-item-actions .action-copy a': {
                                    extraClass: 'popups-large popups-action-item popups-copy',
                                    disableInputFocus: true,
                                    doneTest: 'course/.+?/materials($|[^\/].*)',
                                    updateMethod: 'reload',
                                },
                                '.materials-item-actions .action-move a': {
                                    extraClass: 'popups-small popups-action-item',
                                    targetSelectors: ['#course-profile-materials-folders'],
                                    updateMethod: 'reload',
                                    doneTest: '.+'
                                },
                                '.materials-item-actions .action-library-save a': {
                                    extraClass: 'popups-large popups-action-item',
                                    hijackDestination: true,
                                    updateSource: 'final',
                                    doneTest: 'course/.+?/materials.*',
                                    updateMethod: 'reload',
                                }
                            });
                            break;

                        case 'assessments':
                        case 'assignments':
                        case 'discussion':
                            popupsConf = $.extend({}, commonPopupsConf, {
                                '.view-ind-assign': {
                                    extraClass: 'popups-small',
                                    'disableInputFocus': true
                                }
                            });
                            break;

                        case 'scorm':
                            popupsConf = $.extend({}, commonPopupsConf, {
                                '.materials-item-actions .action-edit-package-props a': {
                                    extraClass: 'popups-extra-large popups-package-edit-props'
                                },
                                '.materials-item-actions .action-edit-launch-props a': {
                                    extraClass: 'popups-small popups-package-edit-launch-props'
                                },
                                '.materials-item-actions .action-view-progress a': {
                                    extraClass: 'popups-extra-large popups-package-progress'
                                }
                            });
                            break;

                        case 'web':
                        case 'album':
                            popupsConf = $.extend({}, commonPopupsConf);
                            break;

                        case 'pages':
                            popupsConf = $.extend({}, commonPopupsConf, {
                                '.materials-item-actions .action-edit-xlarge a': {
                                    extraClass: 'popups-extra-large'
                                },
                                '.materials-item-actions .action-add-to-folder a': {
                                    extraClass: 'popups-small'
                                }
                            });
                            break;

                        case 'documents_files':
                        case 'documents_links':
                        case 'documents_external_tools':
                            popupsConf = $.extend({}, commonPopupsConf, {
                                '.materials-item-actions .action-rename a': {
                                    extraClass: 'popups-small popups-action-item'
                                },
                                '.materials-item-actions .action-copy a': {
                                    extraClass: 'popups-large popups-action-item popups-copy',
                                    doneTest: 'course/.+?/materials($|[^\/].*)'
                                }
                            });
                            break;
                        case 'common_assessments':
                        case 'course_assessment':
                            popupsConf = $.extend({}, commonPopupsConf, {
                                '.materials-item-actions .action-edit a': {
                                    hidden: false,
                                    extraClass: 'popups-large popups-action-item',
                                    wrapper: '.action-links-wrapper'
                                },
                                '.materials-item-actions .action-publish a': {
                                    hidden: false,
                                    extraClass: 'popups-small popups-publish',
                                    wrapper: '.action-links-wrapper'
                                },
                                '.materials-item-actions .action-move a': {
                                    hidden: false,
                                    extraClass: 'popups-small popups-action-item',
                                    wrapper: '.action-links-wrapper'
                                },
                            });
                            break;
                    }

                    if (!$.isEmptyObject(popupsConf)) {
                        var selectorPrefix = filter == 'all' ? '.s-js-full-view' : '.s-js-filtered-view-' + filter.replace(/_/g, '-'),
                            globalConfig = sCommonGetSetting('popups', 'links') || {};
                        $.each(popupsConf, function(selector, opts) {
                            // don't bind anything that is already bound in the global configuration
                            if (typeof globalConfig[selector] == 'undefined') {
                                opts = $.extend({}, defaultPopupsOpts, opts);
                                wrapperObj.on('click', selectorPrefix + ' ' + selector, opts, function(e) {
                                    e.preventDefault();
                                    return Popups.clickPopupElement(this, Popups.options(e.data));
                                });
                            }
                        });
                    }
                }
            });

            // the switcher that allows the user to access the filtered materials list
            // associated with theme('s_course_materials_list_view_switcher')
            actionLinksWrapper.sActionLinks({
                hidden: false
            });

            actionLinksWrapper.on('click', '.s-js-material-filter-link', function(e) {
                e.preventDefault();
                var filter = $(this).data('filter');
                sStatsRecordEvent('course:materials:filter_clicked:' + filter);
                changeSelectedFilter(filter);
                setHashFilter(filter);
            });

            var initiallySelected = actionLinksWrapper.find('.selected'),
                hashFilter = getHashFilter();
            if (hashFilter != 'all') {
                // page opened with a hash string of list_filter=[filter]
                changeSelectedFilter(hashFilter);
                refreshContent();
            } else if (initiallySelected.length) {
                // page opened with a query string of list_filter=[filter]
                var initialFilter = initiallySelected.find('.s-js-material-filter-link').data('filter');
                changeSelectedFilter(initialFilter);
                sAngular.trigger('sCourseMaterialsFilterContentRefreshed', initialFilter);
            } else {
                sAngular.trigger('sCourseMaterialsFilterContentRefreshed', 'all');
            }
        });

        // these more links appear in the filtered views, which will cause infinite scrolling to occur
        $('.s-js-materials-filter-more-link:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
            var linkObj = $(this),
                loadMoreKey = 's-js-materials-filter-more';
            linkObj.sInfiniteScroll({
                loadMore: function() {
                    linkObj.trigger('click');
                }
            }).on('click', function(e) {
                e.preventDefault();
                var url = linkObj.attr('href'),
                    wrapperObj = linkObj.closest('.s-js-course-materials-full'),
                    currentMaterialsBody = wrapperObj.find('.s-js-materials-body');
                sToggleActiveLoader(loadMoreKey, linkObj);
                $.ajax({
                    url: url,
                    success: function(data) {
                        var newContentObj = $(data),
                            newFilteredList = newContentObj.find('.s-js-filtered-view-list'),
                            newMoreLink = newContentObj.find('.s-js-materials-filter-more-link');
                        if (newFilteredList.length) {
                            currentMaterialsBody.find('.s-js-filtered-view-list').append(newFilteredList.children());
                        }
                        if (newMoreLink.length) {
                            currentMaterialsBody.append(newMoreLink);
                        }
                        // wait for the content to be in the DOM before attaching behaviors
                        Drupal.attachBehaviors(currentMaterialsBody);
                    },
                    complete: function() {
                        sToggleActiveLoader(loadMoreKey);
                        linkObj.remove();
                    }
                });
            });
        });

        // these are gear icons found in all of the materials filtered views
        $('.s-js-materials-filtered-actions:not(.sCourse-processed)', context).addClass('sCourse-processed').each(function() {
            $(this).find('.action-links-wrapper').sActionLinks({
                hidden: false
            });
        });
    }(context));
}

function sCourseEnableContentReorder(tbodyElement) {
    var allowRootLevelItems = sCourseMaterialsDisplayIsWithoutIndex();

    // Only enable sorting if the passed element is a decendant
    // of #course-profile-materials.materials-admin-view
    if (!tbodyElement.closest('#course-profile-materials').hasClass('materials-admin-view')) {
        return;
    }

    // In the planner view, the left and right sortables shouldn't be connected
    var plannerView = $('#course-profile-materials-folders').hasClass('planner-view');
    if (plannerView) {
        // Left column
        if (tbodyElement.parent().attr('id') == 'folder-contents-table') {
            var connectWith = false;
        }
        // Right column
        else {
            var connectWith = '.subtree-folder-contents-table>tbody, .planner-right-contents-table>tbody';
        }
    }
    // By default, connect all possible sortables
    else {
        var connectWith = '#folder-contents-table>tbody, .subtree-folder-contents-table>tbody, .planner-right-contents-table>tbody';
    }

    tbodyElement.sortable({
        forcePointerForContainers: true, // use the mouse cursor to determine whether we've travelled between containers
        items: '> tr:not(.materials-row-add)',
        handle: '.folder-title, .item-title, .document-body-title, .item-icon, .inline-icon',
        connectWith: connectWith,
        cancel: '.materials-row-add, .type-empty',
        delay: 500,
        helper: function(e, currentItem) {
            var helper = currentItem.clone(),
                subtree = currentItem.find('.folder-subtree');
            helper.find('.folder-subtree').hide();
            helper.find('.s-js-folder-description').hide();

            // if a subtree exists, remove it's height from the floating helper
            // this is so intersection-calculations will not take into account the potentially giant empty space below the item title
            // for more information, see the use of this.helperProportions in _intersectsWith() of the jquery.ui.sortable plugin
            if (subtree.length) {
                helper.height(currentItem.height() - subtree.height());
            }
            return helper;
        },
        placeholder: 'reorder-target-placeholder',
        opacity: 0.5,
        expandDelay: 500,
        expand: function(e, target) {
            var expander = $('.folder-expander', target);
            if (expander.length && !expander.hasClass('expanded')) {
                expander.click();
            }
        },
        start: function(e, ui) {
            // stop the queued saving process
            sCourseSaveContentTableWeightsTimeout && clearTimeout(sCourseSaveContentTableWeightsTimeout);

            $('#folder-contents-table').addClass('sorting');

            // When moving starts, store the associated 'add materials' row
            // along with the row being moved
            var addRow = ui.placeholder.next('.materials-row-add');
            if (addRow.length) {
                ui.item.data('sCourseReorderRowAdd', addRow);
            }
        },
        stop: function(e, ui) {
            $('#folder-contents-table').removeClass('sorting');

            var droppedRow = ui.item;
            var targetSortable = ui.item.parent();

            // Move the 'add materials' row to the new position
            var addRow = ui.item.data('sCourseReorderRowAdd');
            if (addRow) {
                // Since the placeholder can end up before or after
                // an 'add materials' row, decide where to drop the new one
                if (ui.item.next('.materials-row-add').length) {
                    ui.item.before(addRow);
                } else {
                    ui.item.after(addRow);
                }
                ui.item.removeData('sCourseReorderRowAdd');
            }

            // reweight all rows in the table
            var currentWeight = 0;
            var queryParsed = getQueryParams(window.location.search);
            var currentFid = queryParsed.f || 0;
            var parentFolderRow = ui.item.parent().closest('.material-row-folder');
            if (parentFolderRow.length) {
                currentFid = parentFolderRow.attr('id').split('-')[1];
            }
            targetSortable.children().each(function() {
                var row = $(this);
                // Add materials rows
                if (row.hasClass('materials-row-add')) {
                    var rowId = row.attr('id').split('-');
                    rowId[3] = currentFid;
                    rowId[4] = currentWeight;
                    row.attr('id', rowId.join('-'));
                }
                // Item/Folder rows
                else {
                    row.attr('display_weight', currentWeight);

                    // Increment the weight for the next pair of rows
                    currentWeight++;
                }
            });

            // Mark the table as having been updated
            sCourseSaveContentTableWeights(targetSortable, droppedRow);

        },
        change: function(e, ui) {
            var isCurrentItemFolder = ui.item.hasClass('material-row-folder');
            var isDestinationStudentChoice = ui.placeholder.parents('.material-row-student-choice').length > 0;

            if (isCurrentItemFolder && isDestinationStudentChoice) {
                ui.placeholder.hide();
                return;
            }

            if (!allowRootLevelItems) {
                // Don't allow non-folders to be dropped on the top level
                // Hide the placeholder if this is the case
                var queryParsed = getQueryParams(window.location.search);
                var topParentFid = queryParsed.f || 0;
                if (topParentFid == 0 && !isCurrentItemFolder && $(ui.placeholder).closest('table').attr('id') == 'folder-contents-table') {
                    $(ui.placeholder).hide();
                    return;
                }
            }

            $(ui.placeholder).show();
        },
        receive: function(e, ui) {
            var isCurrentItemFolder = ui.item.hasClass('material-row-folder');
            var isDestinationStudentChoice = ui.item.parents('.material-row-student-choice').length > 0;

            // Don't allow folders & student choices to be dropped in student choices
            if (isCurrentItemFolder && isDestinationStudentChoice) {
                ui.sender.sortable('cancel');
                return;
            }

            // Don't allow non-folders to be dropped on the top level
            if ($(this).parent().attr('id') == 'folder-contents-table') {
                if (!allowRootLevelItems) {
                    var queryParsed = getQueryParams(window.location.search);
                    var topParentFid = queryParsed.f || 0;
                    if (topParentFid == 0 && !ui.item.hasClass('material-row-folder')) {
                        ui.sender.sortable('cancel');
                    }
                }
            }
            // Remove metadata if dropping into a subtree
            else {
                ui.item.find('.folder-alignment-wrapper').remove();
                ui.item.find('.folder-visibility').remove();

            }

            // Hide the 'empty' placeholder of the target
            // and show the 'empty' placeholder of the source if applicable
            var targetSortable = ui.item.parent();
            $('>.type-empty', targetSortable).hide();
            if (ui.sender && ui.sender.children().not('.materials-row-add').not('.type-empty').length == 0) {
                $('>.type-empty', ui.sender).show();
            }
        },
    });
}

function sCourseMaterialsDetermineDestination(data, options, element) {
    // if no materials at all and a new one is added, redirect to the appropriate
    // path
    if (location.pathname != Drupal.settings.basePath + data.path)
        location.reload();
}

// Redirect the user to the editor for the newly created topic
// Can't do this the traditional way because of menu_set_active_item
function sCourseTopicGotoEditor(data, options, element) {
    location.href = Drupal.settings.basePath + data.js.setting.popups.originalPath;
    return false;
}

function setupAssignmentPaging(context) {
    $('.gitem-pager').each(function() {
        var parent = $(this);
        var path = window.location.pathname.substring(1);
        var courseID = path.split('/')[1];
        $('a', this).unbind('click').click(function(e) {
            e.preventDefault();
            periodID = parent.attr('id');
            var page = $(this).attr('href').split('page=');
            page = page[1];
            var count = $('.pager-count', parent).val();
            gradeItemType = parent.hasClass('assessment') ? 'assessment' : 'grade-item';
            parent.hide();
            parent.after('<img src="/sites/all/themes/schoology_theme/images/ajax-loader.gif" class="loader" alt="' + Drupal.t('Loading') + '" />');
            var baseURL = '/course/' + courseID + '/assignment_page/' + periodID + '/' + gradeItemType;
            if (parent.parents('.past-assignments-grading-period').length > 0) {
                baseURL += '/past';
            }
            $.ajax({
                url: baseURL + '?page=' + page + '&count=' + count,
                dataType: 'json',
                type: 'GET',
                success: function(response, status) {
                    var liContext = parent.parents('li:first');
                    $('ul:first', liContext).empty();
                    var responseHtml = $(response.html);
                    $('ul:first', liContext).append(responseHtml);
                    parent.siblings('.loader').remove();
                    parent.replaceWith(response.pager);
                    setTimeout(function() {
                        setupAssignmentPaging(context);
                    }, 500);
                    Drupal.attachBehaviors(document);
                }
            });
        });
    });
}

/**
 * It is important, especially in the course context to track viewing on inline content like embeds - this function simply fires off a request to do so
 */
function sCourseTrackGenericPostView(link) {
    var nid = link.attr('id').split('-').pop();
    var realmId = sCommonGetSetting('s_realm_info', 'csm_realm_id');
    if (!realmId) {
        realmId = Drupal.settings.s_realm_info.realm_id;
    }
    var action = '/' + Drupal.settings.s_realm_info.realm + '/' + realmId + '/materials/document/' + nid;
    var ajaxOpts = {
        url: '/stats/manual-tracker/trackPageView',
        type: 'POST',
        data: {
            'action_url': action
        }
    };

    if (!link.hasClass('embed-cover')) {
        /**
         * the backside of only trigger a link after a successful request is for targeted links.
         * targeted links that are automatically triggered out of direct access usually are treated as a pop-up behaviour.
         *
         * Those are the expected results for an anchor tab with `target="_blank"`
         * If you click it, it should open in a new tab.
         * If you click it and the JS trigger action opens a link, it should open in a new tab.
         * If you click it and the JS trigger action does something and then open a link, it will behave as a pop-up (and may or may not be blocked by browsers)
         * If you click it and the JS trigger action does something and then the link is triggered afterwards (like a success from an ajax request), this will surely be blocked by pop-up blocker.
         *
         * The latter is the behavior we're having at this moment with actual changes
         */
        ajaxOpts.success = function() {
            link[0].click();
        };
    }

    $.ajaxSecure(ajaxOpts);
}

var sCourseSaveContentTableWeightsTimeout = null;

function sCourseSaveContentTableWeights(tbodyElement, rowElement) {
    // Mark the element as having been updated
    rowElement.addClass('ui-sortable-item-changed');
    tbodyElement.addClass('ui-sortable-changed');

    // Fire off the saving functionality 5 seconds after the last reorder
    sCourseSaveContentTableWeightsTimeout && clearTimeout(sCourseSaveContentTableWeightsTimeout);
    sCourseSaveContentTableWeightsTimeout = setTimeout(sCourseSaveContentTableWeightsTimeoutHelper, 2000);

    var pageTitle = $('#center-top h2.page-title');
    if (!$('#folder-reorder-save-loader').length) {
        $('body').append('<div id="folder-reorder-save-loader"><span>' + Drupal.t('Saving...') + '</span></div>');
    }
}

function sCourseSaveContentTableWeightsTimeoutHelper() {
    // Get all affected tables
    var droppedRow = $('#course-profile-materials .ui-sortable.ui-sortable-changed .ui-sortable-item-changed').removeClass('ui-sortable-item-changed');
    var toSave = $('#course-profile-materials .ui-sortable.ui-sortable-changed').removeClass('ui-sortable-changed');

    // get the dropped row containing an item
    var droppedRowId = droppedRow.attr('id');
    var droppedItemId = droppedRowId.search(/^n-[\d]+$/) === 0 ? droppedRowId : '';

    // If for some reason we get here and nothing has changed, don't do anything
    if (!toSave.length) {
        return;
    }

    // Get top level parent folder
    var queryParsed = getQueryParams(window.location.search);
    var topParentFid = queryParsed.f || 0;

    // Collect the child items for each affected folder
    var updates = {};
    toSave.each(function() {
        var tbodyElement = $(this);
        var parentFid = topParentFid;
        var parentFolderRow = tbodyElement.closest('.material-row-folder');
        if (parentFolderRow.length) {
            parentFid = parentFolderRow.attr('id').split('-')[1];
        }
        updates[parentFid] = {};
        tbodyElement.children().not('.materials-row-add').not('reorder-target-placeholder').not('.type-empty').each(function() {
            var row = $(this);
            updates[parentFid][row.attr('id')] = row.attr('display_weight');
        });
    });

    // Send to server
    var path = window.location.pathname.substring(1);
    var courseID = path.split('/')[1];
    $.ajaxSecure({
        url: '/course/' + courseID + '/materials/reorder',
        data: {
            updates: updates,
            root_fid: topParentFid,
            dropped_item_id: droppedItemId
        },
        type: 'POST',
        success: function() {
            $('#folder-reorder-save-loader').remove();
        },
        error: function() {
            $('#folder-reorder-save-loader').remove();
        }
    });
}

/**
 * Check whether the current course materials listing is the view without the materials index
 * The "no index" view allows materials items to be placed in the root level of the materials
 *
 * @return bool
 */
function sCourseMaterialsDisplayIsWithoutIndex() {
    var displayMode = sCommonGetSetting('s_course', 'display_mode');
    return displayMode && displayMode == sCommonGetSetting('s_course', 'display_mode_without_index');
}