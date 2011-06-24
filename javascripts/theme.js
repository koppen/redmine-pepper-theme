document.observe("dom:loaded", function() {
  //try {
    function buildProjectMenuItem(project) {
      var link = $(document.createElement('a'));
      link.href = project.url;
      link.innerHTML = project.name;
      if (project.selected) {
        link.addClassName('selected');
      };
      var li = $(document.createElement('li'));
      li.appendChild(link);

      return li;
    };

    function buildProjectList(projectSelector) {
      var projects = getProjectsFromSelectElement(projectSelector);
      var projectList = $(document.createElement('ul'));
      projectList.addClassName('projects');
      projectList.setStyle({ display: 'none' });

      projects.each(function(project, index) {
        projectList.appendChild(buildProjectMenuItem(project));
      });

      return projectList;
    };

    function buildProjectListMenuItem(projectSelector) {
      var menuItem = $(document.createElement('li'));

      var title = getTitleFromSelectElement(projectSelector);
      menuItem.appendChild(buildProjectListToggle(title));

      var projectList = buildProjectList(projectSelector);
      menuItem.appendChild(projectList);

      return menuItem;
    };

    function buildProjectListToggle(title) {
      var toggle = $(document.createElement('a'));
      toggle.href = '#'; // Makes it behave like a real link
      toggle.innerHTML = title.replace('...', '&hellip;');

      $(toggle).observe('click', function(event) {
        $(this).up('li').down('.projects').toggle();
        $(this).toggleClassName('active');

        event.stop();
      });

      return toggle;
    };

    function getProjectsFromSelectElement(element) {
      var projectOptions = element.getElementsBySelector('option[value!=""]');
      return projectOptions.collect(function(node) {
        return {
          url: node.value,
          name: node.innerHTML,
          selected: node.readAttribute('selected') == 'selected'
        };
      });
    };

    function getTitleFromSelectElement(element) {
      var title = element.childElements().first().innerHTML;
      return title;
    };

    function moveProjectSelectorToTopMenu(projectSelector, topMenuList) {
      if (!projectSelector || !topMenuList) {
        return false;
      }

      var menuItem = buildProjectListMenuItem(projectSelector);

      // Insert the menu item as the first in top menu
      $(topMenuList).insert({ top: menuItem });

      // Make the projectList at least as wide as the menu item
      var width = menuItem.getWidth();
      $(menuItem).down('.projects').setStyle({ minWidth: width + 'px' });

      // Remove the original select list
      projectSelector.hide();
    };

    moveProjectSelectorToTopMenu(
      $$('#quick-search select').first(),
      $$('#wrapper #top-menu > ul').first()
    );

  // } catch(error) {
  //   if (typeof(console) != 'undefined') {
  //     console.error(error);
  //   };
  //   throw error;
  // }
  
});

