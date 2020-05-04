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

import {getUser, updateUser} from 'iab/lib/api/UIP';
import {isAccountValid} from 'iab/lib/infrastructure/univ';
import logger from 'iab/lib/utils/logger';

class LoginService {
    constructor({tokenManager}) {
        this.tokenManager = tokenManager;
    }

    async login(userId, password) {
        const userExists = await this._userExists(userId);
        if (!userExists) {
            // Not a member.
            return null;
        }

        // Try login with user data saved in local DB.
        const localLoginResult = await this._tryLocalLogin(userId, password);
        if (localLoginResult) {
            return this.tokenManager.createJwt({userId});
        }

        // Try login to univ LMS directly.
        const remoteLoginResult = await this._tryRemoteLogin(userId, password);
        if (remoteLoginResult) {
            await this._updatePassword(userId, password);

            return this.tokenManager.createJwt({userId});
        }

        // Both failed.
        return null;
    }

    async _userExists(userId) {
        const user = await getUser(userId);

        if (!user) {
            logger.warn(`User ${userId} does not exist`);
        }

        return !!user;
    }

    async _tryLocalLogin(userId, password) {
        const user = await getUser(userId);
        if (!user) {
            logger.info(`Wrong user id: ${userId}`);
            return null;
        }

        const passwordMatches = user.password === password;
        if (!passwordMatches) {
            logger.info(`Wrong password with user: ${userId}`);
            return null;
        }

        logger.verbose(`Login allowed: ${userId}`);
        return true;
    }

    async _tryRemoteLogin(userId, password) {
        const isValid = await isAccountValid(userId, password);

        if (isValid) {
            logger.verbose(`Remote login succeeded: ${userId}`);
        } else {
            logger.info(`Remote login failed: ${userId}`);
        }

        return isValid;
    }

    async _updatePassword(userId, password) {
        const user = await getUser(userId);
        if (!user) {
            logger.info(`Wrong user id: ${userId}`);
            return;
        }

        user.password = password;

        logger.info(`Updating password of ${userId} to newer(remote) one`);
        await updateUser(user);
    }
}

export default LoginService;
