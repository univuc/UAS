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

import resolve from 'iab/lib/di/resolve';
import config from '../../../config';
import Login from '../../domain/usecases/Login';
import Boom from '@hapi/boom';

export default {

    async login(request, h) {
        const {id, password} = request.payload;

        const token = await resolve(Login).run({userId: id, password: password});
        if (!token) {
            return Boom.unauthorized;
        }

        return h
            .response()
            .code(204)
            .header('Authorization', token)
            .state('univuc_token', token, config.auth.cookie_options);
    },

};
