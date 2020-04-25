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
    port: getEnv('UAS_PORT') || 21100,

    slack_token: getEnv('UAS_SLACK_TOKEN') || 'token',
    slack_signing_secret: getEnv('UAS_SLACK_SIGNING_SECRET') || 'secret',

    web_id: getEnv('UAS_WEB_ID') || 'master',
    web_pw: getEnv('UAS_WEB_PW') || '1234',

    invitation: {
        secret_invitation: getEnv('UAS_INVITATION_SECRET') || 'secret',
        secret_ticket: getEnv('UAS_TICKET_SECRET') || 'secret2',
        expire: '1m',
    },
};

