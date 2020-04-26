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
import ValidateInvitation from '../../domain/usecases/ValidateInvitation';
import InvitationAuthenticator from '../../domain/auth/InvitationAuthenticator';
import CreateJwt from '../../domain/usecases/CreateJwt';
import TokenManager from '../../domain/auth/TokenManager';
import DecodeInvitation from '../../domain/usecases/DecodeInvitation';
import DeleteUser from '../../domain/usecases/DeleteUser';
import GetUser from '../../domain/usecases/GetUser';
import HandleCommand from '../../domain/usecases/HandleCommand';
import CommandService from '../../domain/services/CommandService';
import Login from '../../domain/usecases/Login';
import AccountService from '../../domain/services/AccountService';
import SendChat from '../../domain/usecases/SendChat';
import SlackRepository from '../../domain/repositories/SlackRepository';
import InvitationValidator from '../../domain/validators/InvitationValidator';
import SlackAuthenticator from '../../domain/auth/SlackAuthenticator';
import SlackRepositoryImpl from '../../interfaces/storage/SlackRepositoryImpl';
import UserRepositoryImpl from '../../interfaces/storage/UserRepository';

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
            validateInvitation: await r(ValidateInvitation),
            invitationAuthenticator: await r(InvitationAuthenticator),
        }),
        as: CreateInvitation,
    },
    {
        create: async (r) => new CreateJwt({
            tokenManager: await r(TokenManager),
        }),
        as: CreateJwt,
    },
    {
        create: async (r) => new DecodeInvitation({
            invitationAuthenticator: await r(InvitationAuthenticator),
        }),
        as: DecodeInvitation,
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
            accountService: await r(AccountService),
        }),
        as: Login,
    },
    {
        create: async (r) => new SendChat({
            slackRepository: await r(SlackRepository),
        }),
        as: SendChat,
    },
    {
        create: async (r) => new ValidateInvitation({
            invitationValidator: await r(InvitationValidator),
        }),
        as: ValidateInvitation,
    },

    /** Services */
    {
        create: async (r) => new AccountService({
            userRepository: await r(UserRepository),
            tokenManager: await r(TokenManager),
        }),
        as: AccountService,
    },
    {
        create: async (r) => new CommandService(), // TODO
        as: CommandService,
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
