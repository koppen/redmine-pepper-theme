console.log('Observing');
document.observe("window.load", function() { 
  alert('window.load');
  console.log('window.load');
});

document.observe("dom:loaded", function() {
  try {
    var topMenuList = $('wrapper').select('#top-menu > ul').first();
    var projectSelector = $('quick-search').select('select').first();

    var wrapper = document.createElement('div');
    wrapper.appendChild(projectSelector);

    var baseNode = document.createElement('li');
    baseNode.appendChild(wrapper)

    topMenuList.appendChild(baseNode);
  } catch(error) {
    console.error(error);
    throw error;
  }
  
});

