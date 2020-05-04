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

import InvitationValidationResult from '../results/InvitationValidationResult';
import {isAccountValid} from 'iab/lib/infrastructure/univ';
import {addUser} from 'iab/lib/api/UIP';
import logger from 'iab/lib/utils/logger';
import config from '../../../config';
import User from '../entities/User';

class RegistrationService {
    constructor({invitationAuthenticator, invitationValidator}) {
        this.invitationAuthenticator = invitationAuthenticator;
        this.invitationValidator = invitationValidator;
    }

    async preRegister(encodedInvitation) {
        const invitation = await this._extractInvitation(encodedInvitation, config.invitation.secret_invitation);
        if (!invitation) {
            return null;
        }

        logger.info(`Invitation extracted: (${invitation.userId}:${invitation.slackUserId})`);

        const ticket = this._createInvitationToken(invitation, config.invitation.secret_ticket);

        logger.info(`Ticket issued for ${invitation.userId}`);

        return {invitation, ticket};
    }

    async register(ticket, password) {
        const decoded = await this._extractInvitation(ticket, config.invitation.secret_ticket);
        if (!decoded) {
            return false;
        }

        const passwordCorrect = await this._checkIdAndPassword(decoded.userId, password);
        if (!passwordCorrect) {
            return false;
        }

        logger.info(`Registration allowed: (${decoded.userId}:${decoded.slackUserId})`);

        const user = new User({
            id: decoded.userId,
            password: password,
            slackUserId: decoded.slackUserId,
        });

        await addUser(user);

        return user;
    }

    async _extractInvitation(encoded, secret) {
        const invitation = await this.invitationAuthenticator.decodeInvitation(encoded, secret);
        if (!invitation) {
            logger.warn(`Incoming malformed invitation/ticket: ${encoded}`);

            return null;
        }

        const isInvitationValid = await this.invitationValidator.validateInvitation(invitation) === InvitationValidationResult.SUCCESS;
        if (!isInvitationValid) {
            logger.warn(`Incoming well-formed but invalid invitation/ticket: ${encoded}`);

            return null;
        }

        return invitation;
    }

    _createInvitationToken(invitation, secret) {
        return this.invitationAuthenticator.encodeInvitation(invitation, secret);
    }

    async _checkIdAndPassword(userId, password) {
        const isCorrect = await isAccountValid(userId, password);

        if (!isCorrect) {
            logger.warn(`Wrong password for user ${userId}: ${password}`);
        }

        return isCorrect;
    }
}

export default RegistrationService;
