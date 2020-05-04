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

import PreRegister from '../../domain/usecases/PreRegister';
import Register from '../../domain/usecases/Register';
import resolve from 'iab/lib/di/resolve';
import Boom from '@hapi/boom';

export default {

    async preRegister(request, h) {
        const {invitation} = request.payload;

        const result = await resolve(PreRegister).run({invitation});
        if (!result) {
            return Boom.forbidden();
        }

        return h.response({
            ticket: result.ticket,
            userId: result.invitation.userId,
            slackUserId: result.invitation.slackUserId,
        }).code(200);
    },

    async register(request, h) {
        const {ticket, password} = request.payload;

        const newlyAddedUser = await resolve(Register).run({ticket, password});
        if (!newlyAddedUser) {
            return Boom.forbidden();
        }

        return h.response({
            id: newlyAddedUser.id,
            slackUserId: newlyAddedUser.slackUserId,
        }).code(201);
    },

};
