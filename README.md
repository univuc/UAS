# UAS

**User Authentication Service**

> This project is part of [Univ UC](https://github.com/univuc).

## Features

### Sign-up and sign-in

UAS acts as a main authenticator of the whole Univ UC services.    
It supports a single and inter-services authentication like SSO does.

#### Invitation-based registration

Sign-up is only allowed for those who have invitation token.    
The token includes a user id, and slack id of that user.

Once a user came for pre-registration with a valid token,     
UAS verifies it and issue a new ticket, which is effectively a new invitation token.
A user then sends a ticket with her/his password.    
If the ticket is valid, and the password is correct, registration gets done successfully. 

#### Adoptive login

UAS saves a user password in its DB.     
Every time user requests a login, the password gets compared with the one in the request.

What if a user changes the password on the univ's portal interface? fail to login?    
UAS tries to match a user id with its password in the local DB.    
If no valid pair exists on local, it send a request directly to the univ portal.
If a remote login succeeded, UAS updates a password with the successful one.

#### Single sign on

UAS works as a SSO for the whole Univ UC services.
It creates a JWT with a secret, and that secret is shared throughout all services.    
Each service use the secret to validate requests from outside.

### User information provider

For other services of Univ UC, such as LMS, UAS serves as a user repository.    
Any service instances running on the same machine can access a central user information repository.

This is done by a simple HTTP server, serving only for local requests.    
No token is required.

## License

All services of Univ UC are released under GPL v3 license.    
You can receive a copy of it [here](https://github.com/univuc/UAS/blob/master/LICENSE).
