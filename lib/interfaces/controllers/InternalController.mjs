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

import CreateInvitation from '../../domain/usecases/CreateInvitation';
import resolve from 'iab/lib/di/resolve';
import config from '../../../config';
import Boom from '@hapi/boom';

export default {

    async createInvitation(request, h) {
        if (!authenticateInternalRequest(request, h)) {
            return Boom.unauthorized();
        }

        const {userId, slackUserId} = request.payload;

        const result = await resolve(CreateInvitation).run({userId, slackUserId});
        if (!result) {
            return Boom.forbidden();
        }

        return h.response(result).code(200);
    },

};

function authenticateInternalRequest(request, h) {
    return request.headers['internal-slack-auth'] === config.secret.internal_slack; /* lower!!!! */
}
