import logger from '../../common/utils/logger';
import hapi from '@hapi/hapi';
import config from '../../../config';

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

export default async function createUserServer() {
    const server = getServer();

    await setupServer(server);

    logger.info(`User server created. Listening on ${server.settings.address}:${server.settings.port}`);

    return server;
}

function getServer() {
    return hapi.server({
        address: config.user_server.address,
        port: config.user_server.port,
    });
}

async function setupServer(server) {
    await registerRoutes(server);
}

async function registerRoutes(server) {
    await server.register([
        ((await import('./routes/user')).default),
    ]);
}
