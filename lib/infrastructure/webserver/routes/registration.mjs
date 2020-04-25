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

import RegistrationController from '../../../interfaces/controllers/RegistrationController';
import BoomModel from './BoomModel';
import Joi from '@hapi/joi';

export default {
    name: 'registration',
    register: async (server) => {
        server.route({
            method: 'POST',
            path: '/from-invitation',
            handler: RegistrationController.decodeInvitation,
            options: {
                validate: {
                    payload: Joi.object({
                        invitation: Joi.string().description('초대 토큰'),
                    }),
                },
                response: {
                    status: {
                        200: Joi.object({
                            userId: Joi.string().description('사용자 학번'),
                            slackUserId: Joi.string().description('사용자 슬랙 id'),
                        }),
                        400: BoomModel,
                        500: BoomModel,
                    },
                },
            },
        });
    },
};
