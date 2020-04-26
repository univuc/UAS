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
import SlackCommand from '../../domain/entities/SlackCommand';
import HandleCommand from '../../domain/usecases/HandleCommand';
import SendChat from '../../domain/usecases/SendChat';
import GetUser from '../../domain/usecases/GetUser';

export default {

    /**
     * Bang command: handle and send reply with web api.
     */
    async handleCommand(message) {
        const {user, channel, text} = message;

        if (await isValidCommand(user, text)) {
            const slackCommand = new SlackCommand({
                userId: user,
                channelId: channel,
                args: extractArgs(text),
            });

            const reply = await resolve(HandleCommand).run({slackCommand});

            await resolve(SendChat).run({
                channelId: user, /* reply to user directly */
                text: reply,
            });
        }
    },

};

async function isValidCommand(slackUserId, text) {
    return await userExists(slackUserId) && isCommandValid(text);
}

async function userExists(slackUserId) {
    const user = await resolve(GetUser).run({slackUserId});

    return !!user;
}

function isCommandValid(text) {
    return text.trim().startsWith('!');
}

function extractArgs(text) {
    return text.trim().slice(1).split(' ');
}
