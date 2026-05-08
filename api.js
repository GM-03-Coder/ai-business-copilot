import axios from "axios";

const API = "http://127.0.0.1:8000";

const cache = {};

export const getSummary = async () => {

  if (cache.summary) {
    return cache.summary;
  }

  const res = await axios.get(`${API}/summary`);

  cache.summary = res.data;

  return res.data;
};

export const getSegments = async () => {

  if (cache.segments) {
    return cache.segments;
  }

  const res = await axios.get(`${API}/segments`);

  cache.segments = res.data;

  return res.data;
};

export const getInsights = async () => {

  if (cache.insights) {
    return cache.insights;
  }

  const res = await axios.get(`${API}/insights`);

  cache.insights = res.data;

  return res.data;
};

export const getBehavior = async () => {

  if (cache.behavior) {
    return cache.behavior;
  }

  const res = await axios.get(`${API}/behavior`);

  cache.behavior = res.data;

  return res.data;
};

export const getPrediction = async () => {

  if (cache.prediction) {
    return cache.prediction;
  }

  const res = await axios.get(`${API}/prediction`);

  cache.prediction = res.data;

  return res.data;
};