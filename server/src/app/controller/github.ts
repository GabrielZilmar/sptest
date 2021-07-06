import ServiceGithub from '../service/github';

import {
  IUser, IUserErrors, IUserDetails, IUserRepos,
} from '../types/github';

export default {
  list: async (req: any, res: any) => {
    const users: IUser[] & IUserErrors = await ServiceGithub.list(req);

    return users.error
      ? res.status(400).json(users)
      : res.status(200).json(users);
  },

  showUserDetails: async (req: any, res: any) => {
    const user: IUserDetails & IUserErrors = await ServiceGithub
      .showUserDetails(req.params.username, false);

    return user.error
      ? res.status(400).json(user)
      : res.status(200).json(user);
  },

  showUserRepos: async (req: any, res: any) => {
    const repos: IUserRepos & IUserErrors = await ServiceGithub
      .showUserDetails(req.params.username, true);

    return repos.error
      ? res.status(400).json(repos)
      : res.status(200).json(repos);
  },

};
