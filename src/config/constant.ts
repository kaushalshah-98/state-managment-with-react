// const BASE_URL: string =
//   process.env.END_POINT_URL || 'http://api.metis.apps.actonatepanel.com/graphql/';
const BASE_URL = 'http://localhost:3000/';
const S3PATH = 'https://actonate-store.s3-ap-southeast-1.amazonaws.com/';

const S3FOLDERS = {
  VENDORS: 'vendors',
  LIABILITY: 'liabilities'
};

export { S3FOLDERS, BASE_URL, S3PATH };
