import axios from 'axios';
import { API_BASE } from './config';

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

export async function fetchStudent(id) {
  return client.get(`/students/${id}`).then(r => r.data);
}

export async function fetchStudentsList() {
  // attempt backend; fallback to empty array
  return client.get('/students').then(r => r.data).catch(() => []);
}

export async function postRecognition(payload) {
  return client.post('/recognitions', payload).then(r => r.data);
}

export async function endorseRecognition(recId, endorserId) {
  return client.post(`/recognitions/${recId}/endorse`, { endorser_id: endorserId }).then(r => r.data);
}

export async function redeemCredits(studentId, credits) {
  return client.post(`/students/${studentId}/redeem`, { credits }).then(r => r.data);
}

export async function fetchLeaderboard(limit = 10) {
  return client.get(`/leaderboard?limit=${limit}`).then(r => r.data);
}

export async function fetchRecognition(recId) {
  return client.get(`/recognitions/${recId}`).then(r => r.data);
}