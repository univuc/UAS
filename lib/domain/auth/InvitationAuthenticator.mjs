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

import jwt from 'jsonwebtoken';
import config from '../../../config';
import Invitation from '../entities/Invitation';

class InvitationAuthenticator {
    encodeInvitation(invitation) {
        return jwt.sign(
            invitation,
            config.invitation.secret,
            {expiresIn: config.invitation.expiresIn},
        );
    }

    decodeInvitation(encodedInvitation) {
        const verified = this._decodeOrNull(encodedInvitation);

        if (!verified) {
            return null;
        }

        return new Invitation({
            userId: verified.userId,
            slackUserId: verified.slackUserId,
        });
    }

    _decodeOrNull(encodedInvitation) {
        try {
            return jwt.verify(encodedInvitation, config.invitation.secret);
        } catch (e) {
            return null;
        }
    }
}

export default InvitationAuthenticator;
