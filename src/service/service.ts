import { DefaultApi } from '.';
import { Configuration } from './configuration';

// TODO: configure endpoint based on NODE_ENV
const serviceApi = new DefaultApi(
    new Configuration({ basePath: 'http://localhost:3002' }),
    undefined,
    fetch
);

export default serviceApi;
