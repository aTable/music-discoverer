
export interface IConfig {
    serverUri: string
    loginRoute: string
    postLoginRoute: string
    routerBasename: string
}

const config: IConfig = {
    serverUri: process.env.REACT_APP_SERVER_URI!,
    loginRoute: process.env.REACT_APP_LOGIN_ROUTE!,
    postLoginRoute: process.env.REACT_APP_POST_LOGIN_ROUTE!,
    routerBasename: process.env.REACT_APP_CLIENT_SIDE_ROUTER_BASENAME!,
}

export default config
