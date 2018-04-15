// 当前环境
const env = process.env.NODE_ENV;
let homeUrl;
switch (env) {
    case 'development':
        homeUrl = 'http://localhost:9000/#/';
        break;
    case 'devtest':
        homeUrl = 'http://test-workdesk.esenyun.com/#/';
        break;
    case 'prepare':
        homeUrl = 'https://pre-workdesk.esenyun.com/#/';
        break;
    case 'production':
        homeUrl = 'http://workdesk.esenyun.com/#/';
        break;
}
export const Env = env;
export const HomeUrl = homeUrl;
