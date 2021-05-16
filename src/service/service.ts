import { DefaultApi } from '.';
import { Configuration } from './configuration';

const basePath = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3002';

const serviceApi = new DefaultApi(new Configuration({ basePath: basePath }), undefined, fetch);

export default serviceApi;
