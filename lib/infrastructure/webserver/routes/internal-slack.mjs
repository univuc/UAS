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

import InvitationReplyModel from '../models/InvitationReplyModel';
import InternalController from '../../../interfaces/controllers/InternalController';
import InvitationModel from '../models/InvitationModel';
import BoomModel from '../models/BoomModel';

const createInvitation = {
    method: 'POST',
    path: '/invitation',
    handler: InternalController.createInvitation,

    options: {
        validate: {
            payload: InvitationModel,
        },
        response: {
            status: {
                200: InvitationReplyModel,
                400: BoomModel,
                500: BoomModel,
            },
        },
    },
};

export default {
    name: 'internal-slack',
    register: async (server) => {
        server.route([createInvitation]);
    },
};
