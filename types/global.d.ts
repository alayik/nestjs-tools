declare type CacheManagerKeysType = 'Settings' | 'Languages' | 'Tags' | 'Countries';

declare type SignatureMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

declare type ApiSignatureType = {
  method?: SignatureMethodType;
  path?: string;
  version?: string;
  status?: number;
  summary: string;
  disable?: boolean;
  isPagination?: boolean;
};

declare type JwtTokensType = {
  access_token: string;
  refresh_token: string;
};

declare type S3FileType = {
  originalname?: string;
  encoding?: string;
  key?: string;
  location?: string;
  size?: string;
};

declare type LocalFileType = {
  originalname?: string;
  encoding?: string;
  path?: string;
  size?: string;
};

declare type ManyToManyCreateType = {
  [string]: {
    connect: {
      id: number;
    };
  };
};

declare type ManyToManyUpdateType = {
  id: number;
};

declare type ActivitySubmitNewType = {
  organization_id: string;
  ref_user_id: string;
  tracking_code?: string;
  check_tracking_code?: boolean;
  service: string;
  action: string;
  old_raw?: any;
  new_raw?: any;
  meta?: any;
};
