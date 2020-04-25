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

import resolve from '../../common/di/resolve';
import DecodeInvitation from '../../domain/usecases/DecodeInvitation';
import Boom from '@hapi/boom';
import ValidateInvitation from '../../domain/usecases/ValidateInvitation';
import CreateInvitation from '../../domain/usecases/CreateInvitation';
import config from '../../../config';
import User from '../../domain/entities/User';
import AddUser from '../../domain/usecases/AddUser';

export default {

    async decodeInvitation(request, h) {
        const encodedInvitation = request.payload.invitation;

        const invitation = await extractInvitation(encodedInvitation, config.invitation.secret_invitation);
        if (!invitation) {
            return Boom.unauthorized();
        }

        const anotherInvitation = await createInvitationToken(invitation, config.invitation.secret_ticket);

        return h.response({
            ticket: anotherInvitation,
            userId: invitation.userId,
            slackUserId: invitation.slackUserId,
        }).code(200);
    },

    async register(request, h) {
        const encodedTicket = request.payload.ticket;
        const password = request.payload.password;

        // This is the anotherInvitation above.
        const ticket = await extractInvitation(encodedTicket, config.invitation.secret_ticket);
        if (!ticket) {
            return Boom.unauthorized();
        }

        const user = new User({
            id: ticket.userId,
            password: password,
            slackUserId: ticket.slackUserId,
        });

        await resolve(AddUser).run({user});

        return h.response({
            id: user.id,
            slackUserId: user.slackUserId,
        }).code(201);
    },

};

async function extractInvitation(encoded, secret) {
    const invitation = await resolve(DecodeInvitation).run({encoded: encoded, secret: secret});
    if (!invitation) {
        return null;
    }

    const isInvitationValid = await resolve(ValidateInvitation).run({invitation});
    if (!isInvitationValid) {
        return null;
    }

    return invitation;
}

async function createInvitationToken(invitation, secret) {
    return await resolve(CreateInvitation).run({invitation, secret});
}
