import axios from 'axios';
import Router from 'next/router';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const editQuestion = async (id, state, answer) => {
  await axios.put(`${publicRuntimeConfig.API_URL}/api/question/editQuestion`, {
    accepted: !state,
    id,
    answer
  });
  await Router.push('/questions');
};

export const saveQuestion = async (id, state, answer) => {
  await axios.put(`${publicRuntimeConfig.API_URL}/api/question/editQuestion`, {
    accepted: state,
    id,
    answer
  });
  await Router.push('/questions');
};
