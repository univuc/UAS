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

import UserRepository from '../../domain/repositories/UserRepository';
import logger from 'iab/lib/utils/logger';

class UserRepositoryImpl extends UserRepository {
    constructor({}) {
        super();
    }

    async isUserIdAndPwValid(userId, password) {
        logger.error('isUserIdAndPwValid');
    }

    async addUser(userId) {
        logger.error('addUser');
    }

    async deleteUser(userId) {
        logger.error('deleteUser');
    }

    async findUserById(userId) {
        logger.error('findUserById');
    }

    async findUserBySlackUserId(slackUserId) {
        logger.error('findUserBySlackUserId');
    }

    async changePassword(userId, newPassword) {
        logger.error('changePassword');
    }
}

export default UserRepositoryImpl;
