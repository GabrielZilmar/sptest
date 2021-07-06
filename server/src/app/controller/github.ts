import ServiceGithub from '../service/github';

import { IUser, IUserErrors } from '../types/github';

export default {
  list: async (req: any, res: any) => {
    const users: IUser[] & IUserErrors = await ServiceGithub.list(req);

    return users.error
      ? res.status(400).json(users)
      : res.status(200).json(users);
  },
};
