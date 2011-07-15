function injectViewportMetaTag() {
  var meta = $(document.createElement('meta'));
  meta.name = 'viewport';
  meta.content = 'width=450';
  $$('head')[0].insert(meta);
};

ProjectMenuBuilder = {
  buildMenuItem: function(project) {
    var link = $(document.createElement('a'));
    link.href = project.url;
    link.innerHTML = project.name;
    if (project.selected) {
      link.addClassName('selected');
    };
    var li = $(document.createElement('li'));
    li.appendChild(link);

    return li;
  },

  buildList: function(projectSelector) {
    var projects = ProjectMenuBuilder.getProjects(projectSelector);
    var projectList = $(document.createElement('ul'));
    projectList.addClassName('projects');
    projectList.setStyle({ display: 'none' });

    projects.each(function(project, index) {
      projectList.appendChild(ProjectMenuBuilder.buildMenuItem(project));
    });

    return projectList;
  },

  buildListMenuItem: function(projectSelector) {
    var menuItem = $(document.createElement('div'));
    menuItem.addClassName('selector');

    var title = ProjectMenuBuilder.getTitle(projectSelector);
    menuItem.appendChild(ProjectMenuBuilder.buildToggle(title));

    var projectList = ProjectMenuBuilder.buildList(projectSelector);
    menuItem.appendChild(projectList);

    return menuItem;
  },

  buildToggle: function(title) {
    var toggle = $(document.createElement('a'));
    toggle.href = '#'; // Makes it behave like a real link
    toggle.addClassName('toggle');
    toggle.title = title;
    toggle.innerHTML = toggle.title.replace('...', '&hellip;');

    $(toggle).observe('click', function(event) {
      $(this).next('.projects').toggle();
      $(this).toggleClassName('active');
      event.stop();
    });

    return toggle;
  },
  
  getProjects: function(element) {
    var projectOptions = element.getElementsBySelector('option[value!=""]');
    return projectOptions.collect(function(node) {
      return {
        url: node.value,
        name: node.innerHTML,
        selected: node.readAttribute('selected') == 'selected'
      };
    });
  },
  
  getTitle: function(element) {
    var title = element.childElements().first().innerHTML;
    return title;
  },
  
  // Creates a menu with links to all the users projects and adds it next to the project name
  moveProjectSelectorToProjectName: function(projectSelector, projectName) {
    if (!projectSelector || !projectName) {
      return false;
    }

    var menuItem = ProjectMenuBuilder.buildListMenuItem(projectSelector);

    // Insert the menu item as the first in top menu
    projectName.insert({ bottom: menuItem });

    // Remove the original select list
    projectSelector.hide();
  }
};

document.observe("dom:loaded", function() {
  try {
  ProjectMenuBuilder.moveProjectSelectorToProjectName(
    $$('#quick-search select').first(),
    $$('#header h1').first()
  );
} catch (error) {
  console.error(error)
}
  injectViewportMetaTag();
});

