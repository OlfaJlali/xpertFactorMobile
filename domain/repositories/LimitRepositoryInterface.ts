import { Limit, LimitResponse } from "../../types/Limit";

export interface LimitRepositoryInterface {
    createLimitRequest(data: Limit, token: string): Promise<LimitResponse>;
}
