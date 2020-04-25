/**
 * This file is part of Univuc/{appname}.
 *
 * Copyright (C) 2020 Univuc <potados99@gmail.com>
 *
 * Univuc/{appname} is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Univuc/{appname} is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import SlashCommandController from '../../../interfaces/controllers/SlashCommandController';

export default {
    name: 'command',
    register: async (server) => {
        server.route({
            method: 'POST',
            path: '/slack/command',
            handler: SlashCommandController.handleCommand,
            options: {
                payload: {
                    /* Do not let hapi touch the payload.
                       We will manually parse it at the
                       payload auth phase of the scheme
                       after authenticating it. */
                    output: 'data',
                    parse: false,
                },
                auth: {
                    mode: 'required',
                    strategy: 'command',
                },
            },
        });
    },
};
