#!/usr/bin/env node
import * as inquirer from 'inquirer';
import axios from 'axios';
import {BitBucketUserInfo, RepositoriesItem} from "./interfaces";
import {Inquirer, Question} from "inquirer";
import * as gitclone from 'git-clone'

const app = async () => {
  const questions = [
    {
      name: 'username',
      type: "input",
      message: "Please input your Bitbucket Username"
    }, {
      name: 'password',
      type: "password",
      message: "Please input your Bitbucket Password"
    },
    {
      name: 'teamname',
      type: "input",
      message: "Please input a Team/User name"
    },
  ];

  let responses: {
    teamname?: String;
    username?: String;
    password?: String;
  } = {};
  for (let question of questions) {
    responses = {...responses, ...await inquirer.prompt(question)};
  }

  if (responses.teamname && responses.username && responses.password) {
    const bbinfo: BitBucketUserInfo = await axios
      .get(`https://${responses.username}:${responses.password}@api.bitbucket.org/1.0/users/${responses.teamname}`).then(r => r.data)
      .catch(e => console.warn(e));

    const repos = bbinfo.repositories;
    const reposToCloneQuestion: Question = {
      name: 'repostoclone',
      message: 'Please select the repos you want to clone',
      type: "checkbox",
      choices: repos.map(repo => repo.name)
    };

    // @ts-ignore
    const {repostoclone: reposArr} = await inquirer.prompt(reposToCloneQuestion).catch(e => console.warn(e));
    for (let repo of reposArr) {
      await gitclone(
        `https://${responses.username}:${responses.password}@bitbucket.org/${responses.teamname}/${repo}.git`,
        `./${repo}`,
        {}, console.log(`Cloning ${repo}...`))
    }
  }


};


app();
