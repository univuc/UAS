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

import AddUser from '../../domain/usecases/AddUser';
import UserRepository from '../../domain/repositories/UserRepository';
import CheckUser from '../../domain/usecases/CheckUser';
import CreateInvitation from '../../domain/usecases/CreateInvitation';
import InvitationAuthenticator from '../../domain/auth/InvitationAuthenticator';
import TokenManager from '../../domain/auth/TokenManager';
import DeleteUser from '../../domain/usecases/DeleteUser';
import GetUser from '../../domain/usecases/GetUser';
import HandleCommand from '../../domain/usecases/HandleCommand';
import CommandService from '../../domain/services/CommandService';
import Login from '../../domain/usecases/Login';
import LoginService from '../../domain/services/LoginService';
import SendChat from '../../domain/usecases/SendChat';
import SlackRepository from '../../domain/repositories/SlackRepository';
import InvitationValidator from '../../domain/validators/InvitationValidator';
import SlackAuthenticator from '../../domain/auth/SlackAuthenticator';
import SlackRepositoryImpl from '../../interfaces/storage/SlackRepositoryImpl';
import UserRepositoryImpl from '../../interfaces/storage/UserRepository';
import RegistrationService from '../../domain/services/RegistrationService';
import PreRegister from '../../domain/usecases/PreRegister';
import Register from '../../domain/usecases/Register';

export default [

    /** Use Cases */
    {
        create: async (r) => new AddUser({
            userRepository: await r(UserRepository),
        }),
        as: AddUser,
    },
    {
        create: async (r) => new CheckUser({
            userRepository: await r(UserRepository),
        }),
        as: CheckUser,
    },
    {
        create: async (r) => new CreateInvitation({
            invitationAuthenticator: await r(InvitationAuthenticator),
            invitationValidator: await r(InvitationValidator),
        }),
        as: CreateInvitation,
    },
    {
        create: async (r) => new DeleteUser({
            userRepository: await r(UserRepository),
        }),
        as: DeleteUser,
    },
    {
        create: async (r) => new GetUser({
            userRepository: await r(UserRepository),
        }),
        as: GetUser,
    },
    {
        create: async (r) => new HandleCommand({
            commandService: await r(CommandService),
        }),
        as: HandleCommand,
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
    {
        create: async (r) => new SendChat({
            slackRepository: await r(SlackRepository),
        }),
        as: SendChat,
    },

    /** Services */
    {
        create: async (r) => new CommandService(), // TODO
        as: CommandService,
    },
    {
        create: async (r) => new LoginService({
            userRepository: await r(UserRepository),
            tokenManager: await r(TokenManager),
        }),
        as: LoginService,
    },
    {
        create: async (r) => new RegistrationService({
            invitationAuthenticator: await r(InvitationAuthenticator),
            invitationValidator: await r(InvitationValidator),
            userRepository: await r(UserRepository),
        }),
        as: RegistrationService,
    },

    /** Auth */
    {
        create: async (r) => new InvitationAuthenticator(),
        as: InvitationAuthenticator,
    },
    {
        create: async (r) => new SlackAuthenticator(),
        as: SlackAuthenticator,
    },
    {
        create: async (r) => new TokenManager(),
        as: TokenManager,
    },

    /** Validators */
    {
        create: async (r) => new InvitationValidator({
            userRepository: await r(UserRepository),
        }),
        as: InvitationValidator,
    },

    /** Repositories */
    {
        create: async (r) => new SlackRepositoryImpl(),
        as: SlackRepository,
    },
    {
        create: async (r) => new UserRepositoryImpl({}), // TODO
        as: UserRepository,
    },

];
