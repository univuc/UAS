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

import {setHapiInternalAuth} from 'iab/lib/infrastructure/hapi';
import logger from 'iab/lib/utils/logger';
import config from '../../../config';
import hapi from '@hapi/hapi';

export default async function createServer() {
    const server = getServer();

    setHapiInternalAuth(server);
    await registerRoutes(server);

    logger.info(`Web server created. Listening on ${server.settings.port}`);

    return server;
}

function getServer() {
    return hapi.server({
        port: config.server.port,
    });
}

async function registerRoutes(server) {
    await server.register([
        ((await import('./routes/login')).default),
        ((await import('./routes/registration')).default),
        ((await import('./routes/internal-slack')).default),
    ]);
}
