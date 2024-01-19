import 'express-session';

declare module 'express-session' {
  export interface SessionData {
    idUser: any;
    authenticated: any;
    idAdmin: any;
  }
}
