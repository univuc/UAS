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
import GetUser from '../../domain/usecases/GetUser';
import Boom from '@hapi/boom';
import logger from '../../common/utils/logger';

export default {
    async findUser(request, h) {
        const {id} = request.params;

        const user = await resolve(GetUser).run({userId: id});
        if (!user) {
            logger.info(`External query to get user ${id} failed`);

            return Boom.notFound();
        }

        return h.response({
            id: user.id,
            password: user.password,
            slackUserId: user.slackUserId,
        });
    },
};
