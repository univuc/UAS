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

import CreateInvitation from '../domain/usecases/CreateInvitation';
import InvitationAuthenticator from '../domain/auth/InvitationAuthenticator';
import TokenManager from '../domain/auth/TokenManager';
import Login from '../domain/usecases/Login';
import LoginService from '../domain/services/LoginService';
import InvitationValidator from '../domain/validators/InvitationValidator';
import RegistrationService from '../domain/services/RegistrationService';
import PreRegister from '../domain/usecases/PreRegister';
import Register from '../domain/usecases/Register';

export default [

    /** Use Cases */
    {
        create: async (r) => new CreateInvitation({
            invitationAuthenticator: await r(InvitationAuthenticator),
            invitationValidator: await r(InvitationValidator),
        }),
        as: CreateInvitation,
    },
    {
        create: async (r) => new Login({
            accountService: await r(LoginService),
        }),
        as: Login,
    },
    {
        create: async (r) => new PreRegister({
            registrationService: await r(RegistrationService),
        }),
        as: PreRegister,
    },
    {
        create: async (r) => new Register({
            registrationService: await r(RegistrationService),
        }),
        as: Register,
    },

    /** Services */
    {
        create: async (r) => new LoginService({
            tokenManager: await r(TokenManager),
        }),
        as: LoginService,
    },
    {
        create: async (r) => new RegistrationService({
            invitationAuthenticator: await r(InvitationAuthenticator),
            invitationValidator: await r(InvitationValidator),
        }),
        as: RegistrationService,
    },

    /** Auth */
    {
        create: async (r) => new InvitationAuthenticator(),
        as: InvitationAuthenticator,
    },
    {
        create: async (r) => new TokenManager(),
        as: TokenManager,
    },

    /** Validators */
    {
        create: async (r) => new InvitationValidator(),
        as: InvitationValidator,
    },

];
