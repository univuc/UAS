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
import Invitation from '../entities/Invitation';
import UseCase from './UseCase';
import config from '../../../config';

class CreateInvitation extends UseCase {
    constructor({invitationAuthenticator, invitationValidator}) {
        super();

        this.invitationAuthenticator = invitationAuthenticator;
        this.invitationValidator = invitationValidator;
    }

    async onExecute({userId, slackUserId}) {
        const invitation = new Invitation({userId, slackUserId});

        const validationResult = await this.invitationValidator.validateInvitation(invitation);
        if (validationResult !== InvitationValidationResult.SUCCESS) {
            return null;
        }

        return this.invitationAuthenticator.encodeInvitation(invitation, config.invitation.secret_invitation);
    }
}

export default CreateInvitation;
