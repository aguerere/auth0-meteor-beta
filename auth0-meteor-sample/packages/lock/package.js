'use strict';

Package.describe({
    name         : 'auth0:lock',
    version      : '0.3.1',
    summary      : 'Auth0 Lock for Meteor',
    git          : '',
    documentation: 'README.md'
});

Npm.depends({
    "auth0-lock": "7.12.3",
    "brfs"      : "0.0.8",
    "ejsify"    : "0.1.0",
    "packageify": "0.2.0"
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use(['ecmascript', 'accounts-base', 'accounts-oauth']);
    api.use(['pauldowman:dotenv@1.0.1', 'underscore'], 'server');
    api.use(['cosmos:browserify@0.9.2'], 'client');
    api.addFiles(['auth0-lock.browserify.js', 'auth0-lock.js'], 'client');
    api.addFiles(['auth0-lock.server.js'], 'server');
    api.addFiles(['auth0-lock.common.js']);

    api.export('lock', 'client');
});
