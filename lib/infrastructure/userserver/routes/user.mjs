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

import Joi from '@hapi/joi';
import Boom from '@hapi/boom';
import GetUser from '../../../domain/usecases/GetUser';
import BoomModel from './BoomModel';

export default {
    name: 'user',
    register: async (server) => {
        server.route(getUser);
    },
};

const getUser = {
    method: 'GET',
    path: '/user/:id',
    handler: async (request, h) => {
        const user = await resolve(GetUser).run({userId: request.path.id});
        if (!user) {
            return Boom.notFound();
        }

        return h.response({
            id: user.id,
            password: user.password,
            slackUserId: user.slackUserId,
        });
    },
    options: {
        validate: {
            path: Joi.object({
                id: Joi.string().description('사용자 id'),
            }),
        },
        response: {
            status: {
                200: Joi.object({
                    id: Joi.string().description('사용자 학번'),
                    password: Joi.string().description('포탈 비밀번호'),
                    slackUserId: Joi.string().description('사용자 슬랙 id'),
                }),
                400: BoomModel,
                404: BoomModel,
                500: BoomModel,
            },
        },
    },
};
