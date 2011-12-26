Pepper - a Redmine theme
========================

You develop great software. You use Redmine to manage your projects. Your Redmine instance should look at least as high tech and sleek as the software you develop.

Pepper is a Redmine theme that looks professional, generic enough to be usable by most organizations, while not becoming bland or boring - fitting for any high tech software company.

It has been tested with [Redmine](http://redmine.org) 1.2, and should work fine with [Chili Project](http://chiliproject.org) as well.


Features
--------

* Fluid width design
* Responsive design that adapts to small screens
* Project selector moved to top menu
* Copious amounts of CSS3 to achieve almost image-less styling


Browsers
--------

While Pepper has been designed for modern browsers, thus looks its best in Chrome, Firefox, and Safari, it looks fine in IE9 and degrades gracefully for other less capable browsers.

* Chrome 11
* Firefox 5
* Internet Explorer 9
* Safari 5


Installing
----------

Using git, you can simply clone the theme into your Redmine theme directory like so:

    $ cd /path/to/redmine/public/themes
    $ git clone http://github.com/koppen/redmine-pepper-theme.git pepper

or you can download the theme archive from https://github.com/koppen/redmine-pepper-theme/tarball/master and follow the instructions at http://www.redmine.org/projects/redmine/wiki/Themes to install it.


Modifying
---------

The source of the theme is in [Sass](http://sass-lang.com) format, and you need [Ruby](http://ruby-lang.org), [Sass](http://sass-lang.com) (>= 3.1), and [Compass](http://compass-style.org) (>= 0.11).

To build the final CSS:

    $ compass compile

Never edit stylesheets/application.css as it will be overwritten by Compass.


Screenshots
-----------

![Redmine homepage](http://mentalized.net/files/journal/pepper/pepper-homepage.png)
![Project overview](http://mentalized.net/files/journal/pepper/pepper-project_overview.png)
![Issues list](http://mentalized.net/files/journal/pepper/pepper-issue_list.png)
![Issue](http://mentalized.net/files/journal/pepper/pepper-issue.png)
![New issue](http://mentalized.net/files/journal/pepper/pepper-new_issue.png)
![Administration settings](http://mentalized.net/files/journal/pepper/pepper-settings.png)


Credits
-------

* Includes icons from the Iconic iconset by P.J. Onori: [http://somerandomdude.com/projects/iconic](http://somerandomdude.com/projects/iconic/)


License
-------

Pepper is licensed under the [Expat/MIT License](http://www.opensource.org/licenses/mit-license.php).
