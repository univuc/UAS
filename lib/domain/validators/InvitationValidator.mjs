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

class InvitationValidator {
    constructor({userRepository}) {
        this.userRepository = userRepository;
    }

    async validateInvitation(invitation) {
        const {userId, slackUserId} = invitation;

        const userExists = await this.userRepository.findUserById(userId) !== null;
        if (userExists) {
            return InvitationValidationResult.USER_EXISTS;
        }

        const slackUserIdDuplicated = await this.userRepository.findUserBySlackUserId(slackUserId) !== null;
        if (slackUserIdDuplicated) {
            return InvitationValidationResult.SLACK_USER_ID_DUPLICATED;
        }

        return InvitationValidationResult.SUCCESS;
    }
}

export default InvitationValidator;