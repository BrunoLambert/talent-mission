export interface ConsentData {
    name: string;
    email: string;
    consent: {
        newsletter: boolean;
        targetedAds: boolean;
        statistics: boolean;
    };
}