// types/express/index.d.ts

import {AuthenticatedUserPayload} from "../auth/authenticate";

declare global {
    namespace Express {
        interface Request {
            user?: AuthenticatedUserPayload;
        }
    }
}
