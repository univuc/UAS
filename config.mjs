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

import getEnv from './lib/common/utils/env';

export default {
    web_server: {
        address: '0.0.0.0',
        port: getEnv('UAS_WEB_SERVER_PORT') || 21100,
    },

    user_server: {
        address: 'localhost',
        port: getEnv('UAS_USER_SERVER_PORT') || 9999,
    },

    slack: {
        token: getEnv('UAS_SLACK_TOKEN') || 'token', /* for web api */
        signing_secret: getEnv('UAS_SLACK_SIGNING_SECRET') || 'secret', /* for event subscription */
    },

    auth: {
        secret: getEnv('UAS_AUTH_SECRET') || 'secret0',
        expire: '1d',
        cookie_options: {
            encoding: 'none', // we already used JWT to encode
            isSecure: false, // https only?
            isHttpOnly: true, // prevent client alteration
            clearInvalid: true, // remove invalid cookies
            strictHeader: true, // don't allow violations of RFC 6265
        },
    },

    invitation: {
        secret_invitation: getEnv('UAS_INVITATION_SECRET') || 'secret1',
        secret_ticket: getEnv('UAS_TICKET_SECRET') || 'secret2',
        expire: '5m',
    },
};

