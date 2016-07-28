# iiif-manifest-editor #

The iiif-manifest-editor is a web application that generates IIIF manifests using local image files and existing IIIF manifests.
The web application allows you to import, view, update and export metadata using the [IIIF APIs](http://iiif.io/technical-details/).

## How to use
See this Wiki page for instructions on how to use the IIIF manifest editor:
[User manual](https://github.com/bodleian/iiif-manifest-editor/wiki/User-Manual)


## How to set up the application ##

### Prerequisites ###

* Install npm globally: https://github.com/npm/npm
* Install nvm (Node Version Manager) globally: https://github.com/creationix/nvm

### How to set up the application ###

* Clone this repository: `git clone git@github.com:bodleian/iiif-manifest-editor.git`
* Change into the project directory: `cd iiif-manifest-editor`
* Install Node v6.1.0 with nvm: `nvm install v6.1.0`
* Set nvm to use Node v6.1.0: `nvm use v6.1.0`
* Install the required node modules into the project: `npm install`

## How to run the application ##

* Run webpack to generate the bundle file either once or dynamically on file changes:
  * `npm run build`: This builds the bundle file once
  * `npm run watch`: This builds the bundle file dynamically on all file changes
  * Note: when changing webpack.config.js, webpack needs to be restarted
* Start the server: `node server.js`
  * The application will run on [http://localhost:3000](http://localhost:3000) by default

## How to run tests ##

* `npm run test`
