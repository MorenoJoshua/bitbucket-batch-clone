#!/usr/bin/env node
import * as inquirer from 'inquirer';
import axios from 'axios';
import {BitBucketUserInfo, RepositoriesItem} from "./interfaces";
import {Inquirer, Question} from "inquirer";
import * as gitclone from 'git-clone'

const app = async () => {
  const username = {
    name: 'username',
    type: "input",
    message: "Please input your Bitbucket Username (Leave blank if you don't need authentication)"
  };
  const password = {
    name: 'password',
    type: "password",
    message: "Please input your Bitbucket Password",
    verify: hash => !!hash.match(/.+/) ? true : 'Please enter a password'
  };
  const teamName = {
    name: 'teamname',
    type: "input",
    message: "Please input a Team/User name",
    verify: hash => !!hash.match(/.+/) ? true : 'Please enter a team name or Username'
  };

  let responses: {
    teamname?: string;
    username?: string;
    password?: string;
  } = {};

  responses = {...responses, ...await inquirer.prompt(username)};

  if (responses.username && responses.username !== '') {
    responses = {...responses, ...await inquirer.prompt(password)};
  }
  responses = {...responses, ...await inquirer.prompt(teamName)};


  let bbinfo: BitBucketUserInfo | any = {};
  if (responses.teamname !== '' && responses.username === '') {
    bbinfo = await axios
      .get(`https://api.bitbucket.org/1.0/users/${responses.teamname}`).then(r => r.data)
      .catch(e => console.warn(e));
  } else if (responses.teamname != '' && responses.username != '' && responses.password != '') {
    bbinfo = await axios
      .get(`https://api.bitbucket.org/1.0/users/${responses.teamname}`,
        {
          auth: {
            password: responses.password,
            username: responses.username,
          }
        }).then(r => r.data)
      .catch(e => console.warn(e));
  }

  const repos = bbinfo.repositories;
  const reposToCloneQuestion: Question = {
    name: 'repostoclone',
    message: 'Please select the repos you want to clone',
    type: "checkbox",
    pageSize: 40,
    choices: repos.map(repo => repo.name)
  };

  // @ts-ignore
  const {repostoclone: reposArr} = await inquirer.prompt(reposToCloneQuestion).catch(e => console.warn(e));
  for (let repo of reposArr) {
    await gitclone(
      `https://${responses.username}:${responses.password}@bitbucket.org/${responses.teamname}/${repo}.git`,
      // `https://${responses.username}:${responses.password}@bitbucket.org/${responses.teamname}/${repo}.git`,
      `./${repo}`,
      {}, console.log(`Cloning ${repo}...`))
  }
};


app();
