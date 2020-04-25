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

import SlackRepository from '../../domain/repositories/SlackRepository';
import config from '../../../config';
import api from '@slack/web-api';

class SlackRepositoryImpl extends SlackRepository {
    constructor() {
        super();

        this.webApi = new api.WebClient(config.slack_token);
    }

    async writeToChannel(channel, text) {
        return await this.webApi.chat.postMessage({
            channel: channel,
            text: text,
        });
    }
}

export default SlackRepositoryImpl;
