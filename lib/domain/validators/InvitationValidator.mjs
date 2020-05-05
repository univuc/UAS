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
import logger from 'iab/lib/utils/logger';
import {getUser} from 'iab/lib/api/UIP';

class InvitationValidator {
    async validateInvitation(invitation) {
        const {userId, slackUserId} = invitation;

        logger.verbose(`Validating invitation: ${userId}`);

        const userExists = !!await getUser(userId);
        if (userExists) {
            logger.warn(`User ${userId} in invitation already exists`);

            return InvitationValidationResult.USER_EXISTS;
        }

        logger.verbose(`${userId} does not exist`);

        const slackUserIdDuplicated = !!await getUser(slackUserId);
        if (slackUserIdDuplicated) {
            logger.warn(`User ${userId} has a slack id ${slackUserId} that has already been occupied`);

            return InvitationValidationResult.SLACK_USER_ID_DUPLICATED;
        }

        logger.verbose(`User with slack id ${slackUserId} does not exist`);
        logger.info(`Validating invitation ${userId} succeeded`);

        return InvitationValidationResult.SUCCESS;
    }
}

export default InvitationValidator;
