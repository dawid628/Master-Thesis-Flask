import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

const API_URL = 'http://localhost:3000/api';
const API_KEY = 'DC3B3F7C-31D0-4EDE-A1F8-FE6E9D0DE385';
const APP_URL = 'http://127.0.0.1:5000';

// Definiowanie metryk
const assetsTrend = new Trend('czas_trwania_assets');
const newDataTrend = new Trend('czas_trwania_new_data');
const usersListTrend = new Trend('czas_trwania_users_list');
const newUserTrend = new Trend('czas_trwania_new_user');
const hospitalsListTrend = new Trend('czas_trwania_hospitals_list');
const newHospitalTrend = new Trend('czas_trwania_new_hospital');
const rolesListTrend = new Trend('czas_trwania_roles_list');
const newRoleTrend = new Trend('czas_trwania_new_role');
const dataHistoryTrend = new Trend('czas_trwania_data_history');

const assetsErrorRate = new Rate('bledy_assets');
const newDataErrorRate = new Rate('bledy_new_data');
const usersListErrorRate = new Rate('bledy_users_list');
const newUserErrorRate = new Rate('bledy_new_user');
const hospitalsListErrorRate = new Rate('bledy_hospitals_list');
const newHospitalErrorRate = new Rate('bledy_new_hospital');
const rolesListErrorRate = new Rate('bledy_roles_list');
const newRoleErrorRate = new Rate('bledy_new_role');
const dataHistoryErrorRate = new Rate('bledy_data_history');

export const options = {
    stages: [
     { duration: '1m', target: 20 }, // Powolny wzrost do 20 użytkowników w ciągu 1 minuty
        { duration: '2m', target: 50 }, // Szybszy wzrost do 50 użytkowników w ciągu 3 minut
        { duration: '3m', target: 100 }, // Szybszy wzrost do 100 użytkowników w ciągu 3 minut
        { duration: '3m', target: 100 }, // Utrzymanie 100 użytkowników przez 3 minuty
        { duration: '3m', target: 0 }, // Powolne zmniejszenie do 0 użytkowników w ciągu 3 minut
    ],
    summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)'],
};

export function handleSummary(data) {
    return {
        'result.json': JSON.stringify(data),
    };
}

export default function () {
    // Testowanie endpointu /users
    const usersRes = http.get(`${APP_URL}/users`);
    check(usersRes, {
        'users list success': (r) => r.status === 200,
    });
    usersListTrend.add(usersRes.timings.duration);
    usersListErrorRate.add(usersRes.status !== 200);

    // Testowanie endpointu /new_user
    const newUserPayload = {
        name: 'testuser',
        first_name: 'Test',
        last_name: 'User',
        email: 'testuser@example.com',
        password: 'password',
        hospital_id: 1,
        role_id: 2,
    };

    const newUserRes = http.post(`${APP_URL}/new_user`, newUserPayload);
    check(newUserRes, {
        'new user success': (r) => r.status === 200,
    });
    newUserTrend.add(newUserRes.timings.duration);
    newUserErrorRate.add(newUserRes.status !== 200);

    // Testowanie endpointu /hospitals
    const hospitalsRes = http.get(`${APP_URL}/hospitals`);
    check(hospitalsRes, {
        'hospitals list success': (r) => r.status === 200,
    });
    hospitalsListTrend.add(hospitalsRes.timings.duration);
    hospitalsListErrorRate.add(hospitalsRes.status !== 200);

    // Testowanie endpointu /new_hospital
    const newHospitalPayload = {
        name: 'Test Hospital',
    };

    const newHospitalRes = http.post(`${APP_URL}/new_hospital`, newHospitalPayload);
    check(newHospitalRes, {
        'new hospital success': (r) => r.status === 200,
    });
    newHospitalTrend.add(newHospitalRes.timings.duration);
    newHospitalErrorRate.add(newHospitalRes.status !== 200);

    // Testowanie endpointu /roles
    const rolesRes = http.get(`${APP_URL}/roles`);
    check(rolesRes, {
        'roles list success': (r) => r.status === 200,
    });
    rolesListTrend.add(rolesRes.timings.duration);
    rolesListErrorRate.add(rolesRes.status !== 200);

    // Testowanie endpointu /new_role
    const newRolePayload = {
        name: 'Test Role',
    };

    const newRoleRes = http.post(`${APP_URL}/new_role`, newRolePayload);
    check(newRoleRes, {
        'new role success': (r) => r.status === 200,
    });
    newRoleTrend.add(newRoleRes.timings.duration);
    newRoleErrorRate.add(newRoleRes.status !== 200);

    // Testowanie endpointu /data_history
    const dataHistoryRes = http.get(`${APP_URL}/data_history`);
    check(dataHistoryRes, {
        'data history success': (r) => r.status === 200,
    });
    dataHistoryTrend.add(dataHistoryRes.timings.duration);
    dataHistoryErrorRate.add(dataHistoryRes.status !== 200);

    // Testowanie endpointu /assets (API)
    const assetsParams = {
        headers: {
            'X-Api-Key': API_KEY,
        },
    };

    const assetsRes = http.get(`${API_URL}/assets`, assetsParams);
    check(assetsRes, {
        'assets success': (r) => r.status === 200 && r.json().length > 0,
    });
    assetsTrend.add(assetsRes.timings.duration);
    assetsErrorRate.add(assetsRes.status !== 200);

    // Testowanie endpointu /new_data (API)
    const newDataPayload = {
        csv_file: 'permutacja_example.csv',
        description: 'Test data',
    };

    const newDataParams = {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': API_KEY,
        },
    };

    const newDataRes = http.post(`${API_URL}/assets`, newDataPayload, newDataParams);
    check(newDataRes, {
        'new_data success': (r) => r.status === 202,
    });
    newDataTrend.add(newDataRes.timings.duration);
    newDataErrorRate.add(newDataRes.status !== 202);

    // Sleep to simulate user think time
    sleep(1);
}
