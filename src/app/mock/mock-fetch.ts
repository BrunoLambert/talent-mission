// mock-fetch.ts

import { ConsentData } from "../types/Consent";

export const LOCAL_STORAGE_KEY = "consentList";

function loadConsentList(): ConsentData[] {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveConsentList(list: ConsentData[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
}

let consentList = loadConsentList();
const originalFetch = window.fetch;

window.fetch = (async function (
    input: string | Request | URL,
    init?: RequestInit
): Promise<Response> {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

    if (url.endsWith('/api/consents')) {
        if (!init || init.method === 'GET') {
            return new Response(JSON.stringify(consentList), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else if (init.method === 'POST') {
            const body = JSON.parse(init.body as string);
            consentList.push(body);
            saveConsentList(consentList);

            return new Response(JSON.stringify({ success: true }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    return originalFetch(input, init);
}) as typeof fetch;
