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

import config from '../../../config';
import User from '../entities/User';
import InvitationValidationResult from '../results/InvitationValidationResult';

class RegistrationService {
    constructor({invitationAuthenticator, invitationValidator, userRepository}) {
        this.invitationAuthenticator = invitationAuthenticator;
        this.invitationValidator = invitationValidator;
        this.userRepository = userRepository;
    }

    async preRegister(encodedInvitation) {
        const invitation = await this._extractInvitation(encodedInvitation, config.invitation.secret_invitation);
        if (!invitation) {
            return null;
        }

        const ticket = await this._createInvitationToken(invitation, config.invitation.secret_ticket);

        return {invitation, ticket};
    }

    async register(ticket, password) {
        const invitation = await this._extractInvitation(ticket, config.invitation.secret_ticket);
        if (!invitation) {
            return false;
        }

        const user = new User({
            id: ticket.userId,
            password: password,
            slackUserId: ticket.slackUserId,
        });

        await this.userRepository.addUser(user);

        return user;
    }

    async _extractInvitation(encoded, secret) {
        const invitation = await this.invitationAuthenticator.decodeInvitation(encoded, secret);
        if (!invitation) {
            return null;
        }

        const isInvitationValid = await this.invitationValidator.validateInvitation(invitation) === InvitationValidationResult.SUCCESS;
        if (!isInvitationValid) {
            return null;
        }

        return invitation;
    }

    async _createInvitationToken(invitation, secret) {
        return await this.invitationAuthenticator.encodeInvitation(invitation, secret);
    }
}

export default RegistrationService;
