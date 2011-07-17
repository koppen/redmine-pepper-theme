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

  buildProjectSelector: function(selectElement) {
    var selector = $(document.createElement('div'));
    selector.addClassName('project_selector');

    var title = ProjectMenuBuilder.getTitle(selectElement);
    selector.appendChild(ProjectMenuBuilder.buildToggle(title));

    var projectList = ProjectMenuBuilder.buildList(selectElement);
    selector.appendChild(projectList);

    return selector;
  },

  buildToggle: function(title) {
    var toggle = $(document.createElement('a'));
    toggle.href = '#'; // Makes it behave like a real link
    toggle.addClassName('toggle');
    toggle.title = title;
    toggle.innerHTML = toggle.title.replace('...', '&hellip;');

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

  // Hook up events
  bindEvents: function(selector) {
    selector.toggleProjects = function() {
      if ($(this).down('.projects').visible()) {
        this.hideProjects();
      } else {
        this.showProjects();
      };
    };

    selector.hideProjects = function() {
      $(this).down('.projects').hide();
      $(this).down('.toggle').removeClassName('active');
    };

    selector.showProjects = function() {
      $(this).down('.projects').show();
      $(this).down('.toggle').addClassName('active');
    };

    // Display the project dropdown when the toggle is clicked
    selector.down('.toggle').observe('click', function(event) {
      selector.toggleProjects();
      event.stop();
    });

    // Hide the dropdown again a short while after we've moved the mouse away
    selector.observe('mouseout', function(event) {
      selector.toggleTimer = new PeriodicalExecuter(function(pe) {
        selector.hideProjects();
        pe.stop();
      }, 1);
    });

    // Cancel the timer to hide the dropdown if we move the mouse back over the menu
    selector.observe('mouseover', function(event) {
      if (selector.toggleTimer) {
        selector.toggleTimer.stop();
      };
    });
  },

  // Creates a menu with links to all the users projects and adds it next to the project name
  moveProjectSelectorToProjectName: function(projectSelector, projectName) {
    if (!projectSelector || !projectName) {
      return false;
    }

    var selector = ProjectMenuBuilder.buildProjectSelector(projectSelector);
    ProjectMenuBuilder.bindEvents(selector);

    // Insert the project selector after the project name
    projectName.insert({ after: selector });

    // Remove the original select list
    projectSelector.hide();
  }
};

document.observe("dom:loaded", function() {
  ProjectMenuBuilder.moveProjectSelectorToProjectName(
    $$('#quick-search select').first(),
    $$('#header h1').first()
  );
  injectViewportMetaTag();
});

