export declare class AnalyticsController {
    private isAnalyticsEnabled;
    private checkAccess;
    getOverview(authHeader: string): Promise<{
        state: string;
        generatedAt: string;
        message: string;
        data: null;
    }>;
    getFinanceAnalytics(authHeader: string): Promise<{
        state: string;
        message: string;
        generatedAt?: undefined;
        data?: undefined;
    } | {
        state: string;
        generatedAt: string;
        data: null;
        message?: undefined;
    }>;
}
