# iiif-manifest-editor #

The iiif-manifest-editor is a web application that generates IIIF manifests. It allows you to import, view, update and export images and metadata using the [IIIF APIs](http://iiif.io/technical-details/).

![Screenshot of the IIIF Manifest Editor](https://cloud.githubusercontent.com/assets/725398/21155319/03fef050-c172-11e6-9253-c19b69c4c837.png)

## How to use
See this Wiki page for instructions on how to use the IIIF manifest editor:
[User manual](https://github.com/bodleian/iiif-manifest-editor/wiki/User-Manual)

## Online Demo
You can find online demos of the IIIF Manifest Editor here:
* [https://iiif.bodleian.ox.ac.uk/manifest-editor/](http://iiif.bodleian.ox.ac.uk/manifest-editor/)
* [https://iiif-manifest-editor.herokuapp.com/](https://iiif-manifest-editor.herokuapp.com/)

## How to set up the application ##

### Prerequisites ###

* Install npm globally: https://github.com/npm/npm
* Install nvm (Node Version Manager) globally: https://github.com/creationix/nvm

### How to set up the application ###

* Clone this repository: `git clone git@github.com:bodleian/iiif-manifest-editor.git`
* Change into the project directory: `cd iiif-manifest-editor`
* Install Node v8.1.4 with nvm: `nvm install v8.1.4`
* Install the required node modules into the project: `npm install`

## How to run the application ##

* Run webpack to generate the bundle file either once or dynamically on file changes:
  * `npm run build`: This builds the bundle file once
  * `npm run watch`: This builds the bundle file dynamically on all file changes
  * Note: when changing webpack.config.js, webpack needs to be restarted
* Start the server: `npm run start`
  * The application will run on [http://localhost:3000](http://localhost:3000) by default

## How to run tests ##

* `npm run test`
