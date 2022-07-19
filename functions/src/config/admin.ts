import * as admin from 'firebase-admin';

import * as devServiceAccount from '../keys/credentials-development.json';
// import * as productionServiceAccount from '../keys/credentials-production.json';
import * as stagingServiceAccount from '../keys/credentials-staging.json';

const ENV = process.env.APP_ENV || 'development';
let config = {};

switch (ENV) {
  case 'development':
    config = {
      projectId: devServiceAccount.project_id,
      credential: admin.credential.cert(
        devServiceAccount as admin.ServiceAccount
      ),
    };
    break;
  case 'staging':
    config = {
      projectId: stagingServiceAccount.project_id,
      credential: admin.credential.cert(
        stagingServiceAccount as admin.ServiceAccount
      ),
    };
    break;
  // case 'production':
  //   config = {
  //     projectId: productionServiceAccount.project_id,
  //     credential: admin.credential.cert(
  //       productionServiceAccount as admin.ServiceAccount
  //     ),
  //   };
  //   break;
}

admin.initializeApp(config);

export default admin;
