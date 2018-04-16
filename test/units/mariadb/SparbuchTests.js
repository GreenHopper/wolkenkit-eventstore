'use strict';

const shell = require('shelljs');

const env = require('../../shared/env'),
      getTestsFor = require('../getTestsFor'),
      Eventstore = require('../../../src/mariadb/Eventstore'),
      waitForMaria = require('../../shared/waitForMaria');

suite('mariadb/Eventstore', () => {
  getTestsFor(Eventstore, {
    url: env.MARIA_URL_UNITS,
    nonExistentUrl: 'mariadb://localhost/non-existent',

    async startContainer () {
      shell.exec('docker start mariadb-units');
      await waitForMaria({ url: env.MARIA_URL_UNITS });
    },

    async stopContainer () {
      shell.exec('docker kill mariadb-units');
    }
  });
});
