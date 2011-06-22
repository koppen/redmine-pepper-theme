document.observe("dom:loaded", function() {
  try {
    function buildProjectMenuItem(project) {
      var link = document.createElement('a');
      link.href = project.url;
      link.innerHTML = project.name;
      if (project.selected) {
        link.addClassName('selected');
      };
      var li = document.createElement('li');
      li.appendChild(link);

      return li;
    };

    function buildProjectList(projects) {
      var projectList = document.createElement('ul');
      projectList.addClassName('projects');
      projectList.setStyle({ display: 'none' });

      projects.each(function(project, index) {
        projectList.appendChild(buildProjectMenuItem(project));
      });

      return projectList;
    };

    function buildProjectListMenuItem(projectList) {
      var menuItem = document.createElement('li');
      menuItem.appendChild(buildProjectListToggle());
      menuItem.appendChild(projectList);
      return menuItem;
    };

    function buildProjectListToggle() {
      var toggle = document.createElement('a');
      toggle.href = '#'; // Makes it behave like a real link
      toggle.innerHTML = 'Choose project&hellip;';

      $(toggle).observe('click', function(event) {
        $(this).up('li').down('.projects').toggle();
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

    function moveProjectSelectorToTopMenu(projectSelector, topMenuList) {
      var projects = getProjectsFromSelectElement(projectSelector);
      var currentProject = projects.find(function(item) { return item.selected; });

      var projectList = buildProjectList(projects);
      var menuItem = buildProjectListMenuItem(projectList);

      // Insert the menu item as the first in top menu
      $(topMenuList).insert({ top: menuItem });

      // Remove the original select list
      projectSelector.hide();
    };

    moveProjectSelectorToTopMenu(
      $('quick-search').select('select').first(),
      $('wrapper').select('#top-menu > ul').first()
    );
  } catch(error) {
    console.error(error);
    throw error;
  }
  
});

