/**
 * This file is part of Univuc/UAS.
 *
 * Copyright (C) 2020 Univuc <potados99@gmail.com>
 *
 * Univuc/UAS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Univuc/UAS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import logger from '../../common/utils/logger';
import config from '../../../config';

import hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import scheme from './auth/scheme';

export default async function createWebServer() {
    const server = getServer();

    await setupServer(server);

    logger.info('Web server created.');

    return server;
}

function getServer() {
    return hapi.server({
        port: config.port,
    });
}

async function setupServer(server) {
    await registerPlugins(server);
    await setSlackCommandAuth(server);
    await registerRoutes(server);
}

async function registerPlugins(server) {
    await server.register([
        inert,
    ]);
}

async function setSlackCommandAuth(server) {
    const slackbotCommandScheme = (server, options) => {
        return {
            authenticate: scheme.getCommandAuthenticator(),
            payload: scheme.getCommandPayloadHandler(),
            options: {
                payload: true, /* explicitly say we use payload auth. */
            },
        };
    };

    server.auth.scheme('slackbot-command-scheme', slackbotCommandScheme);
    server.auth.strategy('command', 'slackbot-command-scheme');
}

async function registerRoutes(server) {
    await server.register([
        ((await import('./routes/command')).default),
        ((await import('./routes/login')).default),
        ((await import('./routes/registration')).default),
    ]);
}
