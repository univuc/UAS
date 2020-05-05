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
import logger from 'iab/lib/utils/logger';

export default {

    async createInvitation(request, h) {
        if (!authenticateInternalRequest(request, h)) {
            return Boom.unauthorized();
        }

        const {userId, slackUserId} = request.payload;

        const result = await resolve(CreateInvitation).run({userId, slackUserId});
        if (!result) {
            // It will be replied to slack.
            const failMessage = `사용자 id(${userId}) 또는 slack id(${slackUserId})를 사용하는 계정이 이미 존재합니다. ` +
                `회원가입은 유일한 사용자 id와 slack id의 조합으로만 가능합니다.`;
            return h.response(failMessage).code(200);
        }

        // TODO url can be changed.
        const successMessage = `아래 링크를 눌러 회원가입을 완료하세요.\n\n` +
            `https://univuc.gq/from-invitation?invitation=${result}`;

        return h.response(successMessage).code(200);
    },

};

function authenticateInternalRequest(request, h) {
    const ok = request.headers['internal-slack-auth'] === config.secret.internal_slack; /* lower!!!! */
    if (ok) {
        logger.verbose('Request from slack authenticated');
    } else {
        logger.warn('Internal slack route not authenticated!');
    }

    return ok;
}
