function injectViewportMetaTag() {
  var meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=450';
  $('head').append(meta);
};

ProjectMenuBuilder = {
  buildMenuItem: function(project) {
    var link = $(document.createElement('a'));
    link.attr('href', project.url);
    link.html(project.name);
    if (project.selected) {
      $(link).addClass('selected');
    };
    var li = $(document.createElement('li'));
    li.append(link);

    return li;
  },

  buildList: function(projectSelector) {
    var projects = ProjectMenuBuilder.getProjects(projectSelector);
    if (projects.length == 0) {
      return;
    } else {
      var projectList = $(document.createElement('ul'));
      projectList.addClass('projects');
      projectList.css('display', 'none');

      projects.each(function(index, project) {
        projectList.append(ProjectMenuBuilder.buildMenuItem(project));
      });

      return projectList;
    };
  },

  buildProjectSelector: function(selectElement) {
    var projectList = ProjectMenuBuilder.buildList(selectElement);
    if (projectList) {
      var selector = $(document.createElement('div'));
      selector.addClass('project_selector');

      var title = ProjectMenuBuilder.getTitle(selectElement);
      var toggle = ProjectMenuBuilder.buildToggle(title);
      selector.append(toggle);

      selector.append(projectList);

      return selector;
    };
  },

  buildToggle: function(title) {
    var toggle = $(document.createElement('a'));
    toggle.addClass('toggle');
    toggle.attr('href', '#'); // Makes it behave like a real link
    toggle.attr('title', title);
    toggle.html(title.replace('...', '&hellip;'));
    return toggle;
  },

  getProjects: function(element) {
    var projectOptions = $('#project_quick_jump_box option[value!=""]');
    return projectOptions.map(function(index, node) {
      node = $(node);
      return {
        url: node.val(),
        name: node.html(),
        selected: node.attr('selected', 'selected')
      };
    });
  },

  getTitle: function(element) {
    var title = element.children().html();
    return title;
  },

  projectsNode: function() {
    return $('.project_selector .projects');
  },

  toggleNode: function() {
    return $('.project_selector .toggle');
  },

  // Hook up events
  bindEvents: function(selector) {
    if (!selector) { return };

    selector.toggleProjects = function(event) {
      if ($('.project_selector .projects:visible').length > 0) {
        this.hideProjects(event);
      } else {
        this.showProjects(event);
      };
    };

    selector.hideProjects = function(event) {
      ProjectMenuBuilder.projectsNode().hide();
      ProjectMenuBuilder.toggleNode().removeClass('active');
    };

    selector.showProjects = function(event) {
      ProjectMenuBuilder.projectsNode().show();
      ProjectMenuBuilder.toggleNode().addClass('active');
    };

    // Display the project dropdown when the toggle is clicked
    selector.find('.toggle').click(function(event) {
      selector.toggleProjects(event);
      event.preventDefault();
    });

    // Hide the dropdown again a short while after we've moved the mouse away
    selector.mouseout(function(event) {
      selector.toggleTimer = setTimeout(selector.hideProjects, 500);
    });

    // Cancel the timer to hide the dropdown if we move the mouse back over the menu
    selector.mouseover(function(event) {
      if (selector.toggleTimer) {
        clearTimeout(selector.toggleTimer);
      };
    });
  },

  // Creates a menu with links to all the users projects and adds it next to the project name
  moveProjectSelectorToProjectName: function(projectSelector, projectName) {
    if (!projectSelector || !projectName) {
      return false;
    }

    var selector = ProjectMenuBuilder.buildProjectSelector(projectSelector);
    if (selector) {
      ProjectMenuBuilder.bindEvents(selector);

      // Insert the project selector after the project name
      selector.insertAfter(projectName);

      // Remove the original select list
      projectSelector.hide();
    };
  }
};

$(document).ready(function() {
  ProjectMenuBuilder.moveProjectSelectorToProjectName(
    $('#quick-search select'),
    $('#header h1')
  );
  injectViewportMetaTag();
});
